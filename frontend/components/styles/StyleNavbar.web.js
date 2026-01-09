import { StyleSheet, Platform } from "react-native";

export const getStyles = (width) => {
    const isSmall = width < 1100;
    const isMedium = width >= 1100 && width < 1600;

    return StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
        },

        webview: {
            position: "fixed",
            left: 0,
            top: 0,
            width: isSmall ? 80 : isMedium ? 200 : 260,
            height: "100vh",
            backgroundColor: "#00DB83",
            zIndex: 100,
            display: Platform.OS === "web" ? "flex" : "none",
        },

        titleContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 16,
            marginVertical: 24,


        },

        logo: {
            width: isSmall ? 40 : 60,
            height: isSmall ? 40 : 60,

        },

        title: {
            color: "#FFFFFF",
            fontSize: isSmall ? 16 : isMedium ? 25 : 32,
            fontWeight: "600",
            whiteSpace: "nowrap",



        },

        tabsContainer: {
            flex: 1,
            padding: 12,


        },

        tabs: {
            paddingVertical: 12,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
            width: "100%",
            borderRadius: 10,
            cursor: "pointer",

        },

        Icon: {
            width: isSmall ? 24 : 32,
            height: isSmall ? 24 : 32,
        },

        IconText: {
            fontSize: isSmall ? 14 : 18,
            marginLeft: 16,
            color: "#fff",
        },
        tabsDashbordContainer : {
            marginTop : -15,
            gap : 10,
            marginBottom : 15,
        },
        tabsDashbord: {
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
            marginLeft: 40,
        },

        IconDashbord: {
            width: isSmall ? 20 : 28,
            height: isSmall ? 20 : 28,
        },

        IconDashbordText: {
            fontSize: isSmall ? 10 : 14,
            fontWeight : "400",
            marginLeft: 5,
            color: "#fff",
        },
    });
};
