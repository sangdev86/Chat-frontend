import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { storeState } from '../../../../store/reducers';
import { useDispatch } from 'react-redux';
import { uploadImageMessage } from '../../../../store/actions/chat';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
export default function MessageInput({
	currentChat,
	store = storeState,
}) {
	const { socket } = store.chatReducer;
	const { user } = store.authReducer;

	const fileUpload = useRef();
	const msgInputEmoji = useRef();

	const dispatch = useDispatch();
	const [message, setMessage] = useState('');
	const [image, setImage] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] =
		useState(false);
	const handleMessage = (e) => {
		const value = e.target.value;
		setMessage(value);

		// send typing
		let sendTyping = {
			fromUser: user,
			chatId: currentChat.id,
			toUserId: currentChat.Users.map((user) => user.id),
		};

		if (value.length >= 1) {
			sendTyping.typing = true;
			socket.emit('sendTyping', sendTyping);
		} else {
			sendTyping.typing = false;
			socket.emit('sendTyping', sendTyping);
		}
	};
	const handleKeyDown = (e, imageUpload) => {
		if (e.key === 'Enter') sendMessage(imageUpload);
	};
	const sendMessage = (imageUpload) => {
		if (message.length < 1 && !imageUpload) return;

		const msg = {
			type: imageUpload ? 'image' : 'text',
			fromUser: store.authReducer.user,
			toUserId: currentChat.Users.map((user) => user.id),
			chatId: currentChat.id,
			message: imageUpload ? imageUpload : message,
		};
		setMessage('');
		setImage('');
		setShowEmojiPicker(false);
		//send
		// console.log('msg', msg);
		socket.emit('message', msg);
	};
	const handleImageUpload = () => {
		const formData = new FormData();
		formData.append('id', currentChat.id);
		formData.append('image', image);
		uploadImageMessage(formData, sendMessage);
	};
	const selectEmoji = (emoji) => {
		//https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
		const startPosition =
			msgInputEmoji.current.selectionStart;
		const endPosition = msgInputEmoji.current.selectionEnd;
		const emojiLength = emoji.native.length;
		const value = msgInputEmoji.current.value;
		setMessage(
			value.substring(0, startPosition) +
				emoji.native +
				value.substring(endPosition, value.length)
		);
		msgInputEmoji.current.focus();
		msgInputEmoji.current.selectionEnd =
			endPosition + emojiLength;

		console.log('startPosition', startPosition);
		console.log('endPosition', endPosition);
		console.log('emojiLength', emojiLength);
		console.log('value', value);
	};
	return (
		<div id="input-container">
			<div id="image-upload-container">
				<div></div>
				<div id="image-upload">
					{image.name ? (
						<div id="image-details">
							<p className="m-0">{image.name}</p>
							<FontAwesomeIcon
								onClick={handleImageUpload}
								icon="upload"
								className="fa-icon"
							/>
							<FontAwesomeIcon
								onClick={() => setImage('')}
								icon="times"
								className="fa-icon"
							/>
						</div>
					) : null}
					<FontAwesomeIcon
						onClick={() => fileUpload.current.click()}
						icon={['far', 'image']}
						className="fa-icon"
					/>
				</div>
			</div>
			<div id="message-input">
				<input
					ref={msgInputEmoji}
					value={message}
					type="text"
					placeholder="Message"
					onChange={(e) => handleMessage(e)}
					onKeyDown={(e) => handleKeyDown(e, false)}
				/>
				<FontAwesomeIcon
					onClick={() =>
						setShowEmojiPicker(!showEmojiPicker)
					}
					icon={['far', 'smile']}
					className="fa-icon"
				/>
			</div>

			<input
				id="chat-image"
				ref={fileUpload}
				type="file"
				onChange={(e) => setImage(e.target.files[0])}
			/>
			{showEmojiPicker ? (
				<Picker
					title="Pick your emoji ..."
					emoji="point_up"
					style={{
						position: 'absolute',
						bottom: '20px',
						right: '20px',
					}}
					onSelect={selectEmoji}
				/>
			) : (
				''
			)}
		</div>
	);
}
