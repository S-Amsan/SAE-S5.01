import { StyleSheet } from "react-native";

export default StyleSheet.create({

    /* --- Wrapper principal --- */
    content: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    /* --- Header (déjà géré dans ton composant Header) --- */
    header: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    /* --- Searchbox + Filters (si tu veux les réutiliser dans le feed) --- */
    searchBox: {
        width: "50%",
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
        outlineStyle: "none", // 🔥 important pour web
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
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },

    userRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        flexWrap: "wrap",
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 10,
    },

    username: {
        fontWeight: "bold",
        fontSize: 16,
    },

    danger: {
        color: "red",
        fontSize: 14,
    },

    time: {
        marginLeft: "auto",
        color: "#777",
        fontSize: 13,
    },

    postImage: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        marginTop: 10,
    },

    actions: {
        flexDirection: "row",
        gap: 15,
        marginTop: 10,
    },
});
