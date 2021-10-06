import { getLocalStorage } from '../../config/localStore';
import { AUTH } from '../actions/type';

export const initialState = {
	user: JSON.parse(getLocalStorage('user')) || {},
	token: getLocalStorage('token') || '',
	isLoggedIn: !!getLocalStorage('user'),
	// isLoggedIn: !getLocalStorage("user") ? false : true,
};

export const name = 'authReducer';
export const authReducer = (
	state = initialState,
	action
) => {
	const { type, payload } = action;
	switch (type) {
		case AUTH.LOGIN:
			return {
				...state,
				user: payload.user,
				token: payload.token,
				isLoggedIn: true,
			};
		case AUTH.REGISTER:
			return {
				...state,
				user: payload.user,
				token: payload.token,
				isLoggedIn: true,
			};
		case AUTH.LOGOUT:
			return {
				...state,
				user: {},
				token: '',
				isLoggedIn: false,
			};
		case AUTH.UPDATE:
			return {
				...state,
				user: payload.user || payload,
			};

		default:
			return state;
	}
};
