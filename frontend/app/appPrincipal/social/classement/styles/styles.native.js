import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    podiumContainer : {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        gap : 20,
        marginHorizontal: 50,
        alignItems: "flex-end",
    },
    placeContainer : {
        flex: 1,
        flexGrow : 1,
        alignItems: "center",
        gap : 7,
    },
    placePicture : {
        height: 50,
        width: 50,
        borderRadius: 50,
        boxShadow: "0px 1px 4px rgba(0,0,0,0.25)",
    },
    placeNomText : {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize : 14,
    },
    placeTropheesContainer : {
        flexDirection : "row",
        backgroundColor : "#ffffff",
        borderRadius: 10.5,
        alignItems : "center",
        justifyContent : "center",
        gap : 5,
        width : "50%",
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
    place : {
        backgroundColor : "#00B378",
        borderTopEndRadius : 15,
        borderTopStartRadius : 15,
        alignItems : "center",
        justifyContent : "center",
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
    },
    userInfoContainer : {
        flexDirection : "row",
        alignItems: "center",
        gap : 15,
    },
    userTopText : {
        paddingHorizontal : 30,
        paddingVertical : 25,
        fontSize : 18,
        fontWeight : "bold",
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
        gap : 5,
    },
    userTropheesText : {
        fontSize : 15,
        fontWeight : "bold",
        color: "#E7A2F0",
    },
    TropheesIcon : {
        width : 20,
        height : 20,
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
        boxShadow: "0px 1px 8px rgba(0,0,0,0.5)",
        paddingVertical : 15,
    },

});
