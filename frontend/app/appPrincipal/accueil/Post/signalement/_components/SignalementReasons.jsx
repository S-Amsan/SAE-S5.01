import React from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import styles from "./styles/styles";

export default function SignalementReasons({ onSelect }) {
    const reasons = [
        "Arnaque, fraude ou spam",
        "Contenu inapproprié (nudité, violence, propos offensants)",
        "Faux contenu / photo trompeuse",
        "Déchet mal recyclé / non conforme",
        "Autre raison",
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>
                    Pourquoi signalez-vous cette publication ?
                </Text>
                <Text style={styles.subtitle}>
                    Votre signalement est anonyme et aide grandement au bon fonctionnement de l’application.
                </Text>
            </View>

            {reasons.map((label, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.row}
                    onPress={() => onSelect(label)}
                >
                    <Text style={styles.rowText}>{label}</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
