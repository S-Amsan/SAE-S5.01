import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";

import styles from "./Styles/styles";
import { isWeb } from "../../../../../utils/platform";
import { useRouter, useLocalSearchParams } from "expo-router";




export default function PostAction() {
    const { code, product } = useLocalSearchParams();

    const parsedProduct = product ? JSON.parse(product) : null;

    const [photo, setPhoto] = useState(null);

    const router = useRouter();


    const handleTakePhoto = () => {
        // TODO: caméra / picker
        console.log("PRENDRE PHOTO");
        setPhoto("fake");
    };

    const handleSubmit = () => {
        console.log("SUBMIT", {
            code,
            product: parsedProduct,
            photo,
        });

        // TODO : upload photo + produit
        router.back();
    };


    const Content = (
        <ScrollView contentContainerStyle={styles.container}>
            {/* BANNER */}
            <View style={styles.rewardBox}>
                <Text style={styles.rewardTitle}>
                    Produit scanné : {parsedProduct?.product_name ?? "Produit inconnu"}
                </Text>

                {parsedProduct?.brands && (
                    <Text style={styles.rewardSub}>
                        Marque : {parsedProduct.brands}
                    </Text>
                )}

                {parsedProduct?.product_quantity && parsedProduct?.product_quantity_unit && (
                    <Text style={styles.rewardSub}>
                        Quantité : {parsedProduct.product_quantity} {parsedProduct.product_quantity_unit}
                    </Text>
                )}

                {/* AFFICHER UNIQUEMENT SI PLASTIQUE */}
                {parsedProduct?.plastic && (
                    <Text style={styles.rewardSub}>
                        Matière: Plastique
                    </Text>
                )}

            <Text style={styles.rewardSub}>
                    Récompense : +250 points
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
                        source={{ uri: "https://via.placeholder.com/300" }}
                        style={styles.preview}
                    />
                ) : (
                    <Text style={styles.uploadIcon}>📷</Text>
                )}
            </TouchableOpacity>

            {/* REMINDER */}
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

            {/* SUBMIT */}
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
    );

    if (isWeb) {
        return (
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* FERMER */}
                    <TouchableOpacity
                        style={styles.modalClose}
                        onPress={() => router.back()}
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
