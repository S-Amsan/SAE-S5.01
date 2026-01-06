import { StyleSheet } from "react-native";

export default StyleSheet.create({

    carte: {
        width: 150,
        backgroundColor: "#fff",
        marginRight: 12,
        overflow: "hidden",
        borderRadius: 8,

        borderWidth: 2,
        borderColor: "#EDEDED",
        marginBottom: 18,
    },

    contenu: {
        padding: 10,
        justifyContent: "space-between",
    },

    image: {
        width: "100%",
        height: 90,
    },

    titre: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 4,
    },

    description: {
        fontSize: 11,
        color: "#666",
        lineHeight: 14,
        marginBottom: 8,
    },

    ligneTitre: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },

    prixWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },

    points: {
        fontSize: 12,
        fontWeight: "500",
        color: "#97D7B8",
    },

    pointIcon: {
        width: 14,
        height: 14,
        resizeMode: "contain",
    },

    bouton: {
        backgroundColor: "#07D999",
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: "center",
    },

    texteBouton: {
        color: "white",
        fontWeight: "500",
        fontSize: 12,
    },
});
