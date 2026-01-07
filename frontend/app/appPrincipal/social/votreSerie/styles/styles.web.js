import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    flammeContainer : {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    flammeAmisContainer : {
        width: "50%",
    },
    flammesCompteurContainer : {
        marginTop : 20,
        paddingVertical : 30,
    },
    flammeImage : {
        height: 213,
        width: 135,
    },
    flammesText : {
        fontSize : 60,
        color: "#e15c5c",
        zIndex : 100,
    },
    flammesPerdueText : {
        position : "absolute",
        bottom     : -30,
        color : "#FE6F08",
        fontSize : 16,
        fontWeight : "800",
        textAlign : "center",
    },
    flammesPerdueTitre : {
        textAlign: "center",
        fontSize : 22,
        fontWeight : "bold",
        marginBottom : 10,

    },
    calendrierContainer : {
        flex : 1,
        alignItems: "center",
        marginTop : 20,
    },
    popupWrapper : {
        zIndex: 100,
        backgroundColor: "#FFFFFF",
        width: "20%",
        height: "47%",
        borderRadius: 15 ,
        overflow : "hidden",
    },
    popupContainer : {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: "center",
    },
    closeBouton : {
        position : "absolute",
        top : 15,
        right : 15,
    },
    titre : {
        fontSize : 20,
        fontWeight : "bold",
        marginTop : 50,
        textAlign: "center",
    },
    sousTitre : {
        fontSize : 15,
        fontWeight : "bold",
        color : "#4E4E4E",
        textAlign: "center",
        marginTop : 70,
        marginHorizontal : 10,
    },
    boutonsContainer : {
        gap : 20,
        position : "absolute",
        bottom : 50,
    },
    restaurerBouton : {
        backgroundColor : "#FD7007",
        color : "#ffffff",
        padding : 10,
        borderRadius : 26.5,
        fontWeight : "bold",
        boxShadow : "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    annulerBouton : {
        color : "#5D5D5D",
        textAlign: "center",
        fontWeight : "bold",
    },
});
