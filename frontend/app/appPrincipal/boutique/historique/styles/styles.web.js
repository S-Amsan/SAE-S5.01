import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page: {
        paddingHorizontal: 40,
        paddingVertical: 24,
    },

    vide: {
        fontSize: 16,
        color: "#666",
        marginTop: 12,
    },

    zoneGroupes: {
        gap: 26,
    },

    groupe: {
        gap: 14,
    },

    titreGroupe: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    grille: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 22,
    },

    carteAchat: {
        width: 520,
        height: 130,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#EDEDED",
        overflow: "hidden",
    },

    imageAchat: {
        width: 180,
        height: "100%",
        resizeMode: "cover",
    },

    contenuAchat: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },

    titreAchat: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
    },

    sousTitreAchat: {
        fontSize: 13,
        color: "#666",
        fontWeight: "600",
    },

    ligneInfosAchat: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginTop: 6,
    },

    pointsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    points: {
        fontSize: 16,
        fontWeight: "700",
        color: "#97D7B8",
    },

    pointIcon: {
        width: 18,
        height: 18,
        resizeMode: "contain",
    },

    boutonVoirCode: {
        marginLeft: "auto",
        height: 34,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: "#07D999",
        alignItems: "center",
        justifyContent: "center",
    },

    texteVoirCode: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 14,
    },

    modalFond: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
    },

    modalCarte: {
        width: 500,
        backgroundColor: "#FFFFFF",
        borderRadius: 21,
        padding: 26,
        alignItems: "center",
        position: "relative",
    },

    modalFermer: {
        position: "absolute",
        top: 14,
        right: 14,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    modalFermerTexte: {
        fontSize: 22,
        fontWeight: "900",
        color: "#111",
    },

    modalImage: {
        width: 383,
        height: 246,
        resizeMode: "cover",
        marginBottom: 18,
        marginTop: 28,
    },

    modalTitre: {
        fontSize: 22,
        fontWeight: "900",
        color: "#111",
        textAlign: "center",
    },

    modalSousTitre: {
        fontSize: 18,
        fontWeight: "600",
        color: "#666",
        marginTop: 8,
        marginBottom: 38,
    },

    blocCode: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
    },

    codeTexte: {
        color: "#FFFFFF",
        fontWeight: "500",
        fontSize: 17,
        letterSpacing: 1,
    },

    modalAide: {
        color: "#4B84FF",
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
    },
})