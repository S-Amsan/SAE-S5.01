import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Pressable,
    Image,
    ScrollView, useWindowDimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useNotification } from "./NotificationContext";
import {width} from "../../../utils/dimensions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = SCREEN_WIDTH*0.25;

export default function NotificationDrawer() {
    const { isOpen, closeNotifications,     notifications = []} = useNotification();
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            Animated.timing(translateX, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateX, {
                toValue: -DRAWER_WIDTH,
                duration: 250,
                useNativeDriver: true,
            }).start(() => setVisible(false));
        }
    }, [isOpen]);

    if (!visible) return null;

    return (

    <View style={styles.overlay}>
            <Pressable style={styles.background} onPress={closeNotifications} />

            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
                <Text style={styles.title}>Notifications</Text>

                <ScrollView>
                    {notifications.length === 0 && (
                        <Text>Aucune notification</Text>
                    )}

                    {notifications.map((notif, index) => (
                        <View key={index} style={styles.notification}>
                            {notif.Img_url && (
                                <Image
                                    source={{ uri: notif.Img_url }}
                                    style={styles.image}
                                />
                            )}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.notifTitle}>{notif.Titre}</Text>
                                <Text style={styles.notifDesc}>{notif.Description}</Text>
                                <Text style={styles.notifDate}>{notif.Date_Reception}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
}


const isSmall = width < 1100;
const isMedium = width >= 1100 && width < 1600;
const styles = StyleSheet.create({

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: "100%",
        zIndex: 1000,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    drawer: {
        position: "absolute",
        left: isSmall ? 80 : isMedium ? 200 : 260,
        top: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: "#fff",
        padding: 20,
        elevation: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    notification: {
        flexDirection: "row",
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5,
    },
    notifTitle: {
        fontWeight: "bold",
    },
    notifDesc: {
        color: "#555",
    },
    notifDate: {
        color: "#999",
        fontSize: 12,
        marginTop: 3,
    },
});
