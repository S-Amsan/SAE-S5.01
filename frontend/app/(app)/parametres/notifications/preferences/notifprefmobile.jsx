import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Header from "../../../../../components/Header"; // Ajuste le nombre de ../ selon la profondeur
import styles from "../../styles/parametresStyle";

export default function SubSectionMobileTemplate() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* HEADER : Garde le même style, affiche le titre et gère le retour */}
            <Header
                titre="Nom de la Sous-Section" // <--- À CHANGER POUR CHAQUE PAGE
                boutonRetour={true}
                onBack={() => router.back()}
            />

            <ScrollView style={styles.center}>
                <View style={{ paddingVertical: 10 }}>

                    {/* TITRE DE LA PAGE DANS LE CONTENU (Optionnel) */}
                    <Text style={styles.pageTitle}>Détails du paramètre</Text>

                    {/* ZONE DE CONTENU : C'est ici que tu mets tes formulaires, textes, etc. */}
                    <View style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Option 1</Text>
                        <Text style={styles.settingDesc}>
                            Ici, tu peux mettre tes inputs ou tes descriptions spécifiques.
                        </Text>
                    </View>

                    {/* Tu peux ajouter d'autres blocs comme celui-ci */}
                    <View style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Option 2</Text>
                        <Text style={styles.settingDesc}>
                            Exemple de contenu supplémentaire.
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}