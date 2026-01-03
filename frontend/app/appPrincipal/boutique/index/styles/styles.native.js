import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F4F4",
        flexDirection: "column",
    },

    sidebar: {
        display: "none",
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 95,
    },
    page: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 16,
        marginTop: 10,
        marginLeft: 0,
        marginRight: 0,
    },
});
