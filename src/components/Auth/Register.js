import React from "react";
import registerImage from "../../assets/img/register.svg";
import { Link } from "react-router-dom";

import { register } from "../../store/actions/auth";
import Form from "../../constants/Form/Form";

const Register = ({ history }) => {
	return (
		<div id="auth-container">
			<div id="auth-card">
				<div className="card-shadow">
					<div id="image-section">
						<img src={registerImage} alt="register" />
					</div>
					<div id="form-section">
						<h2>Welcome back</h2>
						<Form
							data={{
								firstName: "",
								lastName: "",
								email: "",
								password: "",
								gender: "male",
							}}
							asynAction={register}
							history={history}
						/>
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
