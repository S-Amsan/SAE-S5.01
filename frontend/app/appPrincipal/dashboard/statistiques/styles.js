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
        justifyContent : "space-evenly",
        rowGap : 30,
        columnGap : 50,
        width : "90%",
        alignSelf : "center",
        marginBottom : 40,
    },
    carte : {
        width: "18%",
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
    graphsContainer : {
        flex: 1,
        flexDirection: "row",
        flexWrap : "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap : 50,
    },
    graphContainer : {
        width: "45%",
        borderRadius : 15,
        justifyContent : "flex-end",
        boxShadow : "0px 1px 4px rgba(0, 0, 0, 0.25)",
        padding : 20,
        gap : 40,
    },
    graphTitre : {
        fontSize : 15,
        fontWeight : "500",
        textAlign: "left",
    },
    graph : {
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
    }

});
