import { createAction } from '.';
import { callAPI } from '../../config/axios';
import { CHAT } from './type';

export const fetchChats = () => {
	return (dispatch) => {
		(async () => {
			try {
				await callAPI('/chats', 'GET')
					.then((res) => {
						dispatch(
							createAction(CHAT.FETCH_CHATS, res.data)
						);
						console.log(res.data);
					})
					.catch((err) => console.log(err));
			} catch (err) {
				console.log(err);
			}
		})();
	};
};
export const setCurrentChat = (chat) => {
	return (dispatch) => {
		dispatch(createAction(CHAT.SET_CURRENT_CHAT, chat));
	};
};
