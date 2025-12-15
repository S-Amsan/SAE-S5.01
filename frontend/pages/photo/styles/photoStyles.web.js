import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
    gradient: {
        flex: 1,
        paddingHorizontal: 20,
    },

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 30,
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
        marginBottom: 40,
    },

    label: {
        width: "100%",
        textAlign: "left",
        color: "#fff",
        fontSize: 18,
        fontStyle: "italic",
        marginBottom: 10,
    },

    photoWrapper: {
        width: "100%",
        alignItems: "center",
        marginBottom: 40,
    },

    photoCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    photoPreview: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },


    cameraIcon: {
        width: 50,
        height: 45,
        tintColor: "#7A7A7A",
    },

    input: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 40,
        fontSize: 16,
        ...Platform.select({
            web: {
                outlineStyle: "none",
            },
        }),
    },

    submitButton: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 20,
    },

    submitText: {
        color: "#0BB89E",
        fontSize: 18,
        fontWeight: "600",
    },

    skipText: {
        color: "#fff",
        fontSize: 16,
        marginTop: 10,
    },
});
