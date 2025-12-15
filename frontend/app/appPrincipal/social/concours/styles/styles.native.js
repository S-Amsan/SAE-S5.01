import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "row",
    },
    contenuContainer : {
        marginHorizontal: 25,
        marginTop : 5,
    },
    partieInfoContainer: {
    },
    nomEventContainer: {
        marginBottom: 10,
    },
    nomEventText: {
        color: "#FFFFFF",
        backgroundColor: "#05D991",
        borderRadius : 15,
        padding : 5,
        paddingHorizontal : 10,
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-start",
    },
    InfoEventWrapper: {},
    InfoEventContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap : 5
    },
    InfoEventImage: {
        width: 15,
        height: 15,
    },
    InfoEventNom: {
        fontSize: 16,
        fontWeight: "light",
    },
    carteInfoContainer: {},
    boutonsContainer: {},
    infosContainer: {},

});
