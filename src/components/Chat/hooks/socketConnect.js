import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { baseURL } from '../../../config/axios';
import {
	fetchChats,
	offlineFriend,
	onlineFriend,
	onlineFriends,
	reciveMessage,
	setSocket,
} from '../../../store/actions/chat';

function useSocket(user, dispatch) {
	// console.log("user:", user);
	useEffect(() => {
		dispatch(fetchChats())
			.then(() => {
				const socket = socketIOClient.connect(baseURL);
				dispatch(setSocket(socket));

				socket.emit('join', user);
				socket.on('typing', (user) => {});
				socket.on('friends', (friendsId) => {
					console.log('friends', friendsId);
					dispatch(onlineFriends(friendsId));
				});
				socket.on('online', (user) => {
					dispatch(onlineFriend(user));
				});
				socket.on('offline', (user) => {
					dispatch(offlineFriend(user));
				});
				socket.on('received', (message) => {
					dispatch(reciveMessage(message, user.id));
				});
			})
			.catch((err) => console.log(err));
	}, [dispatch]);
}

export default useSocket;
