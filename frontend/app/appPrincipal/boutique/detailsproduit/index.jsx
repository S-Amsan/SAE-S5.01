import React, { useCallback } from "react";
import {Platform, View, Text, Image, Pressable, StyleSheet, ScrollView, ImageBackground,} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { usePanier } from "../../../../context/PanierContext.js";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import HeaderBoutique from "../../../../components/boutique/headerBoutique";

import point from "../../../../assets/icones/point.png";
import partage from "../../../../assets/icones/boutique/partage.png";
import coeur from "../../../../assets/icones/boutique/coeur.png";

import styles from "./styles/styles";

export default function DetailProduit() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { addItem } = usePanier();

    const id = params.id ?? "";
    const titreCourt = params.titre ?? "Produit";
    const titreComplet = params.titreComplet ?? `E-carte cadeau ${titreCourt} de 10€`;
    const description = params.descriptionLongue ?? params.description ?? "Aucune description disponible.";
    const points = params.points ?? "0";
    const imageCarte = params.imageCarte ?? params.image ?? "";
    const imageBanniere = params.banniere ?? params.image ?? "";
    const type = params.type ?? "cartes";

    const handleAddToCart = useCallback(() => {
        addItem({
            id: String(id),
            titre: String(titreCourt),
            titreComplet: String(titreComplet),
            description: String(params.description ?? ""),
            descriptionLongue: String(description),
            points: Number(points),
            imageCarte: String(imageCarte),
            banniere: String(imageBanniere),
            type: String(type),
            quantity: 1,
        });

        router.push({
            pathname: "/appPrincipal/boutique/panier",
            params: { justAdded: "1" },
        });

    }, [addItem, id, titreCourt, titreComplet, params.description, description, points, imageCarte, imageBanniere, type, router]);

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
                        <View style={styles.bandeauImageLayer}>
                            <ImageBackground source={{ uri: imageBanniere }} style={styles.imageBandeau}>
                                <View style={styles.filtreBandeau} />

                                <View style={styles.zoneFlou} pointerEvents="none">
                                    <BlurView intensity={35} style={StyleSheet.absoluteFillObject} />
                                    <LinearGradient
                                        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.25)", "rgba(255,255,255,1)"]}
                                        locations={[0, 0.65, 1]}
                                        style={StyleSheet.absoluteFillObject}
                                    />
                                </View>

                                <View style={styles.bandeauBasBlanc} />
                            </ImageBackground>
                        </View>

                        <View style={styles.bandeauOverlay}>
                            <View style={styles.headerBoutiqueFlottant}>
                                <HeaderBoutique mode="detail" />
                            </View>

                            <View style={styles.contenuBandeau}>
                                <View style={styles.carteGauche}>
                                    <Image source={{ uri: imageCarte }} style={styles.imagePrincipale} />
                                </View>

                                <View style={[styles.blocDroite, styles.memeTaille]}>
                                    <View style={styles.blocDroiteHaut}>
                                        <BlurView intensity={30} tint="dark" style={styles.blurFond} />
                                        <View style={styles.overlayFond} />

                                        <View style={styles.blocDroiteHautContenu}>
                                            <Text style={styles.titreProduit}>{titreComplet}</Text>

                                            <View style={styles.badgesBar}>
                                                <View style={styles.badgeItem}>
                                                    <Text style={styles.badgeIcon}>✅</Text>
                                                    <Text style={styles.badgeText}>En stock</Text>
                                                </View>

                                                <View style={styles.badgeDivider} />

                                                <View style={styles.badgeItem}>
                                                    <Text style={styles.badgeIcon}>✅</Text>
                                                    <Text style={styles.badgeText}>Téléchargement digital</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.blocDroiteBas}>
                                        <View style={styles.prixCentre}>
                                            <Text style={styles.prixTexte}>Dès {points}</Text>
                                            <Image source={point} style={styles.iconePoint} />
                                        </View>

                                        <View style={styles.ligneActions}>
                                            <Pressable style={styles.boutonSecondaire}>
                                                <LinearGradient
                                                    colors={["#00DB83", "#0CD8A9"]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={styles.boutonGradient}
                                                    pointerEvents="none"
                                                />
                                                <Image source={partage} style={styles.boutonSecondaireIcon} resizeMode="contain" />
                                            </Pressable>

                                            <Pressable style={styles.boutonSecondaire}>
                                                <LinearGradient
                                                    colors={["#00DB83", "#0CD8A9"]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={styles.boutonGradient}
                                                    pointerEvents="none"
                                                />
                                                <Image source={coeur} style={styles.boutonSecondaireIcon} resizeMode="contain" />
                                            </Pressable>

                                            <Pressable
                                                style={[styles.boutonPrincipal, Platform.OS === "web" && webNoSelect.noSelect]}
                                                onPress={handleAddToCart}
                                            >
                                                <LinearGradient
                                                    colors={["#00DB83", "#0CD8A9"]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={styles.boutonGradient}
                                                    pointerEvents="none"
                                                />
                                                <Text style={[styles.boutonPrincipalTexte, Platform.OS === "web" && webNoSelect.noSelect]}>
                                                    Ajouter au panier
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
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

const webNoSelect = StyleSheet.create({
    noSelect: {
        userSelect: "none",
    },
});
