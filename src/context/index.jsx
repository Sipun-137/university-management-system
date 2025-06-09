"use client";
import Cookies from "js-cookie";
import {createContext, useEffect, useState} from "react";

export const GlobalContext = createContext();

export default function GlobalState({children}) {
    const [isAuthUser, setAuthUser] = useState(null);
    const [verified,setVerified]=useState(false);
    const [user, setUser] = useState(null);
    const [role,setRole]=useState(null);
    useEffect(() => {
        if (Cookies.get("token") !== undefined) {
            setAuthUser(true);
            const userData = JSON.parse(localStorage.getItem("user"));
            setRole(userData.role);
            setUser(userData);
        } else {
            setAuthUser(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Cookies]);

    return (
        <GlobalContext.Provider
            value={{
                isAuthUser,
                setAuthUser,
                user,
                setUser,
                role,setRole,
                verified,setVerified
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
