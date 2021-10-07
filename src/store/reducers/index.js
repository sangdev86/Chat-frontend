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

export const storeState = {
	authReducer: authState,
	chatReducer: chatState,
};
