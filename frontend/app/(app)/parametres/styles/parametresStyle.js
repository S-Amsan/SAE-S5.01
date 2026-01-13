import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const TWITTER_GRAY = "#f7f9f9";
const BORDER = "#eff3f4";
const TEXT_PRIMARY = "#0f1419";
const TEXT_SECONDARY = "#536471";
const BLUE = "#1d9bf0";
const DANGER = "#f4212e";

export default StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: TWITTER_GRAY,
    },

    /* LEFT NAVBAR */
    navbar: {
        width: 280,
        backgroundColor: "#fff",

    },

    /* GLOBAL CONTAINER */
    container: {
        flex: 1,
        flexDirection: "column",
        maxWidth: 1200,
        marginHorizontal: "auto",
    },

    /* CENTER MENU */
    center: {
        width: "100%",
        backgroundColor: "#fff",

    },

    pageTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: TEXT_PRIMARY,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },

    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
        backgroundColor: "#fff",
    },

    menuItemHover: {
        backgroundColor: "#f0f3f4",
    },

    menuItemActive: {
        backgroundColor: "#e8f5fd",
    },

    menuLabel: {
        fontSize: 15,
        color: TEXT_PRIMARY,
    },

    menuLabelActive: {
        fontWeight: "600",
        color: BLUE,
    },

    chevron: {
        fontSize: 18,
        color: TEXT_SECONDARY,
    },

    /* RIGHT PANEL */
    right: {
        flex: 1,
        backgroundColor: "#fff",
        paddingRight: "5%",
    },

    rightTitle: {
        fontSize: 22,
        fontWeight: "700",
        paddingHorizontal: 24,

        color: TEXT_PRIMARY,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
        marginBottom: 8,
    },

    settingItem: {
        paddingVertical: 16,
        paddingHorizontal: 24,

        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    settingItemHover: {
        backgroundColor: "#f0f3f4",
    },

    settingItemActive: {
        backgroundColor: "#e8f5fd",
    },


    settingItemDanger: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        paddingHorizontal: 24,

        borderBottomColor: BORDER,
    },

    settingTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: TEXT_PRIMARY,
        marginBottom: 4,
    },

    settingDesc: {
        fontSize: 14,
        color: TEXT_SECONDARY,
        lineHeight: 20,
    },

    settingDanger: {
        fontSize: 15,
        fontWeight: "600",
        color: DANGER,
        marginBottom: 4,
    },

    placeholder: {
        padding: 20,
        color: TEXT_SECONDARY,
    },
});
