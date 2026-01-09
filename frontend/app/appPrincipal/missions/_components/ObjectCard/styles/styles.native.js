import { StyleSheet } from "react-native";

export default StyleSheet.create({
    /* ===== PAGE ===== */
    page: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    left: {
        padding: 12,
        width: "100%",
    },

    /* ===== HEADER ===== */
    header: {
        backgroundColor: "#45E2B2",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        width: "100%",
    },

    headerTitle: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    /* ===== CARD ===== */
        card: {
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 18,
            marginBottom: 16,
            alignItems: "center",

            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 3,
        },

        image: {
            width: 110,
            height: 110,
            borderRadius: 16,
            backgroundColor: "#eee",
        },

        body: {
            flex: 1,
            marginLeft: 5,
        },

        topRow: {
            flexDirection: "row",
            alignItems: "center",
        },

        title: {
            fontSize: 18,
            fontWeight: "700",
            color: "#111",

            paddingRight:6,
        },

        distance: {
            fontSize: 10,
            color: "#999",
            fontWeight: "500",

        },

        userRow: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
            gap: 6,
        },

        avatar: {
            width: 26,
            height: 26,
            borderRadius: 13,
        },

        userText: {
            fontSize: 14,
            fontWeight: "500",
            color: "#111",
        },

        address: {
            fontSize: 12,
            color: "#333",
            marginTop: 6,

        },

        right: {
            justifyContent: "center",
            alignItems: "center",
            marginRight:5,
        },

        button: {
            backgroundColor: "#1ED08C",
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 5,
        },

        buttonText: {
            color: "#fff",
            fontSize: 12,
            fontWeight: "700",
        },

});
