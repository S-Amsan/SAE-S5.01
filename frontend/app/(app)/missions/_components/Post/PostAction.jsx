import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Pressable,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { postPost } from "../../../../../services/posts.api";


import styles from "./Styles/styles";

export default function PostAction() {
    const { code, product } = useLocalSearchParams();
    const parsedProduct = product ? JSON.parse(product) : null;

    const [showUploadMenu, setShowUploadMenu] = useState(false);
    const [photo, setPhoto] = useState(null);

    const router = useRouter();

    /* ======================
       📷 PRENDRE UNE PHOTO
    ====================== */
    const takePhoto = async () => {
        setShowUploadMenu(false);

        const { status } =
            await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Permission requise", "Accès à la caméra refusé");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });


        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    /* ======================
       🖼️ IMPORTER DEPUIS GALERIE
    ====================== */
    const pickFromGallery = async () => {
        setShowUploadMenu(false);

        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Permission requise", "Accès à la galerie refusé");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });



        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                name: parsedProduct?.product_name ?? "Produit inconnu",
                description: `A recyclé un produit de : ${parsedProduct?.brands ?? "marque inconnue"}`,
                imageUrl: photo,
            };

            console.log("SUBMIT PAYLOAD", payload);

            const response = await postPost(payload);

            console.log("POST SUCCESS", response);

            router.back();
        } catch (error) {
            console.error("POST ERROR", error);
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* ===== BANNER ===== */}
                <View style={styles.rewardBox}>
                    <Text style={styles.rewardTitle}>
                        Produit scanné :{" "}
                        {parsedProduct?.product_name ?? "Produit inconnu"}
                    </Text>

                    {parsedProduct?.brands && (
                        <Text style={styles.rewardSub}>
                            Marque : {parsedProduct.brands}
                        </Text>
                    )}

                    {parsedProduct?.product_quantity &&
                        parsedProduct?.product_quantity_unit && (
                            <Text style={styles.rewardSub}>
                                Quantité : {parsedProduct.product_quantity}{" "}
                                {parsedProduct.product_quantity_unit}
                            </Text>
                        )}

                    {parsedProduct?.plastic && (
                        <Text style={styles.rewardSub}>
                            Matière : Plastique
                        </Text>
                    )}

                    <Text style={styles.rewardSub}>
                        Récompense : +250 points
                    </Text>
                </View>

                {/* ===== TITLE ===== */}
                <Text style={styles.sectionTitle}>
                    Prenez une photo
                </Text>

                {/* ===== UPLOAD ===== */}
                <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={() => setShowUploadMenu(true)}
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

                {/* ===== REMINDER ===== */}
                <View style={styles.reminder}>
                    <Text style={styles.reminderTitle}>Rappel :</Text>
                    <Text style={styles.reminderItem}>
                        • Prenez la photo juste avant de jeter l’objet
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

                {/* ===== SUBMIT ===== */}
                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        !photo && styles.submitDisabled,
                    ]}
                    disabled={!photo}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitText}>Poster</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* ===== MENU PHOTO ===== */}
            {showUploadMenu && (
                <Pressable
                    style={styles.menuOverlay}
                    onPress={() => setShowUploadMenu(false)}
                >
                    <Pressable style={styles.menuContainer}>
                        <TouchableOpacity
                            style={styles.menuRow}
                            onPress={takePhoto}
                        >
                            <Image
                                style={styles.menuIcon}
                                source={require("../../../../../assets/icones/missions/camera.png")}
                            />
                            <Text style={styles.menuText}>
                                Prendre une photo
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.menuSeparator} />

                        <TouchableOpacity
                            style={styles.menuRow}
                            onPress={pickFromGallery}
                        >
                            <Image
                                style={styles.menuIcon}
                                source={require("../../../../../assets/icones/missions/picture.png")}
                            />
                            <Text style={styles.menuText}>
                                Importer une photo
                            </Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            )}
        </View>
    );
}
