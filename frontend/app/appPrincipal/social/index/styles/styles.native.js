import { StyleSheet } from "react-native";

export default StyleSheet.create({
    overlayWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        gap : 20,
    },
    overlayContainer: {
        flexDirection: "row",
        zIndex: 10,
        gap : 5,
        alignItems: "center",
    },
    overlayText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    overlaySousText: {
        color: "#FFFFFF",
        fontSize: 12,
        textAlign: "center",
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    userCarteContainer : {
        flexDirection: "row",
        backgroundColor: "#05D991",
        alignItems: "center",
        marginHorizontal : 20,
        marginVertical: 25,
        padding : 15,
        borderRadius: 30,
    },
    userInfoContainer : {
        flexDirection: "row",
        alignItems: "center",
        gap : 10,
    },
    userCartePhoto : {
        width: 50,
        height: 50,
        borderRadius : 50,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    userNameContainer : {

    },
    userCarteNom : {
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    userCartePseudo : {
        fontWeight: "bold",
        fontSize: 12,
        color: "#FFFFFF",
    },
    carteIcon : {
        position: "absolute",
        right: 20,
        color: "#FFFFFF",
    },
    cartesWrapper : {
        flex: 1,
        justifyContent: "space-around",
        height: "100%",
        marginHorizontal : 30,
    },
    cartesContainer : {
        justifyContent: "space-around",
        gap : 20,
        marginBottom : 10,
    },
    classementContainer : {
        flex: 1,
        marginTop : 10,
    },
    carteContainer : {
        borderRadius : 10,
        paddingVertical : 5,
        minHeight : 120,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    },
    partieHautContainer : {
        marginHorizontal : 5,
    },
    icon : {
        width: 16,
        height: 16,
    },
    titreContainer : {
        flexDirection: "row",
        gap : 5,
        alignItems: "center",
    },
    titre : {
        fontSize : 16,
        fontWeight : "500",
    },
    tempsRestantText : {
        position : "absolute",
        right : 0,
        fontSize : 10,
        color : "#626262"
    },
    nomText : {
        marginLeft : 5,
        marginTop : 5,
        fontSize : 13,
    },
    etatText : {
        fontSize : 10,
        color : "#626262"
    },
    avancementContainer : {
        gap : 10,
        paddingVertical : 10,
    },
    avancementText : {
        fontSize : 14,
        marginLeft : 20,
        fontWeight : "500",
    },
    barreDAvancementContainer : {
        backgroundColor: "#F8F8F8",
        height : 10,
        width : "90%",
        borderRadius : 24,
        alignSelf : "center",
        flexDirection: "row",
        overflow: "hidden",
    },
    voirPlusContainer : {
    },
    messageAlert : {
        fontSize : 20,
        fontWeight : "bold",
        textAlign : "center",
        color :"red"
    },
    alertContainer : {
        margin : 30
    },
    inscriptionBoutonContainer : {
        width: "50%",
        height : 40,
        borderRadius : 5,
        alignSelf : "center",
        marginTop : 20,
        marginBottom : 10,
        justifyContent : "center"
    },
    inscriptionText : {
        fontWeight : "bold",
        fontSize : 15,
        textAlign : "center",
        color : "#ffffff",
    },
    podiumContainer : {
        width : "45%",
        alignSelf: "center",
        justifyContent : "center",
        flexDirection: "row",
        paddingTop : 30,
        flex : 1,
    },
    placeContainer : {
        width : "60%",
        height : "100%",
        alignItems : "center",
        justifyContent : "flex-end",
    },
    placePicture : {
        borderRadius : 100,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
        marginBottom : 15,
    },
    place : {
        borderTopEndRadius : 5,
        borderTopStartRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        marginBottom : 5,
    },
    placeNumero : {
        fontWeight : "bold",
    },
    placeNomText : {
        fontSize : 10,
    },
    classementUserWrapper : {
        paddingVertical : 10,
        justifyContent : "center",
    },
    classementUserContainer : {
        flexDirection : "row",
        alignItems : "center",
    },
    ligneSeparateur : {
        width : "100%",
        height : 1,
        backgroundColor: "#CCCCCC",
        marginVertical : 5,
    },
    topContainer : {
        marginHorizontal : 10,
    },
    topText : {
        fontSize : 12,
    },
    userContainer : {
        flexDirection : "row",
        gap : 10,
        alignItems : "center",
    },
    userPhoto : {
        width: 30,
        height: 30,
        borderRadius: 30
    },
    userNomText : {
        fontSize : 12,
    },
    tropheesContainer : {
        position : "absolute",
        right : 10,
        flexDirection : "row",
        alignItems : "center",
        gap : 10,
    },
    tropheesText : {
        fontSize : 12,
        fontWeight : "bold",
        color : "#E7A2F0"
    },
    tropheesIcon: {
        width: 20,
        height: 20
    },
    gras : {
        fontWeight : "bold",
    }

});
