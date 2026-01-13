import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles/styles";

export default function SignalementSuccess({ onDone }) {
    return (
        <View style={styles.successContainer}>
            <View style={styles.checkCircle}>
                <Text style={styles.check}>✓</Text>
            </View>

            <Text style={styles.successTitle}>
                Merci pour vos retours
            </Text>

            <Text style={styles.successSubtitle}>
                Ces signalements nous permettent de vous montrer moins de contenu de ce type à l’avenir.
            </Text>

            <TouchableOpacity
                style={styles.successButton}
                onPress={onDone}
            >
                <Text style={styles.successButtonText}>
                    Terminé
                </Text>
            </TouchableOpacity>
        </View>
    );
}
