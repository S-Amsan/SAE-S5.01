import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";
import {useEffect, useState} from "react";
import {fetchUserById} from "../../../../../services/user.api";
import {formatRelativeTime} from "../../../../../utils/format";

export default function MissionDetail({ objet, onRecupObjet, onSignal, onBack }) {

    const [pseudo, setPseudo] = useState(null);

    useEffect(() => {
        if (!objet?.publisher_user_id) return;

        const loadUser = async () => {
            try {
                const user = await fetchUserById(objet.publisher_user_id);
                setPseudo(user.pseudo);
            } catch (e) {
                console.error(e);
            }
        };

        loadUser();
    }, [objet?.publisher_user_id]);

    const Content = (
        <ScrollView contentContainerStyle={styles.container}>
            {/* RÉCOMPENSE */}
            <View style={styles.rewardBox}>
                <Text style={styles.rewardTitle}>
                    Donnez une seconde vie à cet objet !
                </Text>
                <Text style={styles.rewardSub}>
                    Récompense : +500 points
                </Text>
            </View>

            {/* TITRE */}
            <Text style={styles.title}>{objet.title}</Text>
            <Text style={styles.address}>📍 {objet.address}</Text>

            {/* IMAGE */}
            <Image source={{ uri: objet.photoUrl}} style={styles.image} />

            {/* META */}
            <Text style={styles.meta}>
                Posté par <Text style={styles.author}>{pseudo}</Text>, {formatRelativeTime(objet.creationDate)}
            </Text>

            {/* DESCRIPTION */}
            <Text style={styles.sectionTitle}>
                Informations supplémentaires :
            </Text>

            <View style={styles.descriptionBox}>
                <Text style={styles.descriptionText}>
                    {objet.description}
                </Text>
            </View>

            {/* ACTION */}
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={onRecupObjet}
            >
                <Text style={styles.primaryButtonText}>
                    Je l’ai récupéré !
                </Text>
            </TouchableOpacity>

            {/* SIGNALER */}
            <View style={styles.reportWrapper}>
                <TouchableOpacity onPress={onSignal}>
                    <Text style={styles.reportText}>
                        L’objet n’est plus là ?{" "}
                        <Text style={styles.reportLink}>Signaler</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    if (isWeb) {
        return (
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.modalClose}
                        onPress={onBack}
                    >
                        <Text style={styles.modalCloseText}>✕</Text>
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={styles.modalScroll}>
                        {Content}
                    </ScrollView>
                </View>
            </View>
        );
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {Content}
        </View>
    );
}
