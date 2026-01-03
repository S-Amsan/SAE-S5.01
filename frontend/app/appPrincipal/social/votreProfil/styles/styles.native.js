import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    banner: {
        position: "absolute",
        height: 125,
        width: "100%",
    },
    userWrapper: {
        top : 90,
        left : 25,
        gap : 10,
    },
    userContainer: {
        height : 100,
        width : 100,
    },
    userPicture: {
        height : 100,
        width : 100,
        borderRadius : 100,
        boxShadow : "1px 2px 5px rgba(0,0,0,0.2)",
    },
    userFlammeContainer: {
        position : "absolute",
        bottom: 5,
        right : -15,
        backgroundColor : "#FFFFFF",
        flexDirection : "row",
        paddingVertical : 2,
        paddingHorizontal : 5,
        boxShadow : "1px 2px 4px rgba(0,0,0,0.2)",
        borderRadius : 50,
        alignItems : "center",
        gap : 2,
    },
    userFlammeText: {
        color: "#FF5E2C",
        fontSize : 14,
        fontWeight : "bold",
    },
    flammeIcon: {
        height : 16,
        width : 16,
    },
    userPseudo: {
        fontSize : 20,
        fontWeight : "bold",
    },
    userNom: {
        fontSize : 13,
    },
    userAmisContainer: {
        position : "absolute",
        top : 140,
        right : 25,
        alignItems : "center"
    },
    userAmisNb: {
        fontWeight : "bold",
    },
    userAmisText: {
    },
    boutonsContainer: {
        position : "absolute",
        top : 200,
        right : 25,
        alignItems : "center",
        flexDirection : "row",
        gap : 15,
    },
    boutonAmisContainer: {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        borderWidth : 1.5,
        borderColor : "#04D992",
        borderRadius : 50,
        paddingHorizontal : 7,
        paddingVertical : 3,
    },
    boutonAmisText: {
        color : "#04D992",
    },
    boutonShareContainer: {
        borderWidth : 1.5,
        borderColor : "#04D992",
        borderRadius : 50,
        padding : 3,
        alignItems : "center",
        justifyContent : "center",
    },
    cartesContainer : {
        marginTop : 125,
        width: "85%",
        alignSelf : "center",
        gap : 20,
        flexWrap : "wrap",
        flexDirection: "row",
        alignItems : "center",
        justifyContent : "space-between",
    },
    carte : {
        flexDirection : "row",
        alignItems : "center",
        gap : 10,
        width : "47%",
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
        width: "85%",
        flexDirection : "row",
        alignItems : "center",
        gap : 15,
        boxShadow : "0px 1px 4px rgba(0,0,0,0.25)",
        paddingHorizontal : 25,
        paddingVertical : 15,
        alignSelf : "center",
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
        marginHorizontal: 25,
    },
    titreInfo : {
        color : "#8e8e8e"
    },
    realisationsSection : {
        marginTop : 30,
    },
    realisationsContainer: {
        marginTop: 20,
        paddingHorizontal: 30,
        gap: 10,
    },
    realisationsList: {
        width: "100%",
    },
    realisationIcon: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    },
    succesNonDebloque : {
        opacity: 0.5,
        tintColor: "#000000",
        position: "absolute"
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
        marginTop : 30,
    },
    statistiquesContainer : {
        marginTop : 20,
        flexDirection : "row",
        alignItems: "center",
        justifyContent: "center",
        gap : 20,
    },
    statistiqueContainer : {
        width : 100,
        height : 100,
        borderRadius : 100,
        borderWidth : 7,
        alignItems: "center",
        justifyContent: "center",
        padding : 15,
    },
    statistiqueInfo : {
        fontSize : 17,
        fontWeight : "bold",
    },
    statistiqueTitre : {
        textAlign : "center",
        color : "#4c4c4c",
        fontWeight : "500",
        fontSize : 12,
    },
    activiteSection : {
        marginTop : 30,
    },
    activitesContainer : {
        width: "80%",
        gap : 15,
        marginTop : 20,
        alignItems: "flex-start",
        alignSelf : "center",
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
