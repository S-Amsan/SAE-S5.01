import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
    TextInput
} from "react-native";

import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";
import { pickupObject } from "../../../../../services/objects.api";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import {postPost} from "../../../../../services/posts.api";

export default function ObjetRecupPhoto({ objet, onBack, onSubmit }) {
    console.log("TEST WEB - ObjetRecupPhoto render", objet);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");

    const handleTakePhoto = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                Toast.show({
                    type: "error",
                    text1: "Permission refusée",
                    text2: "Accès à la caméra requis",
                });
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.7,
            });

            if (result.canceled) return;

            const uri = result.assets[0].uri;
            setPhoto(uri);

        } catch (e) {
            console.error("CAMERA ERROR", e);
            Toast.show({
                type: "error",
                text1: "Erreur caméra",
            });
        }
    };

    const handleSubmit = async () => {
        if (!photo || loading) return;

        console.log("SUBMIT CLICKED");

        try {
            setLoading(true);

            console.log("BEFORE pickupObject");
            const pickupResult = await pickupObject(objet.id);
            console.log("AFTER pickupObject", pickupResult);

            console.log("BEFORE postPost");
            const postResult = await postPost({
                objectId: objet.id,
                name: objet.title,
                description,
                imageUrl: photo,
            });
            console.log("AFTER postPost", postResult);

            Toast.show({
                type: "success",
                text1: "Objet récupéré",
                text2: "Photo envoyée pour validation",
            });

            onSubmit?.();

        } catch (e) {
            console.error("ERROR IN handleSubmit", e);

            Toast.show({
                type: "error",
                text1: "Action impossible",
                text2: e?.message ?? "Une erreur est survenue",
            });
        } finally {
            setLoading(false);
        }
    };






    const Content = (
        <ScrollView contentContainerStyle={styles.container}>
            {/* BANNER */}
            <View style={styles.rewardBox}>
                <Text style={styles.rewardTitle}>
                    Donnez une seconde vie à cet objet !
                </Text>
                <Text style={styles.rewardSub}>
                    Récompense : +500 points
                </Text>
            </View>

            {/* TITLE */}
            <Text style={styles.sectionTitle}>
                Prenez une photo
            </Text>

            {/* UPLOAD */}
            <TouchableOpacity
                style={styles.uploadBox}
                onPress={handleTakePhoto}
            >
                {photo ? (
                    <Image
                        source={{ uri: photo }}
                        style={styles.preview}
                    />
                ) : (
                    <Text style={styles.uploadIcon}>📷</Text>
                )}

            </TouchableOpacity>

            {/* DESCRIPTION */}
            <View style={styles.descriptionBox}>
                <Text style={styles.descriptionLabel}>
                    Description
                </Text>

                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Décrivez brièvement l’objet ou son état"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    editable={!loading}
                    textAlignVertical="top"
                />
            </View>


            {/* REMINDER */}
            <View style={styles.reminder}>
                <Text style={styles.reminderTitle}>Rappel :</Text>
                <Text style={styles.reminderItem}>
                    • Prenez la photo une fois l’objet chez vous
                </Text>
                <Text style={styles.reminderItem}>
                    • La photo doit être claire
                </Text>
                <Text style={styles.reminderItem}>
                    • Pas d’informations personnelles visibles
                </Text>
            </View>

            <Text style={styles.footerText}>
                Les points sont attribués après validation de votre photo
            </Text>

            {/* SUBMIT */}
            <TouchableOpacity
                style={[
                    styles.submitButton,
                    (!photo || loading) && styles.submitDisabled,
                ]}
                disabled={!photo || loading}
                onPress={handleSubmit}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitText}>Poster</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );

    if (isWeb) {
        return (
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.modalClose}
                        onPress={onBack}
                        disabled={loading}
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
