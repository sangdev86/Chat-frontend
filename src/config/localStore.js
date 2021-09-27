export const setLocalStorage = ({ ...payload }) => {
	localStorage.setItem(
		"user",
		JSON.stringify(payload.user)
	);
	localStorage.setItem("token", payload.token);
};
export const getLocalStorage = (params) => {
	return localStorage.getItem(params);
};
