import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 20,
        gap: 16,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        position: "relative",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,

        elevation: 6,
    },


    cardActive: {
        borderWidth: 2,
        borderColor: "#2F80ED",
    },

    left: {
        flex: 1,
        gap: 8,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
    },

    title: {
        color: "#555",
    },

    logo: {
        width: 72,
        height: 72,
        resizeMode: "contain",
    },

    pointsBadge: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "#2ECC71",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },

    pointsText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
    },

    button: {
        marginTop: 12,
        alignSelf: "flex-start",
        backgroundColor: "#2ECC71",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },

    buttonPending: {
        backgroundColor: "#2D9CDB",
    },

    buttonValidated: {
        backgroundColor: "#27AE60",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
