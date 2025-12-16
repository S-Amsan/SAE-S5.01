import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

// Largeur de la navbar web
const navbarWidth = Platform.OS === "web" && width < 1367 ? "6%" : 0 ;
console.log("DEBUG - Navbar width:", navbarWidth);


export default StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent",
        zIndex: 50,
    },
    container: {
        backgroundColor: "#1DDE9A",
        height: "10%",
        elevation: 4,
        position: "relative",
        zIndex: 100,
        justifyContent: "center",
        marginLeft: navbarWidth, // <-- Ajout pour décaler le Header à droite de la Navbar
    },
    sousContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginLeft: 15,
    },
    barreDeRecherche: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 40,
        width: "50%",
        marginRight: 10,
        elevation: 3,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    },
    rechercheInput: {
        marginLeft: 6,
        flex: 1,
        outlineStyle: "none",
    },
    filtresContainer: {
        flexDirection: "row",
        position: "relative",
        zIndex: 200,
    },
    filtreContainer: {
        position: "relative",
    },
    filtre: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15,
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        width: 100,
        height: 40,
        borderRadius: 12,
        marginRight: 10,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    },
    menuDeroulant: {
        position: "absolute",
        top: 45,
        left: "5%",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 6,
        width: 120,
        zIndex: 999,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    },
    option: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    optionSelect: {
        fontWeight: "bold",
    },
    ongletsContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        gap: "25%",
        marginTop: 8,
    },
    ongletContainer: {
        paddingHorizontal: 100,
        gap: 5,
    },
    ongletLabel: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 20,
    },
    ongletUnderline: {
        backgroundColor: "#FFFFFF",
        height: 6,
        width: "100%",
        borderRadius: 6,
    },
    detailsContainer: {
        flexDirection: "row",
        gap: 15,
        flex: 1,
        justifyContent: "flex-end",
        marginRight: 50,
        margin: "auto",
    },
    detailContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        flexDirection: "row-reverse",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 50,
        width: 87,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    },
    detailText: {
        fontWeight: "bold",
        fontSize: 15,
    },
});
