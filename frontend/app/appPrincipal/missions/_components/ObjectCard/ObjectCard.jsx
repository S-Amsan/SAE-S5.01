import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles/styles";
import { fetchUserById } from "../../../../../services/user.api";
import { formatRelativeTime } from "../../../../../utils/format";
import {isWeb} from "../../../../../utils/platform";

export default function ObjectCard({ item, buttonLabel, onSeeObjet }) {


    const [avatar, setAvatar] = useState(null);
    const [pseudo, setPseudo] = useState(null);

    useEffect(() => {
        if (!item?.publisher_user_id) return;

        const loadUser = async () => {
            try {
                const user = await fetchUserById(item.publisher_user_id);
                setAvatar(user.photoProfileUrl);
                setPseudo(user.pseudo);
            } catch (e) {
                console.error(e);
            }
        };

        loadUser();
    }, [item?.publisher_user_id]);

    if(isWeb){

    return (
        <View style={styles.card}>
            {/* IMAGE */}
            <Image
                source={{ uri: item.photoUrl }}
                style={styles.image}
            />

            {/* CONTENU CENTRAL */}
            <View style={styles.body}>

                {/* TITRE + DISTANCE */}
                <View style={styles.topRow}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>

                    <Text style={styles.address}>
                        📍 {item.address}
                    </Text>

                    <Text style={styles.distance}>
                        • {formatRelativeTime(item.creationDate)}
                    </Text>
                </View>

                {/* USER */}
                <View style={styles.userRow}>
                    {avatar && (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    )}
                    <Text style={styles.userText}>
                        @{pseudo}
                    </Text>
                </View>
            </View>
            <View style={styles.bouttonContainer}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSeeObjet(item)}
                >
                    <Text style={styles.buttonText}>{buttonLabel}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    }
    else {
        return (
            <View style={styles.card}>
                {/* IMAGE */}
                <Image
                    source={{ uri: item.photoUrl }}
                    style={styles.image}
                />

                {/* CONTENU CENTRAL */}
                <View style={styles.body}>

                    {/* TITRE + DISTANCE */}
                    <View style={styles.topRow}>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>

                        <Text style={styles.address}>
                            📍 {item.address}
                        </Text>

                        <Text style={styles.distance}>
                            • {formatRelativeTime(item.creationDate)}
                        </Text>
                    </View>

                    {/* USER */}
                    <View style={styles.userRow}>
                        {avatar && (
                            <Image source={{ uri: avatar }} style={styles.avatar} />
                        )}
                        <Text style={styles.userText}>
                            @{pseudo}
                        </Text>
                    </View>

                    {/* ADRESSE */}

                </View>


                <View style={styles.right}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onSeeObjet(item)}
                    >
                        <Text style={styles.buttonText}>{buttonLabel}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}
