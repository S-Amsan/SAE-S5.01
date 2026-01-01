import React from "react";
import {TouchableOpacity, StyleSheet, Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ScanActionButton({ onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={styles.button}
        >
            <Image
                source={require("../assets/scan.png")}
                style={{width: 46, height: 37}}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 130,
        right: 24,

        width: 64,
        height: 64,
        borderRadius: 32,

        backgroundColor: "#1DDE9A",
        justifyContent: "center",
        alignItems: "center",


        elevation: 5,


        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,

        zIndex: 1000,
    },
});


