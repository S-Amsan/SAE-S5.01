import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import styles from "./styles/styles";
import { reportPost } from "../../../../../../services/reports.api";

export default function SignalementReasons({ postId, onSuccess }) {

    const handleSelect = async (reason) => {
        if (!postId) {
            console.error("postId manquant");
            return;
        }

        try {
            await reportPost(Number(postId), reason);
            onSuccess();
        } catch (e) {
            console.error("Erreur signalement", e);
        }
    };

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
                    onPress={() => handleSelect(label)}
                >
                    <Text style={styles.rowText}>{label}</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
