import { View, Text, StyleSheet, Animated, Dimensions, Pressable } from "react-native";
import { useEffect, useRef } from "react";
import { useNotification } from "./NotificationContext";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = 300;

export default function NotificationDrawer() {
    const { isOpen, closeNotifications } = useNotification();
    const translateX = useRef(new Animated.Value(DRAWER_WIDTH)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isOpen ? 0 : DRAWER_WIDTH,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <View style={styles.overlay}>
            <Pressable style={styles.background} onPress={closeNotifications} />
            <Animated.View
                style={[
                    styles.drawer,
                    { transform: [{ translateX }] },
                ]}
            >
                <Text style={styles.title}>Notifications</Text>
                <Text>- Notification 1</Text>
                <Text>- Notification 2</Text>
                <Text>- Notification 3</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: "100%",
        zIndex: 1000,
        flexDirection: "row",
    },
    background: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    drawer: {
        width: DRAWER_WIDTH,
        backgroundColor: "#fff",
        padding: 20,
        elevation: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
