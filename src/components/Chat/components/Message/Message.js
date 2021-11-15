import React from 'react';

const Message = ({ user, currentChat, index, message }) => {
	const determineMargin = () => {
		if (index + 1 === currentChat.Messages.length) return;

		return message.fromUserId ===
			currentChat.Messages[index + 1].fromUserId
			? 'mb-5'
			: 'mb-10';
	};
	return (
		<div
			className={`message ${determineMargin()} ${
				message.fromUserId === user.id ? 'creator' : ''
			}`}
		>
			<div
				className={
					message.fromUserId === user.id
						? 'owner'
						: 'other-person'
				}
			>
				{message.fromUserId !== user.id ? (
					<h6 className="m-0">{message.User.firstName}</h6>
				) : (
					''
				)}
				{message.type === 'text' ? (
					<p className="m-0">{message.message}</p>
				) : (
					<img
						src={message.message}
						alt={message.message}
					/>
				)}
			</div>
		</div>
	);
};
export default Message;
