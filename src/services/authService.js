import { axiosCreate } from "../config/axios";

const AuthService = {
	login: async (body, history) => {
		try {
			// await callAPI("/login", "POST", body)
			// 	.then((data) => {
			// 		console.log(data);
			// 		return data;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
			await axiosCreate
				.post("/login", body)
				.then((data) => {
					console.log(data);
					history.push("/");
					return data;
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		}
	},

	register: (data) => {},
	logout: (data) => {},
};

export default AuthService;
