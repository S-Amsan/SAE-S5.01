import {StyleSheet} from "react-native";


export default StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: 139,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "relative",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    containerTransparent: {
        backgroundColor: "rgba(0,0,0,0)",
        height: 139,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "relative",
    },
    titreContainer: {
        position: "absolute",
        bottom: 25,
    },
    titre: {
        fontSize: 16,
        textAlign: "center",
    },
    boutonRetourContainer: {
        position: "absolute",
        bottom: 25,
        left: 16,

        flexDirection: "row",
        alignItems: "center",

        height: 25,
    },
    boutonRetourText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#06DA95",
        marginLeft: 4,
    },
    boutonParametresContainer: {
        position: "absolute",
        bottom: 25,
        right: 21,

        flexDirection: "row",
        alignItems: "center",

        height: 25,
    },
    photoProfilContainer: {
        position: "absolute",
        bottom: 22,
        right: 15,
    },
    photoProfil: {
        width: 48,
        height: 48,
        borderRadius : 46,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.25)",
    },
    boutonNotificationContainer : {
        position: "absolute",
        bottom: 25,
        left: 27,
    },
    detailsContainer : {
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        gap : 10,
        flex: 1,
    },
    detailContainer : {
        alignItems : "center",
        justifyContent: "center",
        gap : 2,
        flexDirection: "row-reverse",
        backgroundColor: "#F6F6F6",
        paddingHorizontal : 8,
        paddingVertical : 5,
        borderRadius : 50,
        width : 78,
    },
    detailText : {
        fontWeight : "bold",
        fontSize : 15
    }
})
