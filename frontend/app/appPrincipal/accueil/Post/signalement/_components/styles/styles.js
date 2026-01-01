import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingBottom: 40,
            backgroundColor: "#fff",
    },

    header: {
        flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: "#e5e5e5",
    },

    backText: {
        color: "#1DDE9A",
            fontSize: 16,
    },

    headerTitle: {
        fontSize: 18,
            fontWeight: "600",
    },

    titleBox: {
        padding: 24,
            alignItems: "center",
    },

    title: {
        fontSize: 22,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 10,
    },

    subtitle: {
        fontSize: 14,
            color: "#555",
            textAlign: "center",
            lineHeight: 20,
    },

    list: {
        marginTop: 10,
    },

    row: {
        flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderTopWidth: 1,
            borderColor: "#000",
    },

    rowText: {
        fontSize: 16,
    },

    chevron: {
        fontSize: 26,
            fontWeight: "300",
    },

    successContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
        backgroundColor: "#fff",
        padding:10,
    },

    checkCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 3,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },

    check: {
        fontSize: 48,
        fontWeight: "600",
    },

    successTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 12,
        textAlign: "center",
    },

    successSubtitle: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 40,
    },

    successButton: {
        width: "100%",
        backgroundColor: "#1DDE9A",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
    },

    successButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

});