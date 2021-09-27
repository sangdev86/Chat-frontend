import React, { useState, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { storeState } from "../../../store/reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../../store/actions/auth";
import Modal from "../../Modal/Modal";

const Navbar = ({ user }) => {
	const [showProfile, setShowProfile] = useState(false);
	const dispatch = useDispatch();
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
						<p>Update profile</p>
						<p onClick={() => dispatch(logout())}>LogOut</p>
					</div>
				)}
				{
					<Modal>
						<Fragment key="header">Modal Header</Fragment>
						<Fragment key="body">Modal Body</Fragment>
						<Fragment key="footer">Modal Footer</Fragment>
					</Modal>
				}
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
