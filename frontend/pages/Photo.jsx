import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import { loadRegisterData, saveRegisterData, clearRegisterData } from "../services/RegisterStorage";
import styles from "./styles/photoStyles";

export default function Photo() {
    const navigation = useNavigation();

    const [photoUri, setPhotoUri] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            const saved = await loadRegisterData();
            if (saved?.photo) setPhotoUri(saved.photo);
            if (saved?.name) setName(saved.name);
        }
        load();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
            await saveRegisterData({ photo: result.assets[0].uri });
            Toast.show({ type: "success", text1: "Photo sélectionnée" });
        }
    };

    const handleFinishSignup = async () => {
        if (!photoUri) {
            return Toast.show({
                type: "error",
                text1: "Photo requise",
                text2: "Veuillez choisir une photo."
            });
        }

        if (name.trim().length === 0) {
            return Toast.show({
                type: "error",
                text1: "Nom manquant",
                text2: "Veuillez entrer un nom."
            });
        }

        const data = await loadRegisterData();

        if (!data) {
            return Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "Données d'inscription introuvables."
            });
        }


        await saveRegisterData({ name: name.trim() });


        const formData = new FormData();

        formData.append("pseudo", data.pseudo);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("phone", data.phone);
        formData.append("age", String(data.age ?? ""));
        formData.append("parrainCode", data.parrainCode ?? "");
        formData.append("name", name.trim());


        formData.append("photo", {
            uri: photoUri,
            type: "image/jpeg",
            name: "profile.jpg"
        });

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/auth/signupMultipart", {
                method: "POST",
                body: formData
            });


            if (!response.ok) {
                const errorText = await response.text();
                Toast.show({
                    type: "error",
                    text1: "Erreur d'inscription",
                    text2: errorText
                });
                return;
            }

            await clearRegisterData();

            Toast.show({
                type: "success",
                text1: "Compte créé",
                text2: "Bienvenue !"
            });

            navigation.navigate("/appPrincipal/accueil");

        } catch (err) {
            console.log("Erreur réseau:", err);
            Toast.show({
                type: "error",
                text1: "Erreur réseau",
                text2: "Impossible de contacter le serveur."
            });
        }

        setLoading(false);
    };

    return (
        <LinearGradient colors={["#00DB83", "#0CD8A9"]} style={styles.gradient}>
            <View style={styles.container}>

                <Text style={styles.title}>Personnaliser{"\n"}votre profil</Text>

                <Text style={styles.label}>Photo de profil</Text>

                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.photoWrapper}>
                        <View style={styles.photoCircle}>
                            {photoUri ? (
                                <Image source={{ uri: photoUri }} style={styles.photoPreview} />
                            ) : (
                                <Image
                                    source={require("../assets/icones/photo.png")}
                                    style={styles.cameraIcon}
                                />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>

                <Text style={styles.label}>Nom</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez votre nom"
                    placeholderTextColor="#A9A9A9"
                    value={name}
                    onChangeText={setName}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleFinishSignup}>
                    <Text style={styles.submitText}>Valider</Text>
                </TouchableOpacity>

                {loading && (
                    <View style={{ marginTop: 20 }}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={{ color: "white", marginTop: 10 }}>Création du compte...</Text>
                    </View>
                )}
            </View>
        </LinearGradient>
    );
}
