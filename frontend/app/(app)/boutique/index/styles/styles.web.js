import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F4F4F4",
    },
    sidebar: {
        width: "15%",
    },
    content: {
        flex: 1,
    },
    page: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginLeft: 40,
        marginRight: 40,
        padding: 16,
    },
});
