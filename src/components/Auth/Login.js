import React, { useState } from 'react';
import loginImage from '../../assets/img/login.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/auth';

const Login = ({ history }) => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const dispatch = useDispatch();

	const submitForm = (e) => {
		e.preventDefault();
		dispatch(login(user, history));
		console.log(user);
	};

	return (
		<div id="auth-container">
			<div id="auth-card">
				<div className="card-shadow">
					<div id="image-section">
						<img src={loginImage} alt="Login" />
					</div>
					<div id="form-section">
						<h2>Welcome back</h2>
						<form onSubmit={submitForm}>
							<div className="input-field mb-1">
								<input
									onChange={(e) =>
										setUser({
											...user,
											email: e.target.value,
										})
									}
									value={user.email}
									required="required"
									type="text"
									placeholder="Email"
								/>
							</div>
							<div className="input-field mb-2">
								<input
									onChange={(e) =>
										setUser({
											...user,
											password: e.target.value,
										})
									}
									value={user.password}
									required="required"
									type="password"
									placeholder="Password"
								/>
							</div>
							<button>Login</button>
						</form>
						<p>
							Don't have an account?
							<Link to="/register"> Register</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
