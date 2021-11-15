import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userStatus } from '../../../../utils/helpers';
const ChatHeader = ({ currentChat }) => {
	const [showChatOptions, SetShowChatOptions] =
		useState(false);
	// const [showAddFriendModal, SetshowAddFriendModal] =
	// 	useState(false);
	// const [showLeaveChatModal, SetshowLeaveChatModal] =
	// 	useState(false);
	// const [showDeleteChatModal, SetShowDeleteChatModal] =
	// 	useState(false);

	return (
		<Fragment>
			<div id="chatter">
				{currentChat.Users.map((user, index) => {
					return (
						<div key={index} className="chatter-info">
							<h3>
								{user.firstName} {user.lastName}
							</h3>
							<div className="chatter-status">
								<span
									className={`online-status ${userStatus(
										user
									)}`}
								></span>
							</div>
						</div>
					);
				})}
			</div>
			<FontAwesomeIcon
				onClick={() => SetShowChatOptions(!showChatOptions)}
				icon={['fas', 'ellipsis-v']}
				className="fa-icon"
			/>
			{showChatOptions ? (
				<div id="settings">
					<div>
						<div>
							<FontAwesomeIcon
								icon={['fas', 'user-plus']}
								className="fa-icon"
							/>
						</div>
						<p>Add user to chat</p>
					</div>
					<div>
						{currentChat.type === 'dual' ? null : (
							<div>
								<FontAwesomeIcon
									icon={['fas', 'sign-out-alt']}
									className="fa-icon"
								/>
								<p>Leave Chat</p>
							</div>
						)}
					</div>
					<div>
						<div>
							<FontAwesomeIcon
								icon={['fas', 'trash']}
								className="fa-icon"
							/>
						</div>
						<p>Delete Chat</p>
					</div>
				</div>
			) : null}
		</Fragment>
	);
};

export default ChatHeader;
