export const setLocalStorage = ({ ...payload }) => {
	localStorage.setItem(
		'user',
		JSON.stringify(payload.user || payload)
	);
	if (payload.token) {
		localStorage.setItem('token', payload.token);
	}
};
export const getLocalStorage = (params) => {
	return localStorage.getItem(params);
};
