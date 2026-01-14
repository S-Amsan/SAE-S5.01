import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Navbar from "../../../../../components/Navbar";
import Header from "../../../../../components/Header";
import styles from "../../styles/parametresStyle";

export default function SubSectionWebTemplate() {
    const router = useRouter();

    return (
        <View style={styles.page}>
            {/* COLONNE 1 : NAVBAR (STRICTEMENT INCHANGÉE) */}
            <View style={styles.navbar}>
                <Navbar />
                <Header />
            </View>

            {/* COLONNE 2 : CONTENU CENTRAL */}
            <View style={styles.container}>
                {/* Ici on garde TON Header.
                   Si ton Header ne l'affiche pas, le bouton Pressable ci-dessous force le retour.
                */}
                <Header titre="Paramètres" boutonRetour={true} onBack={() => router.back()} />

                <View style={styles.center}>
                    <ScrollView>
                        {/* BOUTON RETOUR MANUEL (Au cas où ton Header ne l'affiche pas sur Web) */}
                        <Pressable
                            onPress={() => router.back()}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: '#eff3f4'
                            }}
                        >
                            <Text style={{ fontSize: 20, marginRight: 10 }}>←</Text>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>Retour aux paramètres</Text>
                        </Pressable>

                        {/* TITRE DE LA PAGE */}
                        <Text style={styles.pageTitle}>Nom de la sous-section</Text>

                        {/* ZONE DE CONTENU (À MODIFIER) */}
                        <View style={{ padding: 20 }}>
                            <View style={styles.settingItem}>
                                <Text style={styles.settingTitle}>Titre du paramètre</Text>
                                <Text style={styles.settingDesc}>
                                    Contenu de ta page ici...
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>

            {/* COLONNE 3 : DROITE (VIDE POUR LE DESIGN) */}
            <View style={styles.right}>
                <ScrollView>
                    <View style={{ padding: 20 }}>
                        <Text style={styles.settingDesc}>
                            Informations complémentaires sur cette section.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}