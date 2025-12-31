import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 120,
    },

    /* ================= CARD ================= */

    card: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        marginBottom: 16,
        padding: 18,
        position: "relative",

        // shadow iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 14,

        // shadow Android
        elevation: 6,
    },

    /* ================= LEFT ================= */

    left: {
        flex: 1,
        paddingRight: 120,
        justifyContent: "center",
    },

    name: {
        fontSize: 20,
        fontWeight: "800",
        color: "#000",
        marginBottom: 6,
    },

    title: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
        marginBottom: 16,
    },

    /* ================= BUTTON ================= */

    button: {
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
    },

    buttonStart: {
        backgroundColor: "#06DA95",
    },

    buttonPending: {
        backgroundColor: "#4DA6FF",
    },

    buttonValidated: {
        backgroundColor: "#1DBF73",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    /* ================= IMAGE ZONE ================= */

    imageWrapper: {
        position: "absolute",
        right: 12,
        top: 12,
        bottom: 12,
        width: 96,
        borderRadius: 16,

        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width:80,
        height: 80,
        resizeMode: "contain",
        marginTop: 30,
    },

    /* ================= POINTS BADGE ================= */

    pointsBadge: {
        position: "absolute",
        top: -2,
        right: -5,
        backgroundColor: "#06DA95",
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 10,
    },

    pointsIcon: {
        width: 18,
        height: 18,
        marginLeft: 6,
        resizeMode: "contain",
    },

    pointsText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "800",
    },
});
