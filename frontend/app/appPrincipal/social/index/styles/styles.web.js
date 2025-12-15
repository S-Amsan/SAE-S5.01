import { StyleSheet } from "react-native";

export default StyleSheet.create({
    overlayWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        elevation: 10,
        gap : 20,
    },
    overlayContainer: {
        flexDirection: "row",
        zIndex: 10,
        elevation: 10,
    },
    overlayText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: 10,
    },
    overlaySousText: {
        color: "#FFFFFF",
        fontSize: 14,
        textAlign: "center",
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    cartesWrapper : {
        flex: 1,
        justifyContent: "space-around",
        height: "100%",
        margin : 50,
        marginTop : 100,
    },
    cartesContainer : {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom : 25,
        gap : 65,
        height: "33%",
    },
    classementContainer : {
        flex: 1,
        marginTop : 25,
    },
    carteContainer : {
        flex: 1,
        borderRadius : 10,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    },
    partieHautContainer : {
        margin : 20,
    },
    icon : {
        width: 29,
        height: 29
    },
    titreContainer : {
        flexDirection: "row",
        gap : 5,
    },
    titre : {
        fontSize : 25,
        fontWeight : "500",
    },
    tempsRestantText : {
        position : "absolute",
        right : 0,
        fontSize : 15,
        color : "#626262"
    },
    nomText : {
        marginLeft : 34,
        marginTop : 5,
        fontSize : 19,
    },
    etatText : {
        fontSize : 15,
        color : "#626262"
    },
    avancementContainer : {
        alignItems : "center",
        gap : 15,
        marginTop : "1vh",
    },
    avancementText : {
        fontSize : 27,
        fontWeight : "500",
    },
    barreDAvancementContainer : {
        backgroundColor: "#F8F8F8",
        height : 24,
        width : "90%",
        borderRadius : 24,
        flexDirection: "row",
        overflow: "hidden",
    },
    voirPlusContainer : {
        position : "absolute",
        alignSelf : "center",
        bottom: 10,
    },
    voirPlusText : {
        fontWeight : "500",
    },
    messageAlert : {
        fontSize : 25,
        fontWeight : "bold",
        textAlign : "center",
        color :"red"
    },
    alertContainer : {
        marginTop : 70
    },
    inscriptionBoutonContainer : {
        width: "50%",
        height : 50,
        borderRadius : 5,
        alignSelf : "center",
        marginTop : 25,
        justifyContent : "center"
    },
    inscriptionText : {
        fontWeight : "bold",
        fontSize : 20,
        textAlign : "center",
        color : "#ffffff",
    },
    podiumContainer : {
        width : "45%",
        alignSelf: "center",
        justifyContent : "center",
        flexDirection: "row",
        paddingBottom : 25,
        flex : 1,
    },
    placeContainer : {
        width : "33%",
        alignItems : "center",
        justifyContent : "flex-end",
        gap : 5,
    },
    placePicture : {
        borderRadius : 100,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
        marginBottom : 15,
    },
    place : {
        borderTopEndRadius : 15,
        borderTopStartRadius : 15,
        alignItems : "center",
        justifyContent : "center",
    },
    placeNumero : {
        fontWeight : "bold",
    },
    placeNomText : {
        fontSize : 20,
    },
    classementUserWrapper : {
        height : "auto",
        paddingBottom : 20,
    },
    classementUserContainer : {
        flexDirection : "row",
        alignItems : "center",
        height : "40%",
    },
    ligneSeparateur : {
        width : "100%",
        height : 1,
        backgroundColor: "#CCCCCC",
        marginVertical : 30,
    },
    topContainer : {
        marginHorizontal : 90,
    },
    topText : {
        fontSize : 16,
    },
    userContainer : {
        flexDirection : "row",
        alignItems : "center",
        gap : 20,
    },
    userPhoto : {
        width: 60,
        height: 60,
        borderRadius: 80
    },
    userNomText : {
        fontSize : 16,
    },
    tropheesContainer : {
        position : "absolute",
        right : 90,
        flexDirection : "row",
        alignItems : "center",
        gap : 10,
    },
    tropheesText : {
        fontSize : 20,
        fontWeight : "bold",
        color : "#E7A2F0"
    },
    tropheesIcon: {
        width: 40,
        height: 40
    },
    gras : {
        fontWeight : "bold",
    }

});
