import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useAuth } from "../hook/useAuth";

export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(Cookies.get("jwtToken")); // Use the 'jwtToken' cookie

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            Cookies.set('jwtToken', token, { expires: 7, secure: true, httpOnly: true }); // Store JWT in a secure and HTTP-only cookie
        } else {
            delete axios.defaults.headers.common["Authorization"];
            Cookies.remove('jwtToken'); // delete cookie
        }
    }, [token]);

    // Handle token expiration and log out here if needed

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useA = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
};

export default AuthProvider;