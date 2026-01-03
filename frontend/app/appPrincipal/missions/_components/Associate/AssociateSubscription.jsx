import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView, Pressable,
    Image
} from "react-native";
import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";

export default function AssociateSubscription({ onBack }) {
    const [file, setFile] = useState(null);
    const [showUploadMenu, setShowUploadMenu] = useState(false);

    const handleUpload = () => {
        setShowUploadMenu(true);
    };

    const handleSubmit = () => {
        // TODO: Service Post pour un document de type PDF, JPG, PNG,
        if (!file) return;
        console.log("SEND FILE", file);
        onBack?.();
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

            <TouchableOpacity
                style={styles.uploadBox}
                onPress={handleUpload}
            >
                <Text style={styles.uploadIcon}>📄</Text>
            </TouchableOpacity>

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
                        <TouchableOpacity
                            style={styles.menuRow}
                            onPress={() => {
                                setShowUploadMenu(false);
                                console.log("PRENDRE PHOTO");
                            }}
                        >
                            <Image style={styles.menuIcon}
                                   source={require("../../../../../assets/icones/missions/camera.png")}/>
                            <Text style={styles.menuText}>Prendre une photo</Text>
                        </TouchableOpacity>

                        <View style={styles.menuSeparator} />

                        <TouchableOpacity
                            style={styles.menuRow}
                            onPress={() => {
                                setShowUploadMenu(false);
                                console.log("IMPORTER PHOTO");
                            }}
                        >
                            <Image style={styles.menuIcon}
                                   source={require("../../../../../assets/icones/missions/picture.png")}/>
                            <Text style={styles.menuText}>Importer une photo</Text>
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
                        <Pressable
                            style={styles.menuContainer}
                            onPress={() => {}}
                        >
                            <TouchableOpacity style={styles.menuRow}>
                                <Image style={styles.menuIcon} source={require("../../../../../assets/icones/missions/camera.png")} />
                                <Text style={styles.menuText}>Prendre une photo</Text>
                            </TouchableOpacity>

                            <View style={styles.menuSeparator} />

                            <TouchableOpacity style={styles.menuRow}>
                                <Image style={styles.menuIcon} source={require("../../../../../assets/icones/missions/picture.png")} />
                                <Text style={styles.menuText}>Importer une photo</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </Pressable>
                )}
            </View>
        );
    }


    return Content;
}
