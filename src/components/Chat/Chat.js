import React from 'react';
import { connect } from 'react-redux';
import { storeState } from '../../store/reducers';
import Navbar from './components/Navbar';

const Chat = ({ authReducer = storeState.authReducer }) => {
	return (
		<div id="chat-container">
			<Navbar />
			<div id="chat-wrap">Data</div>
		</div>
	);
};

const mapStateToProps = (state = storeState) => {
	return {
		authReducer: state.authReducer,
	};
};
export default connect(mapStateToProps, null)(Chat);
