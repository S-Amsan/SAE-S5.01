import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    contenuContainer : {
        flex: 1,
        padding : 50,
    },
    cartesContainer : {
        flexDirection : "row",
        flexWrap : "wrap",
        gap : 50,
        alignItems : "center",
        justifyContent : "space-evenly",
    },
});
