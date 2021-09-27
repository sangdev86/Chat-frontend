import { combineReducers } from "redux";

import {
	authReducer,
	initialState as authState,
} from "./auth";

export const rootReducer = combineReducers({
	authReducer,
});

export const storeState = {
	authReducer: authState,
};
