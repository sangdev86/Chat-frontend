import React, { useEffect, useRef, useState } from 'react';
import { storeState } from '../../../../store/reducers';
import Message from '../Message/Message';
// import typing from '../../../../assets/sound/typing.mp3';

import { audio } from '../../../../assets/sound/audio';

const MessageBox = ({
	currentChat,
	store = storeState,
}) => {
	const { user } = store.authReducer;
	const { scrollBottom, senderTyping } = store.chatReducer;
	const [onlyFirst, setOnlyFirst] = useState(false);
	const sound = audio('typing');

	const msgBox = useRef();
	let checker = useRef(sound);

	useEffect(() => {
		if (!senderTyping.typing) {
			setOnlyFirst(false);
		}
	}, [senderTyping.typing]);
	const HandleTyping = () => {
		if (
			senderTyping.typing &&
			senderTyping.chatId === currentChat.id
		) {
			sound.pause();
			clearTimeout(checker.current);
			checker.current = setTimeout(() => {
				sound.play();
			}, 800);
			if (!onlyFirst) {
				sound.play();
				setOnlyFirst(true);
			}
			return true;
		} else {
			sound.pause();
			return false;
		}
	};

	useEffect(() => {
		setTimeout(() => {
			scrollManual(msgBox.current.scrollHeight);
		}, 50);
	}, [scrollBottom]);
	const scrollManual = (value) => {
		msgBox.current.scrollTop = value;
	};

	return (
		<div id="msg-box" ref={msgBox}>
			{currentChat.Messages.map((message, index) => {
				return (
					<Message
						key={message.id}
						user={user}
						currentChat={currentChat}
						message={message}
						index={index}
					/>
				);
			})}

			{HandleTyping() ? (
				<>
					<div className="message">
						<div className="other-person">
							<div className="m-0 typing">
								<div>
									{senderTyping.fromUser.firstName}{' '}
									{senderTyping.fromUser.lastName}
								</div>

								<div id="typing">
									<div className="dot1"></div>
									<div className="dot2"></div>
									<div className="dot3"></div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				''
			)}
		</div>
	);
};
export default MessageBox;
