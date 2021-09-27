import axios from "axios";

const contentType = {
	json: "application/json",
	formData: "multipart/form-data",
};
// const baseURL = `${process.env.APP_URL}`;
const baseURL = "http://127.0.0.1:8000";

// token
export const token = localStorage.getItem("token");

// resquet 1
export const callAPI = async (
	endpoint,
	method,
	data,
	formData = false
) => {
	try {
		const res = await axios({
			url: baseURL + endpoint,
			method: method,
			data: data,
			headers: {
				Authorization:
					token !== null ? `Bearer ${token}` : "",
				"Content-Type": formData
					? contentType.formData
					: contentType.json,
			},
		});
		const { status } = res;
		if (status === 401) {
			localStorage.clear();
			window.location.reload();
			return;
		} else {
			return {
				data: res.data,
				status,
			};
		}
	} catch (error) {
		console.log(error);
	}
};

// resquet 2
export const axiosCreate = axios.create({
	baseURL: baseURL,
	headers: {
		Authorization: token !== null ? `Bearer ${token}` : "",
		"Content-Type": "application/json",
	},
});
