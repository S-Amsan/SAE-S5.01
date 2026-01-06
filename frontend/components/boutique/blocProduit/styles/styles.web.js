import { StyleSheet } from "react-native";

export default StyleSheet.create({
    carte: {
        width: 280,
        backgroundColor: "#fff",
        marginRight: 94,
        overflow: "hidden",
        borderRadius : 8,

        borderWidth: 2,
        borderColor: "#EDEDED",
        marginBottom : 40,
    },

    contenu: {
        padding: 16,
    },

    image: {
        width: "100%",
        height: 170,
    },

    titre: {
        fontSize: 21,
        fontWeight: "500",
        marginBottom: 6,
    },

    description: {
        fontSize: 15,
        color: "#666",
        lineHeight: 20,
        marginBottom: 15,
    },

    ligneTitre: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },

    pointsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    points: {
        fontSize: 18,
        fontWeight: "500",
        color: "#97D7B8",
    },

    pointIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },

    bouton: {
        backgroundColor: "#07D999",
        paddingVertical: 11,
        borderRadius: 10,
        alignItems: "center",
    },

    texteBouton: {
        color: "white",
        fontWeight: "500",
        fontSize: 14,
    },
});