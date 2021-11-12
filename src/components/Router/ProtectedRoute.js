import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ComponentSetUp from '../../constants/ComponentSetUp/ComponentSetUp';

const ProtectedRoute = ({
	component: Component,
	...props
}) => {
	const isLoggedIn = useSelector(
		(state) => state.authReducer.isLoggedIn
	);

	return (
		<Route
			{...props}
			render={(props) =>
				isLoggedIn ? (
					<ComponentSetUp
						component={Component}
						{...props}
					/>
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default ProtectedRoute;
