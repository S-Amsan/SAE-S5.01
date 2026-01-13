import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Navbar from "../../../../../components/Navbar"; // Ajuste le nombre de ../ selon le dossier
import Header from "../../../../../components/Header";
import styles from "../../styles/parametresStyle"; // Chemin vers ton fichier style

export default function SubSectionWebTemplate() {
    const router = useRouter();

    return (
        <View style={styles.page}>
            {/* COLONNE 1 : NAVBAR (Inchangée) */}
            <View style={styles.navbar}>
                <Navbar />
                <Header />
            </View>

            {/* COLONNE 2 : CONTENU CENTRAL */}
            <View style={styles.container}>
                {/* HEADER AVEC BOUTON RETOUR */}
                <Header
                    titre="Retour"
                    boutonRetour={true}
                    onBack={() => router.back()}
                />

                <View style={styles.center}>
                    <ScrollView>
                        {/* TITRE DE LA PAGE */}
                        <Text style={styles.pageTitle}>Nom de la sous-section</Text>

                        {/* ZONE DE CONTENU - Change ce qu'il y a ici */}
                        <View style={{ padding: 20 }}>
                            <View style={styles.settingItem}>
                                <Text style={styles.settingTitle}>Titre du paramètre</Text>
                                <Text style={styles.settingDesc}>
                                    Description ou formulaire à insérer ici.
                                </Text>
                            </View>

                            {/* Exemple de bouton d'action ou autre contenu */}
                            <Pressable style={[styles.settingItem, { marginTop: 20, backgroundColor: '#f7f9f9', borderRadius: 10 }]}>
                                <Text style={{ color: '#1d9bf0', fontWeight: 'bold' }}>Action spécifique</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </View>

            {/* COLONNE 3 : ESPACE DROIT (Garde l'équilibre visuel Web) */}
            <View style={styles.right}>
                <View style={{ padding: 20 }}>
                    <Text style={[styles.settingDesc, { fontStyle: 'italic' }]}>
                        Aide : Les modifications apportées ici sont appliquées instantanément à votre compte.
                    </Text>
                </View>
            </View>
        </View>
    );
}