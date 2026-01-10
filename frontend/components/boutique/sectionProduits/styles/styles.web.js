import { StyleSheet } from "react-native";

export default StyleSheet.create({

    section: {
        marginLeft: 36
    },

    lien: {
        color: "#000",
        fontFamily: "Inter",
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 18,
    },

    scroller: {
        paddingHorizontal: 16,
        paddingBottom: 6,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 32,
        paddingHorizontal: 16,
    },

    gridItem: {
        width: "22.5%",
        marginRight: 0,
        marginBottom: 0,
    },

    flecheMobile: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconeChevron: {
        marginTop: -12.25,
    },

    rechercheWrapper: {
        marginTop: 8,
        marginBottom: 20,
        maxWidth: 520,
        paddingLeft: 16,
    },

    rechercheInput: {
        height: 46,
        borderRadius: 999,
        backgroundColor: "#ffffff",
        paddingLeft: 46,
        paddingRight: 18,
        fontSize: 17,
        color: "#000000",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },

        borderWidth: 1,
        borderColor: "#EFEFEF",
    },

    iconeRecherche: {
        position: "absolute",
        left: 33,
        top: "49.5%",
        transform: [{ translateY: -10 }],
        zIndex: 2,
    },

    videFavoris: {
        fontSize: 16,
        color: "#666",
        marginTop: 12,
        marginBottom: 600,
    },


});