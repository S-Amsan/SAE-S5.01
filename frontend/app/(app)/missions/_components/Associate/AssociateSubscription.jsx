import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView, Pressable,
    Image, Platform
} from "react-native";
import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {uploadDocument} from "../../../../../services/documents.api";


export default function AssociateSubscription({ onBack, card }) {
    const [file, setFile] = useState(null);
    const [showUploadMenu, setShowUploadMenu] = useState(false);
    const isImage = file?.type?.startsWith("image");
    const isPdf = file?.type === "application/pdf";


    const handleUpload = () => {
        setShowUploadMenu(true);
    };

    const handleSubmit = async () => {
        if (!file) return;

        console.log("IS FILE:", file instanceof File);
        console.log("FILE SIZE:", file.size);

        try {
            await uploadDocument(card.id, file);
            onBack?.();
        } catch (e) {
            console.error("UPLOAD ERROR:", e);
            alert("Erreur lors de l’envoi du document");
        }
    };

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ["application/pdf", "image/*"],
        });

        if (!result.canceled && result.assets?.length) {
            const asset = result.assets[0];

            if (Platform.OS === "web") {
                const response = await fetch(asset.uri);
                const blob = await response.blob();

                const file = new File(
                    [blob],
                    asset.name ?? "document.pdf",
                    { type: blob.type || "application/pdf" }
                );

                setFile(file);
            } else {
                setFile({
                    uri: asset.uri,
                    name: asset.name ?? "document.pdf",
                    type: asset.mimeType ?? "application/pdf",
                });
            }
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            quality: 0.7,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            setFile({
                uri: asset.uri,
                name: "photo.jpg",
                type: "image/jpeg",
            });
        }
    };


    const pickImageFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            const asset = result.assets[0];

            if (Platform.OS === "web") {
                const response = await fetch(asset.uri);
                const blob = await response.blob();

                setFile(
                    new File([blob], "image.jpg", { type: "image/jpeg" })
                );
            } else {
                setFile({
                    uri: asset.uri,
                    name: "image.jpg",
                    type: "image/jpeg",
                });
            }
        }
    };


    const Content = (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Bandeau récompense */}
            <View style={styles.rewardBox}>
                <Text style={styles.rewardTitle}>
                    Associer votre carte fidélité à Ecoception
                </Text>
                <Text style={styles.rewardSub}>
                    Récompense : +50 000 points
                </Text>
            </View>

            <Text style={styles.sectionTitle}>
                Importer un justificatif
            </Text>

            {!file ? (
                <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={handleUpload}
                >
                    <Text style={styles.uploadIcon}>📄</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.previewBox}>

                    {/* Image preview */}
                    {isImage && (
                        <Image
                            source={{ uri: file.uri }}
                            style={styles.previewImage}
                        />
                    )}

                    {/* PDF preview */}
                    {isPdf && (
                        <View style={styles.previewPdfIcon}>
                            <Text style={{ fontSize: 24 }}>📄</Text>
                        </View>
                    )}

                    {/* Filename */}
                    <Text style={styles.previewFileName}>
                        {file.name}
                    </Text>

                    {/* Actions */}
                    <View style={styles.previewActions}>
                        <TouchableOpacity onPress={handleUpload}>
                            <Text style={styles.previewEdit}>✏️</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setFile(null)}>
                            <Text style={styles.previewDelete}>✕</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={styles.reminder}>
                <Text style={styles.reminderTitle}>Rappel :</Text>
                <Text style={styles.reminderItem}>
                    • Formats acceptés : PDF, PNG, JPG
                </Text>
                <Text style={styles.reminderItem}>
                    • Le justificatif doit être lisible et complet.
                </Text>
                <Text style={styles.reminderItem}>
                    • Document officiel avec votre nom et une preuve d’abonnement
                </Text>
            </View>

            <Text style={styles.footerText}>
                Les points sont attribués après validation de votre dossier
            </Text>

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    !file && styles.submitDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!file}
            >
                <Text style={styles.submitText}>Envoyer</Text>
            </TouchableOpacity>

            <Text style={styles.deleteInfo}>
                Votre justificatif est supprimé automatiquement après vérification.
            </Text>

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
                                await pickImageFromGallery();
                            }}
                        >
                            <Image
                                style={styles.menuIcon}
                                source={require("../../../../../assets/icones/missions/picture.png")}
                            />
                            <Text style={styles.menuText}>Importer une photo</Text>
                        </TouchableOpacity>

                        <View style={styles.menuSeparator} />

                        {/* 📄 Document PDF */}
                        <TouchableOpacity
                            style={styles.menuRow}
                            onPress={async () => {
                                setShowUploadMenu(false);
                                await pickDocument();
                            }}
                        >
                            <Image
                                style={styles.menuIcon}
                                source={require("../../../../../assets/icones/missions/document.png")}
                            />
                            <Text style={styles.menuText}>Importer un document</Text>
                        </TouchableOpacity>

                    </Pressable>
                </Pressable>
            )}


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
                        <Text style={{ fontSize: 18 }}>✕</Text>
                    </TouchableOpacity>

                    {Content}
                </View>

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
                                    await pickImageFromGallery();
                                }}
                            >
                                <Image
                                    style={styles.menuIcon}
                                    source={require("../../../../../assets/icones/missions/picture.png")}
                                />
                                <Text style={styles.menuText}>Importer une photo</Text>
                            </TouchableOpacity>

                            <View style={styles.menuSeparator} />

                            {/* 📄 Document */}
                            <TouchableOpacity
                                style={styles.menuRow}
                                onPress={async () => {
                                    setShowUploadMenu(false);
                                    await pickDocument();
                                }}
                            >
                                <Image
                                    style={styles.menuIcon}
                                    source={require("../../../../../assets/icones/missions/document.png")}
                                />
                                <Text style={styles.menuText}>Importer un document</Text>
                            </TouchableOpacity>

                        </Pressable>
                    </Pressable>
                )}

            </View>
        );
    }


    return Content;
}
