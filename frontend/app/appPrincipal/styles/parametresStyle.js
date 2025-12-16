import { StyleSheet } from "react-native";

export default StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFFFF",
    },

    navbar: {
        width: "15%",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FFFFF",
    },
    center: {
        width: "100%",
        paddingHorizontal: 16,
    },

    right: {
        flex: 1,
        padding: 20,
    },

    pageTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#000",
        marginVertical: 16,
    },

    menuItemActive: {
        backgroundColor: "rgba(22,24,28,0.04)",
    },

    menuItemHover: {
        backgroundColor: "rgba(22,24,28,0.04)",
    },

    settingItemHover: {
        backgroundColor: "#16181c",
        paddingHorizontal: 8,
    },

    /* Optionnel : animation douce */
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 12,
        transitionDuration: "0ms",
    },

    settingItem: {
        paddingVertical: 14,
        transitionDuration: "150ms",
    },


    menuLabel: {
        fontSize: 15,
        color: "#000",
    },

    menuLabelActive: {
        fontWeight: "700",
    },

    chevron: {
        color: "#000",
        fontSize: 18,
    },

    rightTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#000",
        marginTop: "2%",
        marginBottom: "5%",
    },


    settingItemDanger: {
        paddingVertical: 14,

    },

    settingTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
        marginBottom: 4,
    },

    settingDesc: {
        fontSize: 13,
        color: "#71767b",
        lineHeight: 18,
    },

    settingDanger: {
        fontSize: 15,
        fontWeight: "600",
        color: "#f4212e",
        marginBottom: 4,
    },

    placeholder: {
        color: "#71767b",
        fontSize: 14,
        marginTop: 20,
    },
});
