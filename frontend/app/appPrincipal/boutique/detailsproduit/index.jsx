import React from "react";
import {Platform, View, Text, Image, Pressable, StyleSheet, ScrollView, ImageBackground} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import HeaderBoutique from "../../../../components/boutique/headerBoutique";

import point from "../../../../assets/icones/point.png";

import styles from "./styles/styles";

export default function DetailProduit() {

    const router = useRouter();
    const params = useLocalSearchParams();

    const titreCourt = params.titre ?? "Produit";
    const titreComplet =
        params.titreComplet ?? `E-carte cadeau ${titreCourt} de 10€`;

    const description =
        params.descriptionLongue ??
        params.description ??
        "Aucune description disponible.";

    const points = params.points ?? "0";

    const imageCarte = params.imageCarte ?? params.image ?? "";
    const imageBanniere = params.banniere ?? params.image ?? "";

    return (
        <View style={styles.racine}>
            {Platform.OS === "web" && (
                <View style={styles.zoneNavbar}>
                    <Navbar />
                </View>
            )}

            <View style={styles.zonePrincipale}>
                <Header />

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
                    <View style={styles.bandeau}>
                        <ImageBackground
                            source={{ uri: imageBanniere }}
                            style={styles.imageBandeau}
                        >
                            <View style={styles.filtreBandeau} />
                            <View style={styles.bandeauBasBlanc} />

                            <View style={styles.headerBoutiqueFlottant}>
                                <HeaderBoutique mode="detail" />
                            </View>

                            <View style={styles.contenuBandeau}>

                                <View style={styles.carteGauche}>
                                    <Image
                                        source={{ uri: imageCarte }}
                                        style={styles.imagePrincipale}
                                    />
                                </View>

                                <View style={[styles.blocDroite, styles.memeTaille]}>

                                    <View style={styles.blocDroiteHaut}>
                                        <Text style={styles.titreProduit}>
                                            {titreComplet}
                                        </Text>

                                        <View style={styles.ligneBadges}>
                                            <View style={styles.badge}>
                                                <Text style={styles.badgeTexte}>
                                                    ✅ En stock
                                                </Text>
                                            </View>
                                            <View style={styles.badge}>
                                                <Text style={styles.badgeTexte}>
                                                    ✅ Téléchargement digital
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.blocDroiteBas}>
                                        <View style={styles.prixCentre}>
                                            <Text style={styles.prixTexte}>
                                                Dès {points}
                                            </Text>
                                            <Image
                                                source={point}
                                                style={styles.iconePoint}
                                            />
                                        </View>

                                        <View style={styles.ligneActions}>
                                            <Pressable style={styles.boutonSecondaire}>
                                                <Text style={styles.boutonSecondaireTexte}>
                                                    ↗
                                                </Text>
                                            </Pressable>

                                            <Pressable style={styles.boutonSecondaire}>
                                                <Text style={styles.boutonSecondaireTexte}>
                                                    ♡
                                                </Text>
                                            </Pressable>

                                            <Pressable style={styles.boutonPrincipal}>
                                                <Text style={styles.boutonPrincipalTexte}>
                                                    Acheter l’offre
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.colonneGauche}>
                            <Text style={styles.sectionTitre}>À propos</Text>

                            <Text style={styles.label}>Description :</Text>
                            <Text style={styles.description}>{description}</Text>

                            <Pressable onPress={() => router.push("../boutique")} style={{ marginTop: 20 }}>
                                <Text style={styles.retour}>← Retour boutique</Text>
                            </Pressable>
                        </View>

                        <View style={styles.colonneDroite}>
                            <View style={styles.ligneInfo}>
                                <Text style={styles.infoLabel}>Compatibilité par pays :</Text>
                                <Text style={styles.infoLien}>Voir la liste</Text>
                            </View>

                            <View style={styles.ligneInfo}>
                                <Text style={styles.infoLabel}>Installation :</Text>
                                <Text style={styles.infoLien}>Comment activer ce produit</Text>
                            </View>

                            <View style={styles.ligneInfo}>
                                <Text style={styles.infoLabel}>Genre :</Text>
                                <Text style={styles.infoLien}>Cartes Cadeau</Text>
                            </View>
                        </View>
                    </View>


                </ScrollView>
            </View>
        </View>
    );
}
