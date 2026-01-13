import { StyleSheet } from "react-native";

export default StyleSheet.create({
    popupEventContainer : {
        backgroundColor: "#FFFFFF",
        width: "20%",
        height: "47%",
        borderRadius: 15 ,
        zIndex: 200,
        justifyContent: "space-around",
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    contenuContainer : {
        flex: 1,
        marginBottom: 50,
    },
    enCoursContainer: {
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

    statistiqueContainer : {
        marginHorizontal: 25,
        marginTop : 15,
        marginBottom : 50,
        flexDirection: "column",
        justifyContent: "flex-start",
        gap : 50,
        flexShrink: 1,
        width: "35%",
        height: "100%",
        padding: 25,
        boxShadow: "0px 4px 6px rgba(0,0,0,0.15)",
        borderRadius: 15,
    },
    historiqueContainer : {
        flex: 1,
    },
    partieInfoContainer: {
    },
    nomEventContainer: {
        alignItems : "center",
        marginBottom: 15,
    },
    nomEventText: {
        color: "#FFFFFF",
        backgroundColor: "#05D991",
        borderRadius : 13,
        padding : 5,
        paddingHorizontal : 10,
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-start",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    },
    InfoEventWrapper: {},
    InfoEventContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap : 5
    },
    InfoEventImage: {
        width: 17,
        height: 17,
    },
    InfoEventNom: {
        fontSize: 18,
        fontWeight: "light",
    },
    contenuMilieuContainer:{
        gap : 30,
    },
    carteInfoContainer: {
        borderRadius : 15,
        borderColor : "#AAAAAA",
        borderWidth : 1,
        width: "100%",
        alignSelf : "center",
        alignItems : "center",
        padding : 50,
        gap : 20,
    },
    infoPointsText : {
        fontSize: 45,
        fontWeight: "bold",
        color: "#4D4D4D",
    },
    infoSousText : {
        fontSize: 16,
        fontWeight: "Medium",
        color: "#4c4c4c",
    },
    coutText : {
        fontSize: 30,
        color: "#4D4D4D",
    },
    barreDAvancementContainer : {
        backgroundColor: "#F8F8F8",
        height : 15,
        width : "90%",
        borderRadius : 24,
        alignSelf : "center",
        flexDirection: "row",
        overflow: "hidden",
    },
    boutonsContainer: {
        alignItems: "center",
        flexDirection : "row",
        flex : 1,
        justifyContent : "space-between",
        gap : "2.5%",
    },
    boutonPrincipaleContainer: {
        padding : 17,
        borderRadius : 17,
        width : "55%"
    },
    boutonDesinscrire : {
        backgroundColor: "#FF5858"
    },
    boutonSinscrire : {
        backgroundColor: "#008DC9"
    },
    boutonPrincipaleText:{
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold",
    },
    boutonSecondaireContainer: {
        flexShrink: 1,
        flexGrow : 1,
        padding : 20,
        boxShadow: "0px 1px 4px rgba(0,0,0,0.15)",
        borderRadius : 17,
    },
    boutonsSecondaireText :{
        textAlign: "center",
        fontWeight: "bold",
    },
    infosCarteContainer: {
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingTop : 50,
        paddingBottom : 30,
        paddingHorizontal : 30,
        borderRadius : 9,
    },
    infosContainer: {
        gap : 5,
    },
    infoTitre : {
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight : "bold",
        fontSize : 16,
        position : "absolute",
        top : 10,
        alignSelf : "center",
    },
    infoText : {
        color: "#FFFFFF",
    },
    messageAlert : {
        fontSize : 17,
        fontWeight : "bold",
        textAlign : "center",
        color :"#FF5858"
    },
    messageInformatif : {
        fontSize : 17,
        fontWeight : "bold",
        textAlign : "center",
        color : "#05D991",
    },
    alertContainer : {
        margin : 30
    },
    titre : {
        fontSize : 20,
        fontWeight : "bold",
        marginBottom : 40,
    },
    scrollView : {
        flex : 1,
    },
    carteEventContainer : {
        padding : 5,
        gap : 30,
    },
    carteEvent : {
        boxShadow: "0px 1px 4px rgba(0,0,0,0.15)",
        flexDirection : "row",
        alignItems: "center",
        paddingHorizontal : 15,
        paddingVertical : 10,
        gap : 15,
        borderRadius : 5,
    },
    numText : {
        fontWeight : "bold",
        fontSize : 9,
    },
    carteContenu : {
        flex : 1,
        position : "relative",
        gap : 10,
    },
    infoEvent : {
        flexDirection : "row",
        gap : 7,
        alignItems : "center",
        justifyContent : "space-between",
    },
    infoTemps : {
        position : "absolute",
        top : 0,
        right : 0,
        color : "#AEAEAE",
        fontSize : 9,
        fontWeight : "bold",
    },
    infoNom : {
        fontSize : 14,
        fontWeight : "bold",
    },
    infoEtat : {
        fontSize : 11,
        backgroundColor: "#EBEBEB",
        paddingVertical : 3,
        paddingHorizontal : 12,
        borderRadius : 4,
        fontWeight : "bold",
    },
    progressionText : {
        fontSize : 12,
        fontWeight : "bold",
    },
    finText : {
        alignSelf : "center",
        textAlign: "center",
        color: "#8F8F8F",
        fontSize : 12,
        fontWeight : "bold",
        paddingTop : 30,
    },
    victoire : {
        color : "#ffffff",
        backgroundColor : "#00C98D",
    },
    defaite : {
        color : "#ffffff",
        backgroundColor : "#FF5858",
    },
    closeBouton : {
        position : "absolute",
        top : 20,
        right : 20,
    },
    titreHautContainer : {
        alignItems : "center",
        padding : 20,
    },
    popupTitre : {
        fontSize : 20,
        fontWeight : "bold",
    },
    popupSousTitre : {
        fontSize : 13,
        fontWeight : "bold",
        color : "#666666",
    },
    popupIcon : {
        height : 11,
        width : 11,
    },
    eventInfosContainer : {
        backgroundColor : "#F5F5F5",
        borderWidth : 1,
        borderColor : "#AAAAAA",
        borderRadius : 15,
        marginHorizontal : 20,
        marginTop : 0,
        marginBottom : 10,
        padding: 10,
    },
    eventInfoContainer : {
        flexDirection : "row",
        alignItems: "center",
        gap : 5,
    },
    infoPopupText : {
        fontSize : 12,
    },
    eventProgression : {
        textAlign: "center",
        borderWidth : 1,
        borderColor : "#AAAAAA",
        borderRadius : 15,
        padding: 15,
        marginHorizontal : 20,
        marginBottom : 15,
        fontSize : 18,
        fontWeight : "bold",
    },
    eventResultat : {
        marginHorizontal : 20,
        marginBottom : 15,
    },
    eventResultatTitre : {
        fontSize : 16,
        fontWeight : "bold",
    },
    eventResultatSousTitre : {
        fontSize : 15,
        fontWeight : "bold",
    },
    eventResultatInfo : {
        fontSize : 13,
        color: "#00C98D",
    },
    gras : {
        fontWeight : "bold",
    },
    eventInfoSuppWrapper : {
        backgroundColor : "#F5F5F5",
        borderWidth : 1,
        borderColor : "#AAAAAA",
        borderRadius : 15,
        marginHorizontal : 20,
        marginTop : 0,
        marginBottom : 10,
        padding: 10,
    },
    eventInfoSuppTitre : {
        position : "absolute",
        top : 0,
        alignSelf : "center",
        fontSize : 12,
        fontWeight : "bold",
        marginVertical : 10,
    },
    eventInfoSuppContainer : {
        marginTop : 30,
        marginBottom : 10,
        gap : 5,
    },
    eventInfoSuppText : {
        marginLeft : 10,
        fontSize : 10,
    },
    rougeText : {
        color: "#FF5858"
    },
});
