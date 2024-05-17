"use client";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [unreadNumber, setUnreadNumber] = useState(0);
    return (
        <GlobalContext.Provider value={{
            unreadNumber,
            setUnreadNumber,
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}