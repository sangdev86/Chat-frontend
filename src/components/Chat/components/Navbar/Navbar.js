import React, { useState, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import { storeState } from '../../../../store/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	logout,
	updateProfile,
} from '../../../../store/actions/auth';
import Modal from '../../../../constants/Modal/Modal';
import Form from '../../../../constants/Form/Form';

const Navbar = ({ user }) => {
	const [showProfile, setShowProfile] = useState(false);
	const [showModal, setShowModal] = useState(false);
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
							<Form
								data={{
									firstName: user.firstName,
									lastName: user.lastName,
									email: user.email,
									password: '',
									gender: user.gender,
									avatar: null,
								}}
								asynAction={updateProfile}
								formData={true}
								name={'UPDATE'}
							/>
						</Fragment>
						<Fragment key="footer"></Fragment>
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
