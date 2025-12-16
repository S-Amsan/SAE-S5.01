import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]); // load from API later
    const [navbarWidth, setNavbarWidth] = useState(0);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <NotificationContext.Provider value={{ open, openDrawer, closeDrawer, notifications, setNotifications, setNavbarWidth }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    return useContext(NotificationContext);
}
