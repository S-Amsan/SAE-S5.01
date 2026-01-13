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
        height: 535,
        position: "relative",
        overflow: "hidden",
    },

    bandeauImageLayer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },

    imageBandeau: {
        flex: 1,
        position: "relative",
        overflow: "hidden",
        opacity : 0.92
    },

    filtreBandeau: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.55)",
    },

    bandeauBasBlanc: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 180,
        backgroundColor: "#FFFFFF",
    },

    zoneFlou: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 180,
    },

    bandeauOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5,
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
        paddingTop: 180,
    },

    carteGauche: {
        width: 611,
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
        width: 611,
        height: 350,
    },

    blocDroite: {
        width: 611,
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
        alignItems: "center",
        justifyContent: "center",

        position: "relative",
        overflow: "hidden",
    },

    blurFond: {
        ...StyleSheet.absoluteFillObject,
    },

    overlayFond: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    blocDroiteHautContenu: {
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
    },

    blocDroiteBas: {
        flex: 1,
        padding: 22,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
    },

    titreProduit: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 16,
    },

    badgesBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 999,
        backgroundColor: "rgba(0,0,0,0.41)",
        gap: 18,
    },

    badgeItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    badgeIcon: {
        fontSize: 21,
    },

    badgeText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "400",
    },

    badgeDivider: {
        width: 2,
        height: 28,
        backgroundColor: "rgba(255,255,255,0.65)",
        borderRadius: 2,
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
        fontWeight: "500",
        color: "#429585",
    },

    iconePoint: {
        width: 48,
        height: 50,
        resizeMode: "contain",
    },

    ligneActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    boutonSecondaire: {
        width: 85,
        height: 54,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
    },

    boutonSecondaireIcon: {
        width: 30,
        height: 30,
        zIndex: 2,
    },

    boutonPrincipal: {
        flex: 1,
        height: 54,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
    },

    boutonPrincipalTexte: {
        color: "#FFFFFF",
        fontWeight: "500",
        fontSize: 24,
        zIndex: 2,
    },

    boutonGradient: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 10,
        zIndex: 1,
    },

    section: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 280,
        paddingHorizontal: 40,
        paddingVertical: 40,
        paddingLeft: 140,
        backgroundColor: "#FFFFFF",
    },

    sectionTitre: {
        fontSize: 30,
        fontWeight: "400",
        marginBottom: 22,
    },

    description: {
        fontSize: 18,
        lineHeight: 30,
        color: "#333",
        maxWidth: 520,
    },

    label: {
        fontSize: 23,
        marginBottom: 8,
    },

    retour: {
        fontSize: 18,
        color: "#04DA90",
        textDecorationLine: "underline",
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
