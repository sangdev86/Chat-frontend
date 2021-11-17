import axios from 'axios';

export const params = (objParams) => {
	let params = '?';
	for (const key in objParams) {
		params += `${key}=${objParams[key]}&`;
	}
	return params;
};
const contentType = {
	json: 'application/json',
	formData: 'multipart/form-data',
	// formData: 'application/x-www-form-urlencoded',
};
export const baseURL = `${process.env.REACT_APP_BASE_URL}`;

// token
const token = localStorage.getItem('token');
const a = 1;
// resquet 1

export const callAPI = async (
	endpoint,
	method,
	data = null,
	formData = false
) => {
	const token = localStorage.getItem('token');

	try {
		const res = await axios({
			url: baseURL + endpoint,
			method: method,
			data: data,
			headers: {
				Authorization:
					token !== null ? `Bearer ${token}` : '',
				'Access-Control-Allow-Origin': '*',
				'Content-Type':
					formData === 'formData'
						? contentType.formData
						: contentType.json,
			},
		});
		// console.log(res);
		const { status } = res;
		if (status === 401) {
			localStorage.clear();
			window.location.reload();
			return;
		} else {
			return {
				data: res.data,
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
		Authorization: token !== null ? `Bearer ${token}` : '',
		'Content-Type': 'application/json',
	},
});

// resquet 3
export const axiosCreates = (formData = false) => {
	return axios.create({
		baseURL: baseURL,
		headers: {
			Authorization:
				token !== null ? `Bearer ${token}` : '',
			'Content-Type': formData
				? contentType.formData
				: contentType.json,
		},
	});
};
