import { StyleSheet } from "react-native";

export default StyleSheet.create({
    ecran: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    defilement: {
        flex: 1,
    },

    banniere: {
        height: 220,
    },

    banniereImage: {
        flex: 1,
        justifyContent: "flex-end",
    },

    banniereFiltre: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    banniereFlou: {
        ...StyleSheet.absoluteFillObject,
    },

    calqueFlou: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
    },

    actionsHaut: {
        position: "absolute",
        top: 14,
        left: 14,
        right: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 50,
    },

    actionsDroite: {
        flexDirection: "row",
        gap: 10,
    },

    boutonRetour: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.95)",
        alignItems: "center",
        justifyContent: "center",
    },

    iconeRetour: {
        fontSize: 26,
        lineHeight: 26,
        marginTop: -2,
    },

    boutonIcone: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.85)",
        alignItems: "center",
        justifyContent: "center",
    },

    iconeAction: {
        width: 21,
        height: 20,
        resizeMode: "contain",
        tintColor: "#000",
    },

    carteAuCentre: {
        position: "absolute",
        bottom: -75,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 30,
    },

    imageCarte: {
        width: "70%",
        height: 185,
        borderRadius: 4,
        resizeMode: "cover",
    },

    contenu: {
        paddingTop: 85,
        paddingHorizontal: 22,
        paddingBottom: 16,
    },

    badgeType: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: "#F0F0F0",
        color: "#000000",
        fontSize: 13,
        fontWeight: "500",
        marginBottom: 12,
        marginTop: 8,
    },

    titreProduitCourt: {
        fontSize: 26,
        fontWeight: "700",
        color: "#000000",

    },

    titreProduitComplet: {
        fontSize: 16,
        color: "#000000",
        marginBottom: 14,
    },

    lignePrix: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 15,
    },

    prixLabel: {
        fontSize: 20,
        color: "#111",
    },

    prixValeur: {
        fontSize: 20,
        fontWeight: "600",
        color: "#97D7B8",
    },

    iconePoints: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },

    infosCourtes: {
        marginTop: 6,
        marginBottom: 14,
        marginLeft: 31,
    },

    infosCourtesLigne: {
        fontSize: 14,
        color: "#000000",
        marginBottom: 2,
    },

    infosCourtesSousTexte: {
        fontSize: 12,
        color: "#151515",
    },

    separateur: {
        height: 0.8,
        backgroundColor: "#C8C7C7",
        marginVertical: 14,
        width: "100%",
    },

    titreSection: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },

    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 6,
    },

    texteDescription: {
        fontSize: 13,
        lineHeight: 20,
        color: "#333",
    },

    barreAchat: {
        position: "absolute",
        left: 30,
        right: 0,
        bottom: 34,
        paddingHorizontal: 16,
        paddingBottom: 8,
        paddingTop: 10,
        backgroundColor: "transparent",
        borderTopWidth: 0,
    },

    boutonAchat: {
        height: 50,
        width: "90%",
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",

    },

    boutonAchatDisabled: {
        opacity: 0.45,
    },

    texteBoutonAchat: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 18,
        zIndex: 2,
    },

    fondGradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 999,
        zIndex: 1,
    },
});
