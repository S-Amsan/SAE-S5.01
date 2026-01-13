import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

import {
    loadRegisterData,
    clearRegisterData,
    updateRegisterData,
    saveUser
} from "../../services/RegisterStorage";
import { signupMultipart } from "../../services/signup.api";

import styles from "./styles/photoStyles";
import { login } from "../../services/login.api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Photo() {
    const [photoUri, setPhotoUri] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    // ===============================
    // Permissions Image Picker
    // ===============================
    useEffect(() => {
        ImagePicker.requestMediaLibraryPermissionsAsync();
    }, []);

    // ===============================
    // Load saved registration data
    // ===============================
    useEffect(() => {
        async function load() {
            const saved = await loadRegisterData();
            if (saved?.photo?.uri) setPhotoUri(saved.photo.uri);
            if (saved?.name) setName(saved.name);
        }
        load();
    }, []);

    // ===============================
    // PICK IMAGE
    // ===============================
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7
        });

        if (result.canceled) return;

        let uri = result.assets[0].uri;

        if (Platform.OS !== "web") {
            const resized = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 1024 } }],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
            uri = resized.uri;
        }

        await updateRegisterData({ photo: { uri } });
        setPhotoUri(uri);

        Toast.show({
            type: "success",
            text1: "Photo sélectionnée"
        });
    };

    // ===============================
    // FINAL SIGNUP
    // ===============================
    const handleFinishSignup = async () => {
        if (!photoUri)
            return Toast.show({
                type: "error",
                text1: "Photo requise",
                text2: "Veuillez choisir une photo."
            });

        if (!name.trim())
            return Toast.show({
                type: "error",
                text1: "Nom manquant",
                text2: "Veuillez entrer un nom."
            });

        const data = await loadRegisterData();
        if (!data)
            return Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "Données d'inscription introuvables."
            });

        await updateRegisterData({ name: name.trim() });
        setLoading(true);

        try {
            await signupMultipart({
                pseudo: data.pseudo,
                email: data.email,
                password: data.password,
                name: name.trim(),
                phone: data.phone,
                age: data.age,
                photoUri
            });

            // 🔐 récupère le token + user
            await login(data.email, data.password);

            // 🔥 RESET ONBOARDING (IMPORTANT)
            await AsyncStorage.removeItem("@onboarding_seen");

            // 🧹 nettoyage
            await clearRegisterData();

            Toast.show({
                type: "success",
                text1: "Compte créé",
                text2: "Bienvenue !"
            });

            router.replace("/(app)/accueil");

        } catch (err) {
            console.log("Erreur signup:", err);
            Toast.show({
                type: "error",
                text1: "Erreur d'inscription",
                text2: "Veuillez réessayer."
            });
        } finally {
            setLoading(false);
    }{
        }
    };



    return (
        <LinearGradient colors={["#00DB83", "#0CD8A9"]} style={styles.gradient}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Personnaliser{"\n"}votre profil
                </Text>

                <Text style={styles.label}>Photo de profil</Text>

                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.photoWrapper}>
                        <View style={styles.photoCircle}>
                            {photoUri ? (
                                <Image
                                    source={{ uri: photoUri }}
                                    style={styles.photoPreview}
                                />
                            ) : (
                                <Image
                                    source={require("../../assets/icones/photo.png")}
                                    style={styles.cameraIcon}
                                />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>

                <Text style={styles.label}>Nom</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez votre nom (minimum 4 lettres)"
                    placeholderTextColor="#A9A9A9"
                    value={name}
                    onChangeText={setName}
                />

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleFinishSignup}
                >
                    <Text style={styles.submitText}>Valider</Text>
                </TouchableOpacity>

                {loading && (
                    <View style={{ marginTop: 20 }}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={{ color: "white", marginTop: 10 }}>
                            Création du compte...
                        </Text>
                    </View>
                )}
            </View>
        </LinearGradient>
    );
}
