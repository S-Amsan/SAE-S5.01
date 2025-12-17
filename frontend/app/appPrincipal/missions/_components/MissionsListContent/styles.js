import { StyleSheet } from "react-native";

export default StyleSheet.create({

    page: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F8F8F8",
    },

    left: {
        flex: 2,
        padding: 16,
    },

    header: {
        backgroundColor: "#3EDFA4",
        color: "#fff",
        padding: 16,
        borderRadius: 8,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 16,
        textAlign: "center",
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        alignItems: "center",
    },

    image: {
        width: 110,
        height: 80,
        borderRadius: 8,
    },

    content: {
        flex: 1,
        marginLeft: 12,
    },

    title: {
        fontSize: 15,
        fontWeight: "600",
    },

    address: {
        color: "#666",
        marginVertical: 4,
        fontSize: 13,
    },

    meta: {
        color: "#999",
        fontSize: 12,
    },

    right: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        height: 80,
    },

    distance: {
        color: "#666",
        fontSize: 12,
    },

    button: {
        backgroundColor: "#3EDFA4",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    },

    /* COLONNE DROITE */
    rightPanel: {
        flex: 1,
        padding: 16,
    },

    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },

    infoTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },

    infoDesc: {
        fontSize: 13,
        color: "#666",
        marginBottom: 12,
    },

    infoButton: {
        backgroundColor: "#3EDFA4",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: "flex-start",
    },

    infoButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
