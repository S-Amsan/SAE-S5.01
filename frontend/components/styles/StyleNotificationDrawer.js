import { StyleSheet, Dimensions, Platform } from "react-native"

const { width, height } = Dimensions.get("window");

const isDesktop = width > 1024;

const DRAWER_WIDTH = Math.min(420, Math.round(width * 0.92));
const NAVBAR_WIDTH = isDesktop ? 280 : width * 0.25; // max 280px ou 25% de l'écran

export default StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    drawer: {
        position: "absolute",
        top: 0,
        left: NAVBAR_WIDTH,
        width: DRAWER_WIDTH,
        height: "100%",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 0,
        paddingHorizontal: 18,
        paddingTop: Platform.OS === "web" ? 40 : 25,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
    },
    closeButton: {
        padding: 6,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    closeText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#666",
        marginBottom: 12,
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: "#eee",
        gap: 12,
    },
    notificationAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ddd",
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
        marginBottom: 3,
    },
    notificationText: {
        fontSize: 13,
        color: "#444",
        lineHeight: 18,
    },
    notificationDate: {
        fontSize: 12,
        color: "#999",
        marginTop: 4,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#00DB83",
        position: "absolute",
        top: 12,
        right: 0,
    },
});
