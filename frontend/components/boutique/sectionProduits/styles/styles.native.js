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
    }
});
