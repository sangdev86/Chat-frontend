import { CHAT } from '../actions/type';

export const initialState = {
	chats: [],
	currentChat: {},
	socket: {},
	newMessage: { chatId: null, seen: null },
	scrollBottom: 0,
	senderTyping: { typing: false },
};

export const chatReducer = (
	state = initialState,
	action
) => {
	const { type, payload } = action;
	switch (type) {
		case CHAT.FETCH_CHATS:
			return {
				...state,
				chats: payload,
			};
		case CHAT.SET_CURRENT_CHAT:
			return {
				...state,
				currentChat: payload,
				scrollBottom: state.scrollBottom + 1,
				newMessage: { chatId: null, seen: null },
			};
		case CHAT.FRIENDS_ONLINE: {
			const chatsUpdate = state.chats.map((chat) => {
				return {
					...chat,
					Users: chat.Users.map((user) => {
						if (payload.includes(user.id)) {
							return {
								...user,
								status: 'online',
							};
						}
						return user;
					}),
				};
			});

			return {
				...state,
				chats: [...chatsUpdate],
			};
		}
		case CHAT.FRIEND_ONLINE: {
			let currentChatUpdate = { ...state.currentChat };
			const chatsUpdate = state.chats.map((chat) => {
				const Users = chat.Users.map((user) => {
					if (user.id === parseInt(payload.id)) {
						return {
							...user,
							status: 'online',
						};
					}
					return user;
				});
				if (chat.id === currentChatUpdate.id) {
					currentChatUpdate = {
						...currentChatUpdate,
						Users,
					};
				}
				return {
					...chat,
					Users,
				};
			});

			return {
				...state,
				chats: chatsUpdate,
				currentChat: { ...currentChatUpdate },
			};
		}
		case CHAT.FRIEND_OFFLINE: {
			let currentChatUpdate = { ...state.currentChat };
			const chatsUpdate = state.chats.map((chat) => {
				const Users = chat.Users.map((user) => {
					if (user.id === parseInt(payload.id)) {
						return {
							...user,
							status: 'offline',
						};
					}
					return user;
				});
				if (chat.id === currentChatUpdate.id) {
					currentChatUpdate = {
						...currentChatUpdate,
						Users,
					};
				}
				return {
					...chat,
					Users,
				};
			});

			return {
				...state,
				chats: chatsUpdate,
				currentChat: currentChatUpdate,
			};
		}
		case CHAT.SET_SOCKET:
			return {
				...state,
				socket: payload,
			};

		case CHAT.RECEIVED_MESSAGE: {
			const { userId, message } = payload;
			let currentChatUpdate = { ...state.currentChat };
			let newMessage = { ...state.newMessage };
			let scrollBottom = state.scrollBottom;

			const chatsUpdate = state.chats.map((chat) => {
				//update chats
				if (message.chatId === chat.id) {
					if (message.User.id === userId) {
						// from user
						scrollBottom++;
					} else {
						// user received messgae
						newMessage = {
							chatId: chat.id,
							seen: false,
						};
					}

					// update curentChat
					if (message.chatId === currentChatUpdate.id) {
						currentChatUpdate = {
							...currentChatUpdate,
							Messages: [
								...currentChatUpdate.Messages,
								...[message],
							],
						};
						// if (scrollBottom === state.scrollBottom) {
						// 	scrollBottom = state.scrollBottom + 1;
						// }
					}

					// return chats update
					return {
						...chat,
						Messages: [...chat.Messages, ...[message]],
					};
				}
				return chat;
			});
			// update scroll
			if (scrollBottom === state.scrollBottom) {
				return {
					...state,
					chats: chatsUpdate,
					currentChat: currentChatUpdate,
					newMessage,
					senderTyping: { typing: false },
				};
			}
			return {
				...state,
				chats: chatsUpdate,
				currentChat: currentChatUpdate,
				newMessage: newMessage,
				scrollBottom,
				senderTyping: { typing: false },
			};
		}

		case CHAT.SENDER_TYPING:
			if (payload.typing) {
				return {
					...state,
					senderTyping: payload,
					scrollBottom: state.scrollBottom + 1,
				};
			}
			return { ...state, senderTyping: payload };

		case CHAT.SET_CHAT_LOGOUT: {
			return {
				...state,
				chats: [],
				currentChat: {},
				socket: {},
				newMessage: { chatId: null, seen: null },
				scrollBottom: 0,
			};
		}
		case CHAT.SCROLL_TOP_PAGINATE_MESSAGES: {
			const { messages, id, pagination } = payload;
			let currentChatUpdate = { ...state.currentChat };

			const chatsUpdate = state.chats.map((chat) => {
				if (chat.id === id) {
					const shifted = [...messages, ...chat.Messages];
					currentChatUpdate = {
						...currentChatUpdate,
						Messages: shifted,
						Pagination: pagination,
					};
					return {
						...chat,
						Messages: shifted,
						Pagination: pagination,
					};
				}
			});
			return {
				...state,
				chats: chatsUpdate,
				currentChat: currentChatUpdate,
			};
		}
		case CHAT.INCREMENTSCROLL: {
			return {
				...state,
				scrollBottom: state.scrollBottom + 1,
				newMessage: { chatId: null, seen: null },
			};
		}
		default:
			return state;
	}
};
