import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        paddingBottom: 24,
    },

    vide: {
        fontSize: 14,
        color: "#666",
        marginTop: 12,
    },

    zoneGroupes: {
        gap: 18,
    },

    groupe: {
        gap: 10,
    },

    titreGroupe: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
    },

    grille: {
        flexDirection: "column",
        gap: 12,
    },

    carteAchat: {
        width: "100%",
        height: 92,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#EDEDED",
        overflow: "hidden",
    },

    imageAchat: {
        width: 120,
        height: "100%",
        resizeMode: "cover",
    },

    contenuAchat: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 6,
    },

    titreAchat: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111",
    },

    sousTitreAchat: {
        fontSize: 12,
        color: "#666",
        fontWeight: "600",
    },

    ligneInfosAchat: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 2,
    },

    pointsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    points: {
        fontSize: 13,
        fontWeight: "700",
        color: "#97D7B8",
    },

    pointIcon: {
        width: 14,
        height: 14,
        resizeMode: "contain",
    },

    boutonVoirCode: {
        marginLeft: "auto",
        height: 30,
        paddingHorizontal: 12,
        backgroundColor: "#07D999",
        alignItems: "center",
        justifyContent: "center",
    },

    texteVoirCode: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 12,
    },

    modalFond: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },

    modalCarte: {
        width: "100%",
        maxWidth: 350,
        backgroundColor: "#FFFFFF",
        borderRadius: 21,
        padding: 22,
        alignItems: "center",
        position: "relative",
    },

    modalFermer: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
        zIndex: 99,
    },

    modalFermerTexte: {
        fontSize: 22,
        fontWeight: "900",
        color: "#111",
    },

    modalImage: {
        width: 260,
        height: 166,
        resizeMode: "cover",
        marginBottom: 16,
        marginTop: 39,
    },

    modalTitre: {
        fontSize: 17,
        fontWeight: "900",
        color: "#111",
        textAlign: "center",
    },

    modalSousTitre: {
        fontSize: 15,
        fontWeight: "600",
        color: "#666",
        marginTop: 8,
        marginBottom: 36,
    },

    blocCode: {
        width: "100%",
        height: 48,
        borderRadius: 12,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },

    codeTexte: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 15,
        letterSpacing: 1,
    },

    modalAide: {
        color: "#4B84FF",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 14,
    },

    headerMobileZone: {
        position: "relative",
    },


});
