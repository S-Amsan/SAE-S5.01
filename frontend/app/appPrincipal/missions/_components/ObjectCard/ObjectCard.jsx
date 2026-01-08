import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles/styles";
import { fetchUserById } from "../../../../../services/user.api";
import { formatRelativeTime } from "../../../../../utils/format";

export default function ObjectCard({ item, buttonLabel, onSeeObjet }) {


    const [avatar, setAvatar] = useState(null);
    const [pseudo, setPseudo] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await fetchUserById(item.user_id);
                setAvatar(user.photoProfileUrl);
                setPseudo(user.pseudo);
            } catch (e) {
                console.error("Erreur chargement user objet", e);
            }
        };

        loadUser();
    }, [item.user_id]);

    return (
        <View style={styles.card}>
            {/* IMAGE OBJET */}
            <Image
                source={{ uri: item.photoUrl }}
                style={styles.image}
                onError={(e) =>
                    console.log("IMAGE OBJET ERROR", e.nativeEvent)
                }
            />

            {/* CONTENU */}
            <View style={styles.content}>
                {/* TITRE + ADRESSE */}
                <View style={styles.topRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.address}>📍 {item.address}</Text>
                </View>

                {/* USER + DATE */}
                <View style={styles.userRow}>
                    {avatar && (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    )}

                    <View>
                        {pseudo && (
                            <Text style={styles.name}>@{pseudo}</Text>
                        )}
                        <Text style={styles.meta}>
                            • {formatRelativeTime(item.creationDate)}
                        </Text>
                    </View>
                </View>

                {/* DESCRIPTION */}
                {item.description && (
                    <Text style={styles.describe}>{item.description}</Text>
                )}

                {/* ACTION */}
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onSeeObjet()}

                    >
                        <Text style={styles.buttonText}>{buttonLabel}</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    );
}
