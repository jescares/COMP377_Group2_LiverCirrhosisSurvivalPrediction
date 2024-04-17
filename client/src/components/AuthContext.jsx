// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userCredentials, callback) => {
        setUser({ username: userCredentials.username });
        if (callback) {
            callback();
        }
    };

    const logout = () => {
        setUser(null);
    };

    const isAuth = () => {
        return user != null;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
