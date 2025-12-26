import { StyleSheet } from "react-native";

export default StyleSheet.create({
    racine: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
    },

    zoneNavbar: {
        width: "15%",
    },

    zonePrincipale: {
        flex: 1,
    },

    bandeau: {
        height: 545,
    },

    imageBandeau: {
        flex: 1,
    },

    filtreBandeau: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    bandeauBasBlanc: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 180,
        backgroundColor: "#FFFFFF",
    },

    headerBoutiqueFlottant: {
        position: "absolute",
        top: 18,
        right: 40,
        zIndex: 50,
    },

    contenuBandeau: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 120,
        paddingHorizontal: 40,
        paddingTop: 190,
    },

    carteGauche: {
        width: 520,
        height: 350,
        borderRadius: 14,
        overflow: "hidden",
    },

    imagePrincipale: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    memeTaille: {
        width: 520,
        height: 350,
    },

    blocDroite: {
        width: 520,
        height: 350,
        flexDirection: "column",
        borderRadius: 14,
        overflow: "hidden",

        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: { width: 2, height: 2 },
        elevation: 10,
    },

    blocDroiteHaut: {
        flex: 1,
        padding: 22,
        backgroundColor: "rgba(0,0,0,0.45)",
        alignItems: "center",
        justifyContent: "center",
    },

    blocDroiteBas: {
        flex: 1,
        padding: 22,
        backgroundColor: "#FFFFFF",

        justifyContent: "center"
    },

    titreProduit: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 16,
    },

    ligneBadges: {
        flexDirection: "row",
        gap: 12,
        flexWrap: "wrap",
        justifyContent: "center",
    },

    badge: {
        backgroundColor: "#0E2A1E",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 999,
    },

    badgeTexte: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },

    prixCentre: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 28,
    },

    prixTexte: {
        fontSize: 40,
        fontWeight: "600",
        color: "#278674",
    },

    iconePoint: {
        width: 45,
        height: 45,
        resizeMode: "contain",
    },

    ligneActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    boutonSecondaire: {
        width: 52,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#04DA90",
        alignItems: "center",
        justifyContent: "center",
    },

    boutonSecondaireTexte: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },

    boutonPrincipal: {
        flex: 1,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#04DA90",
        alignItems: "center",
        justifyContent: "center",
    },

    boutonPrincipalTexte: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 16,
    },

    section: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 180,
        paddingHorizontal: 40,
        paddingVertical: 40,
        paddingLeft: 230,
        backgroundColor: "#FFFFFF",
    },

    sectionTitre: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 22,
    },

    description: {
        fontSize: 18,
        lineHeight: 30,
        color: "#333",
        maxWidth: 520,
    },

    label: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
    },

    retour: {
        fontSize: 18,
        color: "#04DA90",
        textDecorationLine: "underline",
    },

    ligneBas: {
        flexDirection: "row",
        gap: 120,
        alignItems: "flex-start",
    },

    colonneGauche: {
        width: 520,
    },

    colonneDroite: {
        width: 420,
        marginTop: 52,
    },

    infoLabel: {
        fontSize: 20,
        fontWeight: "500",
        color: "#1A1A1A",
    },

    infoLien: {
        fontSize: 20,
        color: "#1A1A1A",
        textDecorationLine: "underline",
    },

    ligneInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 24,
    },

    voirPlus: {
        fontWeight: "700",
    },

});