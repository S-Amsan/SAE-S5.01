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
        position: "relative",
        padding:30,
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 21,
        marginBottom: 12,
        width:"80%",
    },

    image: {
        width: "45%",
        height: 350,
        borderRadius: 8,
    },

    body: {
        marginLeft: 10,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    title: {
        fontSize: 36,
        fontWeight: "700",
        color: "#111",
        paddingRight:15,
    },

    userRow: {
        marginTop:10,
        padding:12,
        flexDirection: "row",
        gap: 6,
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 13,
    },

    distance: {
        fontSize: 16,
        color: "#999",
        fontWeight: "500",
        marginLeft:15,
        marginTop:12,
    },

    userText: {
        fontSize: 20,
        fontWeight: "500",
        color: "#111",
    },

    address: {
        fontSize: 25,
        color: "#333",
        marginTop: 6,

    },

    bouttonContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
        justifyContent: "center",
        alignItems: "center",
    },


    button: {
        backgroundColor: "#1ED08C",
        paddingVertical: 20,
        paddingHorizontal: 100,
        borderRadius: 5,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

});
