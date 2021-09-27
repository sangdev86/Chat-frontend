import React, { useState } from "react";
import registerImage from "../../assets/img/register.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../store/actions/auth";

const Register = ({ history }) => {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		gender: "male",
	});
	const dispatch = useDispatch();
	const value = (e) => {
		const { value } = e.target;
		return value;
	};
	const submitForm = (e) => {
		e.preventDefault();
		dispatch(register(user, history));
		console.log(user);
	};
	return (
		<div id="auth-container">
			<div id="auth-card">
				<div className="card-shadow">
					<div id="image-section">
						<img src={registerImage} alt="register" />
					</div>
					<div id="form-section">
						<h2>Welcome back</h2>
						<form onSubmit={submitForm}>
							<div className="input-field mb-1">
								<input
									onChange={(e) => {
										setUser({
											...user,
											firstName: value(e),
										});
									}}
									value={user.firstName}
									name="firstName"
									placeholder="First Name"
									required="required"
									type="text"
								/>
							</div>
							<div className="input-field mb-1">
								<input
									onChange={(e) => {
										setUser({
											...user,
											lastName: value(e),
										});
									}}
									value={user.lastName}
									name="lastName"
									placeholder="Last Name"
									required="required"
									type="text"
								/>
							</div>
							<div className="input-field mb-1">
								<input
									onChange={(e) => {
										setUser({ ...user, email: value(e) });
									}}
									value={user.email}
									name="email"
									placeholder="Email"
									required="required"
									type="text"
								/>
							</div>
							<div className="input-field mb-1">
								<input
									onChange={(e) => {
										setUser({
											...user,
											password: value(e),
										});
									}}
									value={user.password}
									name="password"
									placeholder="Password"
									required="required"
									type="password"
								/>
							</div>
							<div className="input-field mb-1">
								<select
									onChange={(e) => {
										setUser({ ...user, gender: value(e) });
									}}
									value={user.gender}
									mame="gender"
									placeholder="Gender"
									required="required"
									type="option"
								>
									<option value="male">Male</option>
									<option value="male">Female</option>
									<option value="male">Other</option>
								</select>
							</div>
							<button>Login</button>
						</form>
						<p>
							Already have an account?
							<Link to="/login"> Login</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
