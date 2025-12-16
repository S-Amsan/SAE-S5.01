import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');
export const getStyles = (width, height) => {
// Breakpoints pour responsive
const isDesktop = width > 1024;
const navbarWidth = isDesktop ? 280 : width * 0.25; // max 280px ou 25% de l'écran
const iconSize = isDesktop ? 35 : 25;
const fontSizeTitle = isDesktop ? 32 : 24;
const fontSizeTab = isDesktop ? 24 : 14;
const paddingVerticalTab = isDesktop ? 12 : 8;
const marginBottomTitleContainer = height * 0.05;
const marginTopTitleContainer = height * 0.02;

return StyleSheet.create({
    container: {
        width: navbarWidth,
        maxWidth: 280,
        height: '100%',
        backgroundColor: 'transparent',
    },

    webview: {
        position: "fixed",
        left: 0,
        top: 0,
        height: '100%',
        backgroundColor: '#00DB83',
        flexDirection: 'column',
        zIndex: 1000,     // AU-DESSUS DU DRAWER   //
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 20,
        marginBottom: marginBottomTitleContainer,
        marginTop: marginTopTitleContainer,
        alignItems: 'center',
    },

    logo: {
        width: 60,
        height: 60,
    },

    title: {
        color: '#FFFFFF',
        fontSize: fontSizeTitle,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginLeft: 12,
    },

    tabsContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        height: '100%',
        padding: 10,
    },

    tabs: {
        paddingVertical: paddingVerticalTab,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        width: '95%',
        borderRadius: 10,
    },

    Icon: {
        width: iconSize,
        height: iconSize,
    },

    IconText: {
        fontSize: fontSizeTab,
        fontWeight: '400',
        marginLeft: 15,
    },
});
}