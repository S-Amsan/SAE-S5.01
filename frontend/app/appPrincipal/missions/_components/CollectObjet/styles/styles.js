import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
    },

    rewardBox: {
        backgroundColor: "#14D88F",
        borderRadius: 14,
        padding: 16,
        marginBottom: 28,
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
        height: 220,
        backgroundColor: "#F4F4F4",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },

    uploadIcon: {
        fontSize: 48,
        opacity: 0.5,
    },

    preview: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
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
        marginBottom: 20,
    },

    submitButton: {
        backgroundColor: "#14D88F",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
    },

    submitDisabled: {
        opacity: 0.4,
    },

    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
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

    descriptionBox: {
        marginTop: 16,
    },

    descriptionLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },

    descriptionInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        minHeight: 100,
        backgroundColor: "#fff",
    },

});
