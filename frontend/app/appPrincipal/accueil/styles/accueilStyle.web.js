import { StyleSheet } from "react-native";

export default StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    header: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#eee",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 15,
    },

    input: {
        marginLeft: 8,
        flex: 1,
        outlineStyle: "none",
    },

    filtersContainer: {
        flexDirection: "row",
        gap: 10,
    },

    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e8e8e8",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },

    filterText: {
        marginRight: 4,
        fontWeight: "500",
    },

    /* --- Carte utilisateur (PostCard) --- */
    card: {
        width:"80%",
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 21,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginLeft:"2%"
    },

    name: {
        fontWeight: "700",
        fontSize: 20,
        margin:10,
    },

    time: {
        color: "#777",
        fontSize: 14,
    },

    text: {
        marginTop: 2,
        fontSize: 16,
        padding:10,
        marginLeft:"2%",
    },

    image: {
        width: "70%",
        height: 370,
        borderRadius: 16,
        marginLeft:"12%",
    },

    actions: {
        flexDirection: "row",
        gap: 14,
        marginTop: 12,
        marginLeft:"12%",
    },

    actionBtn: {
        width: 60,
        height: 60,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
    },

    icon:{
        width:40,
        height:40,
    },

    profil:{
        width:22,
        height:22,
    },

    signal:{
        width:17,
        height:19,
    },

    postMenu: {
        position: "absolute",
        top: 80,
        right: 2,
        width: 225,
        backgroundColor: "rgba(60,60,60,0.95)",
        borderRadius: 18,
        overflow: "hidden",
        zIndex: 20,
    },

    postMenuRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 14,
    },

    postMenuText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },

    postMenuDanger: {
        color: "#ff4d4f",
        fontSize: 16,
        fontWeight: "500",
    },

    postMenuSeparator: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.2)",
        marginHorizontal: 12,
    },

    /* WEB MODAL */
    modalOverlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContent: {
        width: 420,
        maxHeight: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
    },
});
