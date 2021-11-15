import React from 'react';
import { userStatus } from '../../../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Friend = ({ chat, currentChat, click }) => {
	const isChatOpened = () => {
		return currentChat.id === chat.id ? 'opened' : '';
	};
	const lastMessage = () => {
		if (chat.Messages.length === 0) return '';
		const message = chat.Messages[chat.Messages.length - 1];
		// const message = chat.Messages[0];
		return message.type === 'image' ? (
			<FontAwesomeIcon
				icon={['far', 'image']}
				className="fa-icon"
			/>
		) : (
			message.message
		);
	};
	return (
		<div
			onClick={click}
			className={`friend-list ${isChatOpened()}`}
		>
			<div>
				<img
					width="40"
					height="40"
					src={chat.Users[0].avatar}
					alt={chat.Users[0].firstName}
				/>
				<div className="friend-info">
					<h4 className="m-0">
						{chat.Users[0].firstName}{' '}
						{chat.Users[0].lastName}
					</h4>
					<h5 className="m-0">{lastMessage()}</h5>
				</div>
			</div>
			<div className="friend-status">
				<span
					className={`online-status ${userStatus(
						chat.Users[0]
					)}`}
				></span>
			</div>
		</div>
	);
};
export default Friend;
