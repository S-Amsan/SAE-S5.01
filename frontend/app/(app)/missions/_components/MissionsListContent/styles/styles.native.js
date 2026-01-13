import {Platform, StyleSheet} from "react-native";

export default StyleSheet.create({

    /* ===== PAGE ===== */
    page: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },

    /* ===== HEADER ===== */
    header: {
        backgroundColor: "#0ED49B",
        borderRadius: 12,
        padding: 20,
        margin: 15,
    },

    infoHeader: {
        backgroundColor: "#0ED49B",
        borderRadius: 12,
        margin: 15,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,

        elevation: 4,
        alignItems:'center'
    },

    spship:{
        flexDirection:"row",
        padding:20,
    },

    HeaderImage:{
        width:80,
        height:50,
    },

    headerTitle: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    /* ===== INFO SECTION ===== */
    infoBox: {
        marginHorizontal: 15,
        marginBottom: 20,
    },

    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        elevation: 3,
    },

    infoContent: {
        padding: 16,
        paddingRight:130,
    },

    infoTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },

    imageWrapper: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width:110,
    },

    infoDesc: {
        fontSize: 14,
        color: "#666",
    },

    infoButton: {
        marginTop: 12,
        backgroundColor: "#3EDFA4",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: "flex-start",
    },

    infoButtonText: {
        color: "#fff",
        fontWeight: "600",
    },

    infoImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    /* ===== LISTE DES CARTES ===== */
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 18,
        marginHorizontal: 12,
        marginBottom: 16,
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },

    image: {
        width: 110,
        height: 110,
        borderRadius: 16,
        backgroundColor: "#eee",
    },

    body: {
        flex: 1,
        marginLeft: 5,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111",

        paddingRight:6,
    },

    distance: {
        fontSize: 10,
        color: "#999",
        fontWeight: "500",

    },

    userRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
        gap: 6,
    },

    avatar: {
        width: 26,
        height: 26,
        borderRadius: 13,
    },

    userText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111",
    },

    address: {
        fontSize: 12,
        color: "#333",
        marginTop: 6,

    },

    right: {
        justifyContent: "center",
        alignItems: "center",
        marginRight:5,
    },

    button: {
        backgroundColor: "#1ED08C",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
    },

    buttonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
});
