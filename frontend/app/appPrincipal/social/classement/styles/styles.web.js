import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    contenuContainer : {
        flex: 1,
        marginBottom: 50,
    },
    leaderboardContainer : {
        marginHorizontal: 25,
        marginTop : 15,
        marginBottom : 50,
        flexDirection: "column",
        justifyContent: "flex-end",
        flexShrink: 1,
        width: "35%",
        height: "100%",
        padding: 25,
        boxShadow: "0px 4px 6px rgba(0,0,0,0.15)",
        borderRadius: 15,
    },
    macarriereContainer : {
        flexGrow: 1,
        marginHorizontal: 25,
        marginTop: 15,
        marginBottom: 50,
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "65%",
        padding: 25,
        boxShadow: "0px 4px 6px rgba(0,0,0,0.15)",
        borderRadius: 15,
    },
    leaderboardTitre : {
        fontWeight: "bold",
        fontSize: 18,
        position: "absolute",
        top: "2.5%",
    },
    podiumContainer : {
        flexDirection: "row",
        width: "100%",
        flex: 1,
        justifyContent: "space-around",
        alignItems: "flex-end",
        marginBottom: 25,
    },
    placeContainer : {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 7,
    },
    placePicture : {
        boxShadow: "0px 1px 4px rgba(0,0,0,0.25)",
    },
    placeNomText : {
        color: "#313131",
        fontWeight: "bold",
        fontSize : 14,
    },
    placeTropheesContainer : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        gap : 5,
        width : "70%",
        paddingVertical: 2,
    },
    placeTropheesText : {
        color: "#E7A2F0",
        fontWeight: "bold",
        fontSize : 13,
    },
    podiumTropheeIcon : {
        width : 14,
        height : 14,
    },
    place: {
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    placeNumero : {
        color: "#ffffff",
        fontWeight : "bold",
        fontSize : 23,
    },
    classementTableauContainer : {
        backgroundColor: "#ffffff",
        borderTopEndRadius : 15,
        borderTopStartRadius : 15,
        height : "65%"
    },
    finText : {
        alignSelf : "center",
        textAlign: "center",
        color: "#8F8F8F",
        fontSize : 12,
        fontWeight : "bold",
        paddingTop : 30,
    },
    userTopContainer : {
        flexDirection : "row",
        alignItems: "center",
        backgroundColor : "#f4f4f4",
        borderRadius : 10,
    },
    userActuelTopContainer : {
        backgroundColor : "#ffffff",
        borderWidth : 2,
        borderColor : "#ACCEE9",
    },
    userInfoContainer : {
        flexDirection : "row",
        alignItems: "center",
        gap : 15,
    },
    userTopText : {
        width: "17%",
        textAlign: "center",
        paddingVertical : 25,
        fontSize : 20,
    },
    userTopPicture : {
        width : 50,
        height : 50,
        borderRadius : 50,
    },
    userTopName : {
        fontSize : 14,
        fontWeight : "bold",
    },
    userTropheesContainer : {
        position : "absolute",
        right : 30,
        flexDirection : "row",
        alignItems: "center",
        gap : 10,
    },
    userTropheesText : {
        fontSize : 18,
        fontWeight : "bold",
        color: "#E7A2F0",
    },
    TropheesIcon : {
        width : 22,
        height : 22,
    },
    separateurWrapper: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
    },
    demiLigneSeparateur: {
        height: 1,
        width: "90%",
        backgroundColor: "#BEBEBE",
    },
    userActuelCarte : {
        paddingVertical : 15,
    },
    titreCarriere : {
        fontSize : 40,
        fontWeight : "900",
        textAlign : "center",
        color : "#3b3b3b"
    },
    rankInfoContainer : {
        gap : 30,
    },
    rankContainer : {
        flexDirection : "row",
        alignItems: "center",
        justifyContent : "center",
        gap : "10%",
    },
    rankCoter : {
        width : 150,
        height : 150,
    },
    rankActuel : {
        width : 200,
        height : 200,
    },
    rankNomText : {
        fontSize : 35,
        fontWeight : "bold",
        textAlign : "center",
    },
    rankDescriptionText : {
        fontSize : 20,
        marginTop : 25,
        fontWeight : "600",
        textAlign : "center",
        color : "#3b3b3b"
    },
    tropheesInfoContainer : {
        gap : 10,
        marginTop : 10,
    },
    barreDeProgressionContainer : {
        flexDirection : "row",
        alignItems: "center",
        justifyContent : "center",
        gap : 10,
    },
    barreDAvancementContainer : {
        backgroundColor: "#e4e4e4",
        height : 13,
        width : "75%",
        borderRadius : 24,
        flexDirection: "row",
        overflow: "hidden",
    },
    tropheesPalier : {
        fontSize : 17,
        fontWeight : "bold",
        color : "#3b3b3b"
    },
    tropheesUser : {
        fontSize : 22,
        fontWeight : "bold",
        textAlign : "center",
        color : "#3b3b3b"
    },
    boutonsContainer : {
        flexDirection : "row",
        gap : "2.5%",
        margin : 50,
    },
    bulleInfoPrincipal : {
        padding : 20,
        borderRadius : 10,
        width : "60%",
        alignItems: "center",
        justifyContent : "center",
        flexDirection : "row",
        borderWidth : 2,
        borderColor : "#ACCEE9",
    },
    infoPrincipalImage : {
        width : 20,
        height : 20,
    },
    infoPrincipalText : {
        textAlign : "center",
        fontWeight : "900",
        fontSize : 17,
    },
    classementGlobalText : {
        color : "#05D993"
    },
    boutonSecondaire : {
        alignItems : "center",
        justifyContent : "center",
        flex: 1,
        boxShadow: "0px 1px 4px rgba(0,0,0,0.15)",
        borderRadius : 15,
        padding : 12,
    },
    boutonSecondaireText : {
        fontSize : 15,
        fontWeight : "600",
        textAlign : "center",
    },

});
