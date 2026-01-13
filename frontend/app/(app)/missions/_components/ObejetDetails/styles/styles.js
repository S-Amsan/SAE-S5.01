import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: "#fff",
    },

    /* ===== BANNER RÉCOMPENSE ===== */
    rewardBox: {
        backgroundColor: "#10D79E",
        borderRadius: 16,
        padding: 18,
        marginBottom: 22,
    },

    rewardTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
    },

    rewardSub: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.95,
    },

    /* ===== TITRE & ADRESSE ===== */
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 6,
        color: "#111",
    },

    address: {
        fontSize: 15,
        color: "#555",
        marginBottom: 18,
    },

    /* ===== IMAGE ===== */
    image: {
        width: "100%",
        height: 260,
        borderRadius: 18,
        marginBottom: 16,
        backgroundColor: "#eee",
    },

    /* ===== META ===== */
    meta: {
        fontSize: 14,
        color: "#666",
        marginBottom: 22,
    },

    author: {
        fontWeight: "600",
        color: "#111",
    },

    /* ===== DESCRIPTION ===== */
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
        color: "#111",
    },

    descriptionBox: {
        backgroundColor: "#f3f3f3",
        borderRadius: 14,
        padding: 14,
        marginBottom: 32,
    },

    descriptionText: {
        fontSize: 15,
        color: "#333",
        lineHeight: 22,
    },

    primaryButton: {
        backgroundColor: "#10D79E",
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: "center",
    },

    primaryButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },


    reportWrapper: {
        marginTop: 20,
        alignItems: "center",
    },

    reportText: {
        fontSize: 14,
        color: "#555",
    },

    reportLink: {
        fontWeight: "700",
        color: "#111",
    },

    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },


    modalContent: {
        width: 520,
        maxWidth: "92vw",
        maxHeight: "90vh",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 24,
        position: "relative",
        overflow: "hidden",
    },


    modalScroll: {
        paddingBottom: 24,
    },


    modalClose: {
        position: "absolute",
        top: 14,
        right: 14,
        zIndex: 10,
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F2F2F2",
    },

    modalCloseText: {
        fontSize: 18,
        fontWeight: "600",
    },
});
