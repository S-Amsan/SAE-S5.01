import React, { useEffect, useState, useCallback } from "react";
import {Platform, View, Text, Image, StyleSheet, ScrollView, Pressable,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";

import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";

import point from "../../../../assets/icones/point.png";
import { usePanier } from "../../../../context/PanierContext";

function CartePanier({ produit, onSupprimer }) {
    return (
        <View style={styles.carteProduit}>
            <Image source={{ uri: produit.imageCarte }} style={styles.imageProduit} />

            <View style={styles.contenuCarte}>
                <View style={styles.ligneTitre}>
                    <Text style={styles.titreProduit} numberOfLines={1}>
                        {produit.titre}
                    </Text>

                    <View style={styles.wrapperPoints}>
                        <Text style={styles.points}>{produit.points}</Text>
                        <Image source={point} style={styles.iconePoint} />
                    </View>
                </View>

                <Text style={styles.descriptionProduit} numberOfLines={3}>
                    {produit.description || produit.descriptionLongue}
                </Text>

                <View style={styles.ligneBasCarte}>
                    {produit.quantity > 1 ? (
                        <Text style={styles.quantite}>Quantité : {produit.quantity}</Text>
                    ) : (
                        <View />
                    )}

                    <Pressable
                        onPress={() => onSupprimer(produit.id)}
                        style={styles.boutonSupprimer}
                        hitSlop={8}
                    >
                        <Text style={styles.texteSupprimer}>Supprimer</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default function Index() {
    const onglets = [
        { id: "panier", label: "Mon panier", page: "boutique/panier" },
        { id: "historique", label: "Mes achats", page: "boutique/historique" },
    ];

    const params = useLocalSearchParams();
    const { items, totalPoints, clearCart, removeItem } = usePanier();

    const [afficherAjout, setAfficherAjout] = useState(false);

    useEffect(() => {
        const brut = params?.justAdded;
        const vientDAjouter = Array.isArray(brut) ? brut[0] : brut;

        if (String(vientDAjouter) === "1") {
            setAfficherAjout(true);
        }
    }, [params?.justAdded]);

    useEffect(() => {
        if (items.length === 0) {
            setAfficherAjout(false);
        }
    }, [items.length]);

    const passerCommande = useCallback(() => {
        clearCart();
        setAfficherAjout(false);
    }, [clearCart]);

    const supprimerProduit = useCallback(
        (id) => {
            removeItem(id);
        },
        [removeItem]
    );

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FFFFFF" }}>
            {Platform.OS === "web" && (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            )}

            <View style={{ flex: 1 }}>
                <Header />
                {Platform.OS === "web" && (
                    <TabNavbarWeb onglets={onglets} pageBack={"boutique"} />
                )}

                <ScrollView contentContainerStyle={styles.pagePanier}>
                    {afficherAjout && (
                        <Text style={styles.titreAjout}>✅ Ajouté au panier</Text>
                    )}

                    {items.length === 0 ? (
                        <Text style={styles.panierVide}>Ton panier est vide.</Text>
                    ) : (
                        <View style={styles.grilleProduits}>
                            {items.map((produit) => (
                                <CartePanier
                                    key={String(produit.id)}
                                    produit={produit}
                                    onSupprimer={supprimerProduit}
                                />
                            ))}
                        </View>
                    )}

                    <View style={styles.footerPanier}>
                        <View style={styles.ligneTotal}>
                            <Text style={styles.labelTotal}>Total :</Text>
                            <View style={styles.valeurTotal}>
                                <Text style={styles.totalPoints}>{totalPoints}</Text>
                                <Image source={point} style={styles.iconePointTotal} />
                            </View>
                        </View>

                        <Pressable
                            style={[
                                styles.boutonCommande,
                                items.length === 0 && styles.boutonDesactive,
                            ]}
                            onPress={passerCommande}
                            disabled={items.length === 0}
                        >
                            <LinearGradient
                                colors={["#00DB83", "#0CD8A9"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradientBouton}
                                pointerEvents="none"
                            />
                            <Text style={styles.texteCommande}>Passer la commande</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pagePanier: {
        paddingHorizontal: 40,
        paddingVertical: 24,
    },

    titreAjout: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 18,
    },

    panierVide: {
        fontSize: 16,
        color: "#666",
        marginTop: 12,
    },

    grilleProduits: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 24,
    },

    carteProduit: {
        width: 320,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#EDEDED",
    },

    imageProduit: {
        width: "100%",
        height: 180,
    },

    contenuCarte: {
        padding: 16,
    },

    ligneTitre: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    titreProduit: {
        fontSize: 20,
        fontWeight: "500",
        flex: 1,
        marginRight: 10,
    },

    descriptionProduit: {
        fontSize: 15,
        color: "#666",
        lineHeight: 20,
        marginTop: 6,
    },

    wrapperPoints: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    points: {
        fontSize: 18,
        fontWeight: "500",
        color: "#97D7B8",
    },

    iconePoint: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },

    ligneBasCarte: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 14,
    },

    quantite: {
        fontSize: 14,
        color: "#278674",
        fontWeight: "600",
    },

    boutonSupprimer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#EDEDED",
        backgroundColor: "#FFFFFF",
    },

    texteSupprimer: {
        fontSize: 14,
        fontWeight: "600",
        color: "#C0392B",
    },

    footerPanier: {
        marginTop: 28,
        alignSelf: "flex-end",
        width: 420,
        gap: 14,
    },

    ligneTotal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 10,
    },

    labelTotal: {
        fontSize: 20,
        fontWeight: "600",
        color: "#278674",
    },

    valeurTotal: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    totalPoints: {
        fontSize: 26,
        fontWeight: "700",
        color: "#278674",
    },

    iconePointTotal: {
        width: 26,
        height: 26,
        resizeMode: "contain",
        marginTop: 2,
    },

    boutonCommande: {
        height: 54,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
    },

    texteCommande: {
        color: "#FFFFFF",
        fontWeight: "500",
        fontSize: 20,
        zIndex: 2,
    },

    gradientBouton: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 10,
        zIndex: 1,
    },

    boutonDesactive: {
        opacity: 0.45,
    },
});
