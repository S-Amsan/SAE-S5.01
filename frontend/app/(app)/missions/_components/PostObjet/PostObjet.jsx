import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Image,
    Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { isWeb } from "../../../../../utils/platform";
import { postObject } from "../../../../../services/objects.api";
import styles from "./Styles/styles";

export default function PostObjet({ onBack }) {
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    // URI utilisée pour l’upload
    const [photo, setPhoto] = useState(null);
    // URI affichable (mobile = file://, web = blob:)
    const [photoPreview, setPhotoPreview] = useState(null);

    const [showUploadMenu, setShowUploadMenu] = useState(false);

    /* ======================
       📷 CAMERA
    ====================== */
    const takePhoto = async () => {
        setShowUploadMenu(false);

        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission requise", "Accès caméra refusé");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.8,
            allowsEditing: true,
        });

        await handleImageResult(result);
    };

    /* ======================
       🖼️ GALERIE
    ====================== */
    const pickFromGallery = async () => {
        setShowUploadMenu(false);

        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Permission requise", "Accès galerie refusé");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.8,
            allowsEditing: true,
        });

        await handleImageResult(result);
    };

    /* ======================
       🔁 TRAITEMENT IMAGE (WEB + MOBILE)
    ====================== */
    const handleImageResult = async (result) => {
        if (result.canceled) return;

        const uri = result.assets[0].uri;
        setPhoto(uri);

        if (isWeb) {
            const response = await fetch(uri);
            const blob = await response.blob();
            const previewUrl = URL.createObjectURL(blob);
            setPhotoPreview(previewUrl);
        } else {
            setPhotoPreview(uri);
        }
    };

    /* ======================
       🚀 SUBMIT
    ====================== */
    const handleSubmit = async () => {
        if (!photo) {
            Alert.alert("Photo requise", "Veuillez ajouter une photo");
            return;
        }

        try {
            await postObject({
                title,
                address,
                description,
                imageUrl: photo,
            });

            onBack();
        } catch (e) {
            console.error(e);
            Alert.alert("Erreur", "Impossible de poster l’objet");
        }
    };

    /* ======================
       📄 CONTENU COMMUN
    ====================== */
    const Content = (
        <>
            <View style={styles.rewardBox}>
                <Text style={styles.rewardTitle}>
                    Donnez une seconde vie à cet objet !
                </Text>
                <Text style={styles.rewardSub}>
                    Récompense : +500 points
                </Text>
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
            <TouchableOpacity
                style={styles.photoBox}
                onPress={() => setShowUploadMenu(true)}
            >
                {photoPreview ? (
                    <Image source={{ uri: photoPreview }} style={styles.preview} />
                ) : (
                    <Text style={styles.photoIcon}>📷</Text>
                )}
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

    /* ======================
       🌐 WEB (MODAL)
    ====================== */
    if (isWeb) {
        return (
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.modalClose}
                        onPress={onBack}
                    >
                        <Text>✕</Text>
                    </TouchableOpacity>

                    <ScrollView
                        contentContainerStyle={styles.container}
                        showsVerticalScrollIndicator={false}
                    >
                        {Content}
                    </ScrollView>
                    {showUploadMenu && (
                        <Pressable
                            style={styles.menuOverlay}
                            onPress={() => setShowUploadMenu(false)}
                        >
                            <Pressable style={styles.menuContainer} onPress={() => {}}>

                                {/* 📷 Camera */}
                                <TouchableOpacity
                                    style={styles.menuRow}
                                    onPress={async () => {
                                        setShowUploadMenu(false);
                                        await takePhoto();
                                    }}
                                >
                                    <Image
                                        style={styles.menuIcon}
                                        source={require("../../../../../assets/icones/missions/camera.png")}
                                    />
                                    <Text style={styles.menuText}>Prendre une photo</Text>
                                </TouchableOpacity>

                                <View style={styles.menuSeparator} />

                                {/* 🖼️ Galerie */}
                                <TouchableOpacity
                                    style={styles.menuRow}
                                    onPress={async () => {
                                        setShowUploadMenu(false);
                                        await pickFromGallery();
                                    }}
                                >
                                    <Image
                                        style={styles.menuIcon}
                                        source={require("../../../../../assets/icones/missions/picture.png")}
                                    />
                                    <Text style={styles.menuText}>Importer une photo</Text>
                                </TouchableOpacity>

                            </Pressable>
                        </Pressable>
                    )}
                </View>
            </View>
        );
    }

    /* ======================
       📱 MOBILE
    ====================== */
    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {Content}
            </ScrollView>

            {showUploadMenu && (
                <Pressable
                    style={styles.menuOverlay}
                    onPress={() => setShowUploadMenu(false)}
                >
                    <Pressable style={styles.menuContainer} onPress={() => {}}>

                        {/* 📷 Camera */}
                        <TouchableOpacity
                            style={styles.menuRow}
                            onPress={async () => {
                                setShowUploadMenu(false);
                                await takePhoto();
                            }}
                        >
                            <Image
                                style={styles.menuIcon}
                                source={require("../../../../../assets/icones/missions/camera.png")}
                            />
                            <Text style={styles.menuText}>Prendre une photo</Text>
                        </TouchableOpacity>

                        <View style={styles.menuSeparator} />

                        {/* 🖼️ Galerie */}
                        <TouchableOpacity
                            style={styles.menuRow}
                            onPress={async () => {
                                setShowUploadMenu(false);
                                await pickFromGallery();
                            }}
                        >
                            <Image
                                style={styles.menuIcon}
                                source={require("../../../../../assets/icones/missions/picture.png")}
                            />
                            <Text style={styles.menuText}>Importer une photo</Text>
                        </TouchableOpacity>

                    </Pressable>
                </Pressable>
            )}
        </View>

    );
}
