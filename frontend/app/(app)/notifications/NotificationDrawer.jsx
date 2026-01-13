import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Pressable,
    Image,
    ScrollView, useWindowDimensions, Platform,
} from "react-native";
import { fetchNotifications } from "../../../services/notifications.api";
import { useEffect, useRef, useState } from "react";
import { useNotification } from "./NotificationContext";
import {width} from "../../../utils/dimensions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const DRAWER_WIDTH = Platform.OS === "web" ? SCREEN_WIDTH*0.25 : "100%";
const DRAWER_HEIGHT = Platform.OS === "web" ? SCREEN_HEIGHT : 300; // hauteur du drawer mobile
export default function NotificationDrawer() {
    const { isOpen, closeNotifications, notifications, setNotifications } = useNotification();
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const translateY = useRef(new Animated.Value(DRAWER_HEIGHT)).current; // mobile part du bas
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {

        if (Platform.OS === 'web') {

            if (isOpen) {
                setVisible(true);
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }).start();
                setLoading(true);
                fetchNotifications()
                    .then((data) => {
                        setNotifications(data || []); // update le contexte
                    })
                    .catch((e) => {
                        console.error("Erreur notifications :", e);
                        setNotifications([]); // si erreur, on vide
                        setError(e);
                    })
                    .finally(() => setLoading(false));


            }else {
                Animated.timing(translateX, {
                    toValue: -DRAWER_WIDTH,
                    duration: 250,
                    useNativeDriver: true,
                }).start(() => setVisible(false));
            }

    }
        else{
            if (isOpen) {
                setVisible(true);
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }).start();

            }else {
                Animated.timing(translateY, {
                    toValue: SCREEN_HEIGHT,
                    duration: 250,
                    useNativeDriver: true,
                }).start(() => setVisible(false));
            }
        }

    }, [isOpen]);

    if (!visible) return null;

    return (

    <View style={styles.overlay}>
            <Pressable style={styles.background} onPress={closeNotifications} />

            <Animated.View style={[
                styles.drawer,
                Platform.OS === 'web'
                    ? { transform: [{ translateX }] }
                    : { transform: [{ translateY }] },
            ]}
            >
                <Text style={styles.title}>Notifications</Text>

                <ScrollView>
                    {loading && <Text>Chargement des notifications...</Text>}
                    {!loading && notifications.length === 0 && (
                        <Text>Aucune notification</Text>
                    )}
                    {!loading && notifications.map((notif, index) => (

                        <View key={index} style={styles.notification}>
                            {notif.imageUrl && (
                                <Image
                                    source={{ uri: notif.imageUrl }}
                                    style={styles.image}
                                />
                            )}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.notifTitle}>{notif.title}</Text>
                                <Text style={styles.notifDesc}>{notif.description}</Text>
                                <Text style={styles.notifDate}>{notif.receivedAt}</Text>
                                <Text style={styles.notifTitle}>{notif.status}</Text>
                            </View>
                        </View>
                    ))}
                    {error && <Text style={{ color: "red" }}>Erreur de chargement</Text>}
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
        left: Platform.OS === "web" ? isSmall ? 80 : isMedium ? 200 : 260 : 0,
        height: Platform.OS === "web" ? "100%" : (SCREEN_HEIGHT *0.75),
        top: Platform.OS === "web" ? 0 : "25%",
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: "#fff",
        padding: 20,
        elevation: 10,
        borderTopRightRadius: Platform.OS === "web" ? 20 : 20,
        borderBottomRightRadius: Platform.OS === "web" ? 20 : 0,
        borderTopLeftRadius : Platform.OS === "web" ? 0 : 20,


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
