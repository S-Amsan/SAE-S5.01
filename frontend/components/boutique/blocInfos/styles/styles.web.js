import {StyleSheet} from "react-native";

export default StyleSheet.create({
    infos: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,

        marginTop: 40,
        marginLeft : 53,
        width: "93%",
        height: 234,

        paddingHorizontal: 28,
        paddingVertical: 20,
        marginBottom: 42,

        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 3,

    },

    contenuCentre: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 44,
        paddingRight: 10,
    },

    texteBloc: {
        flex: 1,
        height: 170,
        paddingRight: 18,
        paddingTop: 18,
        fontFamily: "Inter",
        position: "relative",
    },

    pagination: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },


    titre: {
        fontSize: 26,
        fontWeight: "400",
        marginBottom: 8,
    },

    lien: {
        fontSize: 15,
        color: "#04DA90",
        textDecorationLine: "underline",
    },

    imageWrapper: {
        width: 160,
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        width: 160,
        height: 160,
        borderRadius: 80,
    },

    fleche: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
    },

    flecheTexte: {
        fontSize: 70,
    },

    dot: {
        width: 86,
        height: 5,
        borderRadius: 3,
        marginHorizontal: 6,
    },

    dotInactif: {
        backgroundColor: "#EFEFEF",
    },
    dotActif: {
        backgroundColor: "#04DA90",
    },
});