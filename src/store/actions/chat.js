import { createAction } from '.';
import { callAPI } from '../../config/axios';
import { CHAT } from './type';

export const fetchChats = () => {
	return (dispatch) =>
		(async () => {
			try {
				await callAPI('/chats', 'GET')
					.then((res) => {
						res.data.forEach((chat) => {
							chat.Users.forEach((user) => {
								user.status = 'offline';
							});
							chat.Messages.reverse();
						});
						dispatch(
							createAction(CHAT.FETCH_CHATS, res.data)
						);
					})
					.catch((err) => console.log(err));
			} catch (err) {
				console.log(err);
			}
		})();
};
export const setCurrentChat = (chat) => {
	return (dispatch) => {
		dispatch(createAction(CHAT.SET_CURRENT_CHAT, chat));
	};
};
export const uploadImageMessage = (data, callback) =>
	(async () => {
		try {
			await callAPI(
				'/chats/upload-image',
				'POST',
				data,
				'formData'
			)
				.then(({ data }) => {
					callback(data.url);
				})
				.catch();
		} catch (e) {
			console.log(e);
		}
	})();

export const onlineFriends = (friendsId) => {
	return (dispatch) => {
		dispatch(createAction(CHAT.FRIENDS_ONLINE, friendsId));
	};
};

export const onlineFriend = (friend) => {
	return (dispatch) => {
		dispatch(createAction(CHAT.FRIEND_ONLINE, friend));
	};
};

export const offlineFriend = (friend) => {
	return (dispatch) => {
		dispatch(createAction(CHAT.FRIEND_OFFLINE, friend));
	};
};
export const setSocket = (socket) => (dispatch) => {
	dispatch(createAction(CHAT.SET_SOCKET, socket));
};

export const reciveMessage =
	(message, userId) => (dispatch) => {
		dispatch(
			createAction(CHAT.RECEIVED_MESSAGE, {
				message,
				userId,
			})
		);
	};

export const senderTyping = (typing) => (dispatch) =>
	dispatch(createAction(CHAT.SENDER_TYPING, typing));
