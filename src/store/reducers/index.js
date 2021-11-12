import { combineReducers } from 'redux';

import {
	authReducer,
	initialState as authState,
} from './auth';
import {
	chatReducer,
	initialState as chatState,
} from './chat';

export const rootReducer = combineReducers({
	authReducer,
	chatReducer,
});

// interface
export const storeState = {
	authReducer: authState,
	chatReducer: chatState,
};

export const mapStateToProps = (state = storeState) => {
	return {
		store: state,
		authReducer: state.authReducer,
		chatReducer: state.chatReducer,
	};
};
