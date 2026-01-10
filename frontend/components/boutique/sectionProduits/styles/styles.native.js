import { StyleSheet } from "react-native";

export default StyleSheet.create({
    section: {
        marginLeft: 0,
        paddingHorizontal: 16,
    },

    lien: {
        color: "#000",
        fontFamily: "Inter",
        fontSize: 17,
        fontWeight: "700",
        marginLeft: -14,
    },

    scroller: {
        paddingHorizontal: 0,
        paddingBottom: 10,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 12,
        paddingHorizontal: 0,
    },

    gridItem: {
        width: "48%",
        marginRight: 0,
        marginBottom: 12,
    },

    flecheMobile : {
        marginBottom: 14,
        flexDirection : "row",
        alignItems: "center"
    },

    iconeChevron: {
        marginTop: 3.25,
    },

    rechercheWrapper: {
        marginBottom: 14,
        paddingRight: 12,
    },

    rechercheInput: {
        height: 40,
        borderRadius: 999,
        backgroundColor: "#ffffff",
        paddingLeft: 44,
        paddingRight: 14,
        paddingTop: 14,
        paddingBottom: 10,
        fontSize: 14,
        color: "#000000",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },

    iconeRecherche: {
        position: "absolute",
        left: 15,
        top: "49.5%",
        transform: [{ translateY: -10 }],
        zIndex: 2,
    },

});
