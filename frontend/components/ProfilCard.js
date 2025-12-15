import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
} from "react-native";

export default function ProfilCard({ photo, name, username }) {
    const { width } = useWindowDimensions();
    const styles = getStyles(width);

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

const getStyles = (width) => {
    const isSmall = width < 1100;

    return StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            marginTop: 24,
        },

        photo: {
            width: isSmall ? 48 : 60,
            height: isSmall ? 48 : 60,
            borderRadius: 999,
            borderWidth: 2,
            borderColor: "#fff",
        },

        textContainer: {
            marginLeft: 14,
        },

        name: {
            fontSize: isSmall ? 18 : 22,
            fontWeight: "700",
            color: "#fff",
            lineHeight: 26,
        },

        username: {
            fontSize: isSmall ? 14 : 16,
            fontWeight: "500",
            color: "#0A5F45",
            opacity: 0.9,
        },
    });
};
