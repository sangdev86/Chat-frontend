import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { storeState } from '../../../../store/reducers';
import Message from '../Message/Message';

const MessageBox = ({ currentChat }) => {
	const user = useSelector(
		(state = storeState) => storeState.authReducer.user
	);
	const scrollBottom = useSelector(
		(state) => state.chatReducer.scrollBottom
	);
	console.log(scrollBottom);
	const msgBox = useRef();

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
		</div>
	);
};
export default MessageBox;
