import { createAction } from ".";
import { axiosCreate } from "../../config/axios";
import { setLocalStorage } from "../../config/localStore";
import { AUTH } from "./type";

export const login = (body, history) => {
	return (dispatch) => {
		(async () => {
			try {
				await axiosCreate
					.post("/login", body)
					.then((res) => {
						console.log(res.data);
						dispatch(createAction(AUTH.LOGIN, res.data));
						setLocalStorage(res.data);
						history.push("/");
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
				await axiosCreate
					.post("/register", body)
					.then((res) => {
						console.log(res);
						dispatch(createAction(AUTH.REGISTER, res.data));
						history.push("/");
					});
			} catch (err) {
				console.log(err);
			}
		})();
	};
};
export const logout = () => (dispatch) => {
	localStorage.clear();
	dispatch(createAction(AUTH.LOGOUT));
};
