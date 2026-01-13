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

    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },

    modalContent: {
        padding:25,
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

});
