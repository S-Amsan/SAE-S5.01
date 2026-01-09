import { StyleSheet } from "react-native";

export default StyleSheet.create({
    /* ===== CONTAINER ===== */
    webContainer: {
        padding: 24,
        gap: 24,
    },

    /* ===== CARD ===== */
    webCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 22,
        boxShadow: "0px 5px 18px rgba(0,0,0,0.10)",
    },

    /* ===== HEADER ===== */
    webHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    webHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    webSmallLogo: {
        width: 38,
        height: 38,
        resizeMode: "contain",
    },

    webPartnerName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#3CBFA3",
    },

    /* ===== POINTS BADGE ===== */
    webPointsBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#06DA95",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
    },

    webPointsText: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 13,
        marginRight: 6,
    },

    webPointsIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },

    /* ===== CONTENT ===== */
    webContent: {
        alignItems: "center",
        gap: 14,
        paddingHorizontal: 16,
    },

    webTitle: {
        fontSize: 19,
        fontWeight: "800",
        textAlign: "center",
        maxWidth: 720,
    },

    webDescription: {
        fontSize: 14,
        color: "#444",
        textAlign: "center",
        maxWidth: 720,
    },

    /* ===== ACTION ===== */
    webActionRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 6,
    },

    webActionButton: {
        backgroundColor: "#06DA95",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        cursor: "pointer",
    },

    webActionText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    webButtonPending: {
        backgroundColor: "#4DA6FF",
        cursor: "not-allowed",
    },

    webButtonValidated: {
        backgroundColor: "#1DBF73",
        cursor: "default",
    },

    webButtonRejected: {
        backgroundColor: "#E74C3C",
        cursor: "not-allowed",
    },


    /* ===== FOOTER ===== */
    webFooterText: {
        fontSize: 12,
        color: "#777",
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 6,
    },
});
