import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const openNotifications = () => setIsOpen(true);
    const closeNotifications = () => setIsOpen(false);

    return (
        <NotificationContext.Provider
            value={{ isOpen, openNotifications, closeNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
