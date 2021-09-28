import React, { useState, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { storeState } from "../../../store/reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../../store/actions/auth";
import Modal from "../../../constants/Modal/Modal";
import Form from "../../../constants/Form/Form";

const Navbar = ({ user }) => {
	const [showProfile, setShowProfile] = useState(false);
	const [showModal, setShowModal] = useState(true);
	const dispatch = useDispatch();
	user.password = "";
	return (
		<div id="navbar" className="card-shadow">
			<h2>Chat.io</h2>
			<div
				onClick={() => {
					setShowProfile(!showProfile);
				}}
				id="profile-menu"
			>
				<img
					height="40"
					width="40"
					src={user.avatar}
					alt="Avatar"
				/>
				<p>
					{user.firstName} {user.lastName}
				</p>
				<FontAwesomeIcon
					icon="caret-down"
					className="fa-icon"
				/>
				{showProfile && (
					<div id="profile-options">
						<p onClick={() => setShowModal(true)}>
							Update profile
						</p>
						<p onClick={() => dispatch(logout())}>LogOut</p>
					</div>
				)}
				{showModal && (
					<Modal click={() => setShowModal(false)}>
						<Fragment key="header">Update Profile</Fragment>
						<Fragment key="body">
							<Form data={user} />
						</Fragment>
						<Fragment key="footer">Modal Footer 3</Fragment>
					</Modal>
				)}
			</div>
		</div>
	);
};
const mapStateToProps = (state = storeState) => {
	return {
		user: state.authReducer.user,
	};
};
export default connect(mapStateToProps, null)(Navbar);
