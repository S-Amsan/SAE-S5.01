import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: "#fff",
    },

    rewardBox: {
        backgroundColor: "#10D79E",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
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

    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 16,
    },

    input: {
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        padding: 14,
        fontSize: 15,
    },

    textArea: {
        height: 90,
        textAlignVertical: "top",
    },

    photoBox: {
        height: 160,
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
        overflow: "hidden",
    },

    preview: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    photoIcon: {
        fontSize: 40,
        opacity: 0.5,
    },

    reminder: {
        marginTop: 16,
        fontSize: 13,
        color: "#777",
    },

    submitButton: {
        marginTop: 24,
        backgroundColor: "#10D79E",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
    },

    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    /* 🌐 MODAL */
    modalOverlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },

    modalContent: {
        position: "relative",
        width: 480,
        maxHeight: "90vh",
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
    },

    modalClose: {
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 10,
    },

    /* 📤 MENU UPLOAD */
    menuOverlay: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "flex-end",
        zIndex: 20,
    },

    menuContainer: {
        backgroundColor: "#f3f3f3",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 24,
    },

    menuRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 24,
        cursor: "pointer",
    },

    menuIcon: {
        width: 28,
        height: 28,
        resizeMode: "contain",
        marginRight: 16,
    },

    menuText: {
        fontSize: 16,
        fontWeight: "500",
    },

    menuSeparator: {
        height: 1,
        backgroundColor: "#ddd",
        marginLeft: 72,
    },
});
