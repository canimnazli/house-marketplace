import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthStatus } from '../hooks/UseAuthStatus';

const PrivateRoute = () => {
	const { loggedIn, chekingStatus } = UseAuthStatus;
	if (chekingStatus) {
		return <h1>loading</h1>;
	}

	return loggedIn ? <Outlet></Outlet> : <Navigate to="/signin"></Navigate>;
};

export default PrivateRoute;
