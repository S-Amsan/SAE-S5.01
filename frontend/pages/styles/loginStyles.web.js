import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    gradient: {
        flex: 1
    },

    container: {
        flex: 1,
        alignItems: "center",
        minHeight: height
    },

    logo: {
        width: 240,
        height: 240,
        marginBottom: 10
    },

    FormContainer: {
        padding: 40,
        borderRadius: 45,
        backgroundColor: "white",
        width: width * 0.25,
        minHeight: 600,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#00DB83",
        marginBottom: 8,
        textAlign: "center"
    },

    subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginBottom: 40, fontStyle: "italic" },
    inputGroup: { width: "100%", marginBottom: 25 },
    label: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 8, marginLeft: 5 },
    textInput: { backgroundColor: "#F8F9FA", borderWidth: 1, borderColor: "#E9ECEF", borderRadius: 15, padding: 18, fontSize: 16, color: "#333", width: "100%" },
    passwordContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8F9FA", borderWidth: 1, borderColor: "#E9ECEF", borderRadius: 15, overflow: "hidden" },
    passwordInput: { flex: 1, padding: 18, fontSize: 16, color: "#333" },
    eyeIcon: { padding: 18 },
    forgotPasswordContainer: { alignItems: "flex-end", marginBottom: 30 },
    forgotPasswordText: { color: "#00DB83", fontSize: 14, fontWeight: "600", textDecorationLine: "underline" },
    primaryButton: { borderRadius: 25, width: "100%", marginBottom: 20, overflow: "hidden" },
    gradientButton: { padding: 18, alignItems: "center", borderRadius: 25 },
    primaryButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
    separator: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
    separatorLine: { flex: 1, height: 1, backgroundColor: "#E9ECEF" },
    separatorText: { color: "#666", fontSize: 14, fontWeight: "600", marginHorizontal: 15 },
    secondaryButton: { borderWidth: 2, borderColor: "#00DB83", borderRadius: 25, padding: 16, alignItems: "center", marginBottom: 25 },
    secondaryButtonText: { color: "#00DB83", fontSize: 16, fontWeight: "bold" },
    policy: { color: "#1D3937", fontSize: 12, textAlign: "center", fontStyle: "italic", lineHeight: 16 },
});
