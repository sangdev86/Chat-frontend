import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchChats } from '../../store/actions/chat';
import { storeState } from '../../store/reducers';

import FriendList from './components/FriendList/FriendList';
import Messager from './components/Messenger/Messager';
import Navbar from './components/Navbar/Navbar';

const Chat = ({ authReducer = storeState.authReducer }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchChats());
	}, [dispatch]);
	return (
		<div id="chat-container">
			<Navbar />
			<div id="chat-wrap">
				<FriendList />
				<Messager />
			</div>
		</div>
	);
};

const mapStateToProps = (state = storeState) => {
	return {
		authReducer: state.authReducer,
	};
};
export default connect(mapStateToProps, null)(Chat);
