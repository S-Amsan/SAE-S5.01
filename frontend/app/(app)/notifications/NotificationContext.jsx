import { createContext, useContext, useState, useEffect } from "react";
import { fetchNotifications } from "../../../services/notifications.api.js";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const openNotifications = () => setIsOpen(true);
    const closeNotifications = () => setIsOpen(false);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            const data = await fetchNotifications();
            setNotifications(data);
        } catch (e) {
            console.error("Erreur notifications :", e);
            setNotifications([]); // <-- stocke les notifications

        } finally {
            setLoading(false);
        }
    };

    // 🔥 recharge quand on ouvre le drawer
    useEffect(() => {
        if (isOpen) {
            loadNotifications();
        }
    }, [isOpen]);

    return (
        <NotificationContext.Provider
            value={{
                isOpen,
                openNotifications,
                closeNotifications,
                notifications,
                setNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
