import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { isWeb } from "../../../../../utils/platform";
import styles from "./Styles/styles";

export default function Post({ onBack }) {
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        console.log({ title, address, description });
        onBack();
    };

    if (isWeb) {
        return (
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <ScrollView
                        contentContainerStyle={styles.container}
                        showsVerticalScrollIndicator={false}
                    >
                        <TouchableOpacity
                            style={styles.modalClose}
                            onPress={onBack}
                        >
                            <Text>✕</Text>
                        </TouchableOpacity>

                        {renderForm({
                            title,
                            setTitle,
                            address,
                            setAddress,
                            description,
                            setDescription,
                            handleSubmit,
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {renderForm({
                title,
                setTitle,
                address,
                setAddress,
                description,
                setDescription,
                handleSubmit,
            })}
        </ScrollView>
    );
}

function renderForm({
                        title,
                        setTitle,
                        address,
                        setAddress,
                        description,
                        setDescription,
                        handleSubmit,
                    }) {
    return (
        <>
            <View style={styles.rewardBox}>
                <Text style={styles.rewardTitle}>
                    Donnez une seconde vie à cet objet !
                </Text>
                <Text style={styles.rewardSub}>Récompense : +500 points</Text>
            </View>

            <Text style={styles.label}>Titre</Text>
            <TextInput
                style={styles.input}
                placeholder="exemple : Canapé"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Adresse</Text>
            <TextInput
                style={styles.input}
                placeholder="exemple : 34 rue Piana Drancy, France"
                value={address}
                onChangeText={setAddress}
            />

            <Text style={styles.label}>Informations supplémentaires</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="exemple : Posé juste à côté d’un arbre."
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Text style={styles.label}>Prenez une photo</Text>
            <TouchableOpacity style={styles.photoBox}>
                <Text style={styles.photoIcon}>📷</Text>
            </TouchableOpacity>

            <Text style={styles.reminder}>
                Les points sont attribués après validation de votre photo.
            </Text>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.submitText}>Poster</Text>
            </TouchableOpacity>
        </>
    );
}
