import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChats } from '../../store/actions/chat';
import { storeState } from '../../store/reducers';
import FriendList from './components/FriendList/FriendList';
import Messager from './components/Messenger/Messager';
import Navbar from './components/Navbar/Navbar';
import useSocket from './hooks/socketConnect';

const Chat = ({ store = storeState }) => {
	const dispatch = useDispatch();
	useSocket(store.authReducer.user, dispatch);

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

export default Chat;
