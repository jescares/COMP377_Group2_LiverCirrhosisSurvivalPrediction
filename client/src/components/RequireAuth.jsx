// RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuth = ({ children }) => {
    const auth = useAuth();

    if (!auth.isAuth()) {
        // Redirect them to the login page if not logged in
        return <Navigate to="/login-page" />;
    }

    return children;
};

export default RequireAuth;
