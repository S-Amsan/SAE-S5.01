import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    contenuPrincipal : {
        flex : 1,
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: "5%",
    },
    contenuSecondaire : {
        width: "25%",
        height: "100%",
    },
    banner: {
        position: "absolute",
        height: 175,
        width: "100%",
    },
    userWrapper: {
        flexDirection :  "row",
        alignItems: "center",
        top : 130,
        gap : 30,
    },
    userContainer: {
        height : 150,
        width : 150,
    },
    userPicture: {
        height : 150,
        width : 150,
        borderRadius : 150,
        boxShadow : "1px 2px 5px rgba(0,0,0,0.2)",
    },
    userFlammeContainer: {
        position : "absolute",
        bottom: 5,
        right : -5,
        backgroundColor : "#FFFFFF",
        flexDirection : "row",
        paddingVertical : 4,
        paddingHorizontal : 10,
        boxShadow : "1px 2px 4px rgba(0,0,0,0.2)",
        borderRadius : 50,
        alignItems : "center",
        gap : 2,
    },
    userFlammeText: {
        color: "#FF5E2C",
        fontSize : 17,
        fontWeight : "bold",
    },
    flammeIcon: {
        height : 16,
        width : 16,
    },
    userPseudo: {
        marginTop : 20,
        fontSize : 24,
        fontWeight : "bold",
    },
    userNom: {
        fontSize : 13,
        color : "#858585",
    },
    userAmisContainer: {
        alignItems : "center",
        flexDirection : "row",
        gap : 5,
        marginTop : 10,
    },
    boutonsContainer: {
        position : "absolute",
        top : 200,
        right : 0,
        alignItems : "center",
        flexDirection : "row",
        gap : 15,
    },
    boutonAmisContainer: {
        flexDirection : "row",
        alignItems : "center",
        borderWidth : 1.5,
        gap : 7.5,
        borderColor : "#04D992",
        borderRadius : 100,
        paddingHorizontal : 15,
        paddingVertical : 5,
    },
    boutonAmisText: {
        color : "#04D992",
    },
    boutonShareContainer: {
        borderWidth : 1.5,
        borderColor : "#04D992",
        borderRadius : 20,
        padding : 5,
        alignItems : "center",
        justifyContent : "center",
    },
    cartesContainer : {
        gap : 20,
        flexWrap : "wrap",
        flexDirection: "row",
        alignItems : "center",
        justifyContent : "space-between",
        width : "60%",
    },
    carte : {
        flexDirection : "row",
        alignItems : "center",
        gap : 10,
        flex : 1,
        paddingHorizontal : 15,
        paddingVertical : 10,
        borderRadius : 7,
        borderWidth : 1,
        borderColor : "#bebebe",
    },
    carteIcon : {
        height : 23,
        width : 23,
    },
    rankIcon : {
        height : 33,
    },
    InfoContainer : {},
    InfoText : {
        fontSize : 15,
        fontWeight : "bold",
    },
    InfoTitre : {
        fontSize : 11,
    },
    mesRecompencesContainer : {
        marginTop : 30,
        width: "40%",
        flexDirection : "row",
        alignItems : "center",
        gap : 15,
        boxShadow : "0px 1px 4px rgba(0,0,0,0.25)",
        paddingHorizontal : 25,
        paddingVertical : 15,
        borderRadius : 10,
    },
    cadeauIcon : {
        height : 32,
        width : 32,
    },
    cadeauText : {
        color : "#FFC107",
        fontSize : 20,
        fontWeight : "bold",
    },
    cadeauNbText : {
        fontSize : 12,
    },
    cadeauChevron : {
        position : "absolute",
        right : 30,
        color : "#FFC107",
    },
    titre : {
        fontSize : 17,
        fontWeight : "500",
        width: "85%",
    },
    titreInfo : {
        color : "#8e8e8e"
    },
    realisationsWrapper : {
        gap : 30,
    },
    realisationsWebContainer : {
        marginTop: 20,
        flexDirection : "row",
        flexWrap : "wrap",
        gap: 10,
    },
    realisationsContainer: {
        marginTop: 20,
        paddingHorizontal: 30,
        gap: 10,
        flex : 1,
    },
    realisationsList: {
        flexWrap : "wrap"
    },
    realisationIcon: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    },
    message : {
        textAlign : "center",
        marginTop : 30,
        fontSize : 14,
        fontWeight : "bold",
        color : "#8e8e8e",
        marginHorizontal : 30,
    },
    statistiqueSection : {
        flex : 1,
    },
    statistiquesContainer : {
        marginTop : 30,
        flexDirection : "row",
        alignItems: "center",
        gap : 20,
    },
    statistiqueContainer : {
        width : 125,
        height : 125,
        borderRadius : 125,
        borderWidth : 7,
        alignItems: "center",
        justifyContent: "center",
        padding : 15,
    },
    statistiqueInfo : {
        fontSize : 20,
        fontWeight : "bold",
    },
    statistiqueTitre : {
        textAlign : "center",
        color : "#4c4c4c",
        fontWeight : "500",
        fontSize : 17,
    },
    activiteSection : {
        flex : 1,
    },
    activitesContainer : {
        width: "80%",
        gap : 15,
        marginTop : 30,
        marginLeft: 20,
        alignItems: "flex-start",
    },
    activiteContainer : {
        flexDirection : "row",
        alignItems : "center",
        gap : 7,
    },
    activiteImage : {
        height : 23,
        width : 23,
    },
    activiteText : {
        fontSize : 15,
        fontWeight : "400",
    },
});
