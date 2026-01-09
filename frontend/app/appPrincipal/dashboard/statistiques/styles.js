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
        justifyContent : "space-between",
        gap : 50,
        width : "90%",
        alignSelf : "center",
        marginBottom : 40,
    },
    carte : {
        width: "20%",
        borderRadius : 15,
        alignItems : "center",
        justifyContent : "center",
        paddingVertical : 15,
    },
    titreContainer : {
        flexDirection : "row",
        alignItems : "center",
        gap : 2,
    },
    carteImage : {
        width : 15,
        height : 15,
    },
    carteTitre : {
        fontSize : 11,
        fontWeight : "bold",
        color : "#FFFFFF"
    },
    carteDataText : {
        fontSize : 30,
        color : "#FFFFFF"
    },
});
