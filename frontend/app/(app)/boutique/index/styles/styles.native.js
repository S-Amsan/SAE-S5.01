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
        paddingLeft: 16,
        paddingRight: 16,
        marginLeft: 0,
        marginRight: 0,
    },
});
