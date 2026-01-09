import { StyleSheet } from "react-native";

export default StyleSheet.create({
    /* ===== PAGE ===== */
    page: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#f5f5f5",
    },

    left: {
        padding: 30,
        alignItems: "center",
        width: "100%",
    },

    /* ===== HEADER ===== */
    header: {
        backgroundColor: "#45E2B2",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: 920,
        justifyContent: "center",
    },

    headerTitle: {
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },

    /* ===== CARD ===== */
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 20,
        width: "80%",
        marginBottom: 20,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    /* ===== IMAGE OBJET ===== */
    image: {
        width: "30%",
        height: 220,
        borderRadius: 14,
        backgroundColor: "#eee",
    },

    /* ===== CONTENT ===== */
    content: {
        flex: 1,
        padding: 16,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
    },

    userRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },

    actionRow: {
        marginTop: 16,
        alignItems: "flex-end",
    },


    userInfo: {
        marginLeft: 10,
    },

    title: {
        fontSize: 26,
        fontWeight: "600",
        color: "#111",
    },

    address: {
        fontSize: 14,
        color: "#666",
        marginVertical:10,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    name: {
        fontSize: 20,
        fontWeight: "500",
    },

    meta: {
        fontSize: 14,
        color: "#999",
        marginTop: 2,
    },

    describe: {
        marginTop: 16,
        fontSize: 16,
        color: "#333",
        lineHeight: 22,
    },
    button: {
        backgroundColor: "#3EDFA4",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 12,
        minWidth: 250,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
    },

});
