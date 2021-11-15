import React from 'react';
import { connect } from 'react-redux';
import ComponentSetUp from '../../../../constants/ComponentSetUp/ComponentSetUp';
import { storeState } from '../../../../store/reducers';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageBox from '../MessageBox/MessageBox';
import MessageInput from '../MessageInput/MessageInput';

const Messager = ({
	chatReducer = storeState.chatReducer,
}) => {
	const { currentChat } = chatReducer;
	const activeChat = () => {
		return Object.keys(chatReducer.currentChat).length > 0;
	};
	return (
		<div id="messenger" className="shadow-light">
			{activeChat() ? (
				<div id="messenger-wrap">
					<ChatHeader currentChat={currentChat} />
					<hr />
					<ComponentSetUp
						component={MessageBox}
						currentChat={currentChat}
					/>
					<ComponentSetUp
						component={MessageInput}
						currentChat={currentChat}
					/>
				</div>
			) : (
				<p>No Active Chat</p>
			)}
		</div>
	);
};

const mapStateToProps = (state = storeState) => {
	return {
		chatReducer: state.chatReducer,
	};
};
export default connect(mapStateToProps, null)(Messager);
