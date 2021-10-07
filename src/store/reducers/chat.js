import { CHAT } from '../actions/type';

export const initialState = {
	chats: [],
	currentChat: {},
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
			};
		default:
			return state;
	}
};
