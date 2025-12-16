import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { useNotifications } from "./NotificationContext";
import NotificationItem from "./NotificationItem";
import style from "./styles/StyleNotificationDrawer";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(420, Math.round(width * 0.92));

export default function NotificationDrawer() {
    const { open, closeDrawer, notifications, navbarWidth } = useNotifications();

    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);
            translateX.setValue(-DRAWER_WIDTH);

            Animated.timing(translateX, {
                toValue: 0,
                duration: 260,
                useNativeDriver: true,
            }).start();
        } else if (mounted) {
            Animated.timing(translateX, {
                toValue: -DRAWER_WIDTH,
                duration: 260,
                useNativeDriver: true,
            }).start(() => {
                setMounted(false);
            });
        }
    }, [open]);

    if (!mounted) return null;

    const DrawerContent = (
        <>
            {/* BACKDROP (ne couvre PAS la navbar) */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={closeDrawer}
                style={[
                    style.backdrop,
                    { left: navbarWidth }
                ]}
            />

            {/* DRAWER */}
            <Animated.View
                style={[
                    style.drawer,
                    {
                        left: navbarWidth,
                        transform: [{ translateX }],
                    },
                ]}
            >
                <View style={style.header}>
                    <Text style={style.title}>Notifications</Text>
                    <TouchableOpacity onPress={closeDrawer} style={style.closeButton}>
                        <Text style={style.closeText}>X</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ color: "#666", marginBottom: 12 }}>
                        Cette semaine
                    </Text>

                    {notifications && notifications.length > 0 ? (
                        notifications.map((n) => (
                            <NotificationItem key={n.id} item={n} />
                        ))
                    ) : (
                        <>
                            <NotificationItem
                                item={{
                                    id: "sample1",
                                    title: "Votre carte cadeau 🎁",
                                    text: "Récupérez le code de votre carte cadeau dans l'onglet 'Mes achats'...",
                                    date: "Aujourd'hui",
                                    unread: true,
                                }}
                            />
                            <NotificationItem
                                item={{
                                    id: "sample2",
                                    title: "Votre avis compte 💚",
                                    text: "N'hésitez pas à laisser un avis, c'est très rapide.",
                                    date: "Aujourd'hui",
                                    unread: true,
                                }}
                            />
                            <NotificationItem
                                item={{
                                    id: "sample3",
                                    title: "Victoire ! ✌️",
                                    text: "Vous avez remporté l'événement 'Opération Zéro Déchet'.",
                                    date: "Hier",
                                    unread: false,
                                }}
                            />
                        </>
                    )}

                    <View style={{ height: 20 }} />
                </ScrollView>
            </Animated.View>
        </>
    );

    // 📱 MOBILE → Modal
    if (Platform.OS !== "web") {
        return DrawerContent;
    }

    // 💻 WEB → rendu normal (zIndex respecté)
    return DrawerContent;
}
