import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: "#fff",
    },

    rewardBox: {
        backgroundColor: "#10D79E",
        borderRadius: 12,
        padding: 16,
        marginBottom: 32,
    },

    rewardTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },

    rewardSub: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.9,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 16,
    },

    uploadBox: {
        height: 180,
        backgroundColor: "#F5F5F5",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },

    uploadIcon: {
        fontSize: 48,
        opacity: 0.5,
    },

    reminder: {
        marginBottom: 24,
    },

    reminderTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },

    reminderItem: {
        fontSize: 14,
        color: "#444",
        marginBottom: 4,
    },

    footerText: {
        fontSize: 13,
        color: "#777",
        marginBottom: 16,
    },

    submitButton: {
        backgroundColor: "#10D79E",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
    },

    submitDisabled: {
        opacity: 0.5,
    },

    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    deleteInfo: {
        fontSize: 12,
        color: "#777",
        textAlign: "center",
        marginTop: 12,
    },

    /* ===== MODAL WEB ===== */
    modalOverlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },

    modalContent: {
        padding: 25,
        width: 480,
        maxHeight: "90vh",
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
    },

    modalClose: {
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 10,
    },

    /* ===== MENU UPLOAD WEB ===== */
    menuOverlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },

    menuContainer: {
        width: 360,
        backgroundColor: "#f3f3f3",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },

    menuRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 20,
    },

    menuIcon: {
        width: 28,
        height: 28,
        resizeMode: "contain",
        marginRight: 16,
    },

    menuText: {
        fontSize: 18,
        fontWeight: "500",
    },

    menuSeparator: {
        height: 1,
        backgroundColor: "#e5e5e5",
        marginLeft: 56,
    },
});
