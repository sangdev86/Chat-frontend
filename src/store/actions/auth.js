import { createAction } from '.';
import { callAPI } from '../../config/axios';
import { setLocalStorage } from '../../config/localStore';
import { AUTH, CHAT } from './type';

export const login = (body, history) => {
	return (dispatch) => {
		(async () => {
			try {
				await callAPI('/login', 'POST', body)
					.then((res) => {
						// console.log('login', res.data);
						dispatch(createAction(AUTH.LOGIN, res.data));
						setLocalStorage(res.data);
						history.push('/');
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (err) {
				console.log(err);
			}
		})();
	};
};
export const register = (body, history) => {
	return (dispatch) => {
		(async () => {
			try {
				await callAPI('/register', 'POST', body).then(
					(res) => {
						// console.log(res);
						dispatch(createAction(AUTH.REGISTER, res.data));
						setLocalStorage(res.data);
						history.push('/');
					}
				);
			} catch (err) {
				console.log(err);
			}
		})();
	};
};

export const logout = () => (dispatch) => {
	localStorage.clear();
	dispatch(createAction(AUTH.LOGOUT));
	dispatch(createAction(CHAT.SET_CHAT_LOGOUT));
};

export const updateProfile = (body) => {
	if (body.password === '') {
		delete body.password;
	}
	if (body.avatar === null) {
		delete body.avatar;
	}
	// console.log('bd', body);
	const formData = new FormData();
	for (const key in body) {
		formData.append(key, body[key]);
	}
	// console.log('formData', formData);
	return (dispatch) =>
		(async () => {
			try {
				await callAPI(
					'/users/update',
					'POST',
					formData,
					'formData'
				).then((res) => {
					// console.log('res.data', res.data);
					setLocalStorage(res.data);
					dispatch(createAction(AUTH.UPDATE, res.data));
				});
			} catch (err) {
				console.log(err);
			}
		})();
};
