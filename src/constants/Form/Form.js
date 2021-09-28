import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Form = ({ data, asynAction, history }) => {
	const [user, setUser] = useState(data);
	const obj = {
		firstName: { name: "Frist Name", type: "text" },
		lastName: { name: "Last Name", type: "text" },
		email: { name: "Eamil", type: "text" },
		password: { name: "Password", type: "password" },
		gender: { name: "Gender", type: "option" },
		avatar: { name: "Avatar", type: "file" },
	};
	const dispatch = useDispatch();

	const value = (e) => {
		const { value } = e.target;
		return value;
	};

	const handleChange = (property, e) => {
		const update = { ...user };
		update[`${property}`] = value(e);

		setUser(update);
	};
	const formModel = (params) => {
		const arr = [];
		for (const property in params) {
			for (const propertyObj in obj) {
				if (property === propertyObj) {
					arr.push(property);
				}
			}
		}
		console.log(arr);
		return arr.map((property, index) => {
			if (property === "gender") {
				return (
					<div key={index} className="input-field mb-1">
						<select
							onChange={(e) => handleChange(property, e)}
							value={user[`${property}`]}
							name={`${property}`}
							placeholder={obj[`${property}`].name}
							required="required"
							type={obj[`${property}`].type}
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="othe">Other</option>
						</select>
					</div>
				);
			} else if (property === "avatar") {
				return (
					<div key={index} className="input-field mb-1">
						<input
							onChange={(e) => handleChange(property, e)}
							// value={user[`${property}`]}
							type="file"
						/>
					</div>
				);
			} else {
				return (
					<div key={index} className="input-field mb-1">
						<input
							onChange={(e) => handleChange(property, e)}
							value={user[`${property}`]}
							name={`${property}`}
							placeholder={obj[`${property}`].name}
							required="required"
							type={obj[`${property}`].type}
						/>
					</div>
				);
			}
		});
	};
	const submitForm = (e) => {
		e.preventDefault();
		console.log(user);
		dispatch(asynAction(user, history));
	};
	return (
		<form onSubmit={submitForm}>
			{formModel(data)}
			{!data.avatar && <button>Login</button>}
		</form>
	);
};
export default Form;
