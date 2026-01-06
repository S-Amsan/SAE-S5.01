import { StyleSheet } from "react-native";

export default StyleSheet.create({
    infos: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,

        width: "97%",
        alignSelf: "center",
        height: 200,

        marginTop: 18,
        marginBottom: 22,

        paddingHorizontal: 20,
        paddingVertical: 18,

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },

    contenuCentre: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    texteBloc: {
        flex: 1,
        height: "100%",
        paddingRight: 14,
        justifyContent: "flex-start",
        paddingBottom: 68,
        position: "relative",

    },

    texteTop: {
        alignSelf: "flex-start",
        paddingTop: 2,
    },

    titre: {
        fontSize: 19,
        fontWeight: "500",
        marginBottom: 3,
        opacity : 0.68,
    },

    lien: {
        fontSize: 13,
        color: "#04DA90",
        textDecorationLine: "underline",
        marginTop: 0,
    },

    imageWrapper: {
        width: 130,
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        width: 125,
        height: 125,
        borderRadius: 85,
        marginTop : -4,
    },

    pagination: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    dot: {
        width: 18,
        height: 3.5,
        borderRadius: 3,
        marginHorizontal: 2,
    },

    dotInactif: {
        backgroundColor: "#EFEFEF",
    },

    dotActif: {
        backgroundColor: "#04DA90",
    },

    fleche: {
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 8,
    },

    flecheTexte: {
        fontSize: 38,
        lineHeight: 38,
    },
});
