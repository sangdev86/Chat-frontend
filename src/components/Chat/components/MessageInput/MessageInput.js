import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { storeState } from '../../../../store/reducers';

export default function MessageInput({
	currentChat,
	store = storeState,
}) {
	const [message, setMessage] = useState('');
	const [image, setImage] = useState('');

	const handleMessage = (e) => {
		const value = e.target.value;
		setMessage(value);
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
			message: imageUpload ? image : message,
		};
		setMessage('');
		setImage('');
		//send
		console.log('msg', msg);
		store.chatReducer.socket.emit('message', msg);
	};
	return (
		<div id="input-container">
			<div id="message-input">
				<input
					type="text"
					placeholder="Message"
					onChange={(e) => handleMessage(e)}
					onKeyDown={(e) => handleKeyDown(e, false)}
				/>
				<FontAwesomeIcon
					icon={['far', 'smile']}
					className="fa-icon"
				/>
			</div>
		</div>
	);
}
