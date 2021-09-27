import React from "react";
import { Redirect, Route } from "react-router";
import { connect } from "react-redux";
import { storeState } from "../store/reducers";

const ProtectedRoute = ({
	component: Component,
	isLoggedIn,
	...props
}) => {
	return (
		<Route
			{...props}
			render={(props) =>
				isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};
const mapStateToProps = (state = storeState) => {
	return {
		isLoggedIn: state.authReducer.isLoggedIn,
	};
};
export default connect(
	mapStateToProps,
	null
)(ProtectedRoute);
