// NotificationDrawerOverlay.jsx
import React, { useEffect, useRef, useState } from "react";
import {Animated, View, TouchableOpacity, ScrollView, Platform, Text} from "react-native";
import { useNotifications } from "./NotificationContext";
import NotificationItem from "./NotificationItem";
import style from "./styles/styleNotificationsDrawer";

const DRAWER_WIDTH = 420;

export default function NotificationDrawerOverlay() {
    const { open, closeDrawer, notifications } = useNotifications();
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);
            Animated.timing(translateX, { toValue: 0, duration: 260, useNativeDriver: true }).start();
        } else if (mounted) {
            Animated.timing(translateX, { toValue: -DRAWER_WIDTH, duration: 260, useNativeDriver: true }).start(() => setMounted(false));
        }
    }, [open]);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <TouchableOpacity
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.3)",
                    zIndex: 999,
                }}
                onPress={closeDrawer}
            />

            {/* Drawer */}
            <Animated.View
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: DRAWER_WIDTH,
                    height: "100%",
                    backgroundColor: "#fff",
                    zIndex: 1000,
                    transform: [{ translateX }],
                    paddingHorizontal: 18,
                    paddingTop: Platform.OS === "web" ? 40 : 25,
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                }}
            >
                <View style={style.header}>
                    <Text style={style.title}>Notifications</Text>
                    <TouchableOpacity onPress={closeDrawer} style={style.closeButton}>
                        <Text style={style.closeText}>X</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {notifications && notifications.length > 0
                        ? notifications.map((n) => <NotificationItem key={n.id} item={n} />)
                        : [
                            {
                                id: "sample1",
                                title: "Votre carte cadeau 🎁",
                                text: "Récupérez le code de votre carte cadeau...",
                                date: "Aujourd'hui",
                                unread: true,
                            },
                            {
                                id: "sample2",
                                title: "Votre avis compte 💚",
                                text: "Laissez un avis, c'est rapide.",
                                date: "Aujourd'hui",
                                unread: true,
                            },
                        ].map((n) => <NotificationItem key={n.id} item={n} />)}
                </ScrollView>
            </Animated.View>
        </>
    );
}
