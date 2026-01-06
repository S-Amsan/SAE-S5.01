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
    }
});