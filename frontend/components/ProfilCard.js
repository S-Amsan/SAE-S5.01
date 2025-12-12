import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProfilCard({ photo, name, username }) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: photo }} style={styles.photo} />

            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.username}>@{username}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginTop: 15,
        marginHorizontal: 40,
        marginVertical: -40,
    },

    photo: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "white",
    },

    textContainer: {
        marginLeft: 15,
    },

    name: {
        fontSize: 24,
        fontWeight: "700",
        color: "white",
        marginBottom: 5,
    },

    username: {
        fontSize: 16,
        fontWeight: "500",
        color: "#0A5F45",
        opacity: 0.9,
    },
});
