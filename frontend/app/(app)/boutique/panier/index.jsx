import React, { useCallback, useEffect } from "react";
import { Platform, View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";

import point from "../../../../assets/icones/point.png";
import { usePanier } from "../../../../context/PanierContext";

function CartePanier({ item, onSupprimer }) {
    return (
        <View style={styles.carte}>
            <Image source={{ uri: item.imageCarte }} style={styles.image} />

            <View style={styles.contenu}>
                <View style={styles.ligneTitre}>
                    <Text style={styles.titre}>{item.titre}</Text>

                    <View style={styles.pointsWrapper}>
                        <Text style={styles.points}>{item.points}</Text>
                        <Image source={point} style={styles.pointIcon} />
                    </View>
                </View>

                <Text style={styles.description}>{item.description || item.descriptionLongue}</Text>

                <View style={styles.ligneBasCarte}>
                    <Text style={styles.texteQuantite}>
                        Quantité : <Text style={styles.texteQuantiteValeur}>{item.quantity}</Text>
                    </Text>

                    <Pressable style={styles.boutonSupprimer} onPress={() => onSupprimer(item.id)}>
                        <Text style={styles.texteBoutonSupprimer}>Supprimer</Text>
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

    const {
        articles,
        totalPoints,
        pointsUtilisateur,
        afficherTitreAjoute,
        setAfficherTitreAjoute,
        decrementerDuPanier,
        passerCommande,
    } = usePanier();

    const peutCommander = articles.length > 0 && Number(pointsUtilisateur) >= Number(totalPoints);

    useEffect(() => {
        if (articles.length === 0) setAfficherTitreAjoute(false);
    }, [articles.length, setAfficherTitreAjoute]);

    const handleCommande = useCallback(() => {
        const ok = passerCommande();
        if (ok) setAfficherTitreAjoute(false);
    }, [passerCommande, setAfficherTitreAjoute]);

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FFFFFF" }}>
            {Platform.OS === "web" && (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            )}

            <View style={{ flex: 1 }}>
                <Header />
                {Platform.OS === "web" && <TabNavbarWeb onglets={onglets} pageBack={"boutique"} />}

                <ScrollView contentContainerStyle={styles.page}>
                    {afficherTitreAjoute && articles.length > 0 && (
                        <Text style={styles.titreAjoute}>✅ Ajouté au panier</Text>
                    )}

                    {articles.length === 0 ? (
                        <Text style={styles.vide}>Ton panier est vide.</Text>
                    ) : (
                        <View style={styles.grille}>
                            {articles.map((it) => (
                                <CartePanier key={String(it.id)} item={it} onSupprimer={decrementerDuPanier} />
                            ))}
                        </View>
                    )}

                    <View style={styles.footer}>
                        <View style={styles.ligneTotal}>
                            <Text style={styles.totalLabel}>Total :</Text>
                            <View style={styles.totalValeur}>
                                <Text style={styles.totalPoints}>{totalPoints}</Text>
                                <Image source={point} style={styles.totalPointIcon} />
                            </View>
                        </View>

                        <Pressable
                            style={[styles.boutonCommande, (!peutCommander) && styles.boutonCommandeDisabled]}
                            onPress={handleCommande}
                            disabled={!peutCommander}
                        >
                            <LinearGradient
                                colors={["#00DB83", "#0CD8A9"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.boutonGradient}
                                pointerEvents="none"
                            />
                            <Text style={styles.texteCommande} selectable={false}>Passer la commande</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    page: {
        paddingHorizontal: 40,
        paddingVertical: 24
    },

    titreAjoute: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 18
    },

    vide: {
        fontSize: 16,
        color: "#666",
        marginTop: 12
    },

    grille: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 24
    },

    carte: {
        width: 360,
        backgroundColor: "#fff",
        overflow: "hidden",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#EDEDED",
    },

    image: {
        width: "100%",
        height: 190
    },

    contenu: {
        padding: 16
    },

    ligneTitre: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    titre: {
        fontSize: 20,
        fontWeight: "600",
        maxWidth: 220
    },

    description: {
        fontSize: 15,
        color: "#666",
        lineHeight: 20,
        marginTop: 6
    },

    pointsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },

    points: {
        fontSize: 18,
        fontWeight: "600",
        color: "#97D7B8"
    },

    pointIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },

    ligneBasCarte: {
        marginTop: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },

    texteQuantite: {
        fontSize: 14,
        color: "#278674",
        fontWeight: "600"
    },

    texteQuantiteValeur: {
        fontSize: 16,
        fontWeight: "800",
        color: "#278674"
    },

    boutonSupprimer: {
        height: 34,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F2F2F2",
    },

    texteBoutonSupprimer: {
        fontSize: 14,
        fontWeight: "700",
        color: "#222"
    },

    footer: {
        marginTop: 28,
        alignSelf: "flex-end",
        width: 420,
        gap: 14
    },

    ligneTotal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 10
    },

    totalLabel: {
        fontSize: 20,
        fontWeight: "700",
        color: "#278674"
    },

    totalValeur: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    totalPoints: {
        fontSize: 26,
        fontWeight: "800",
        color: "#278674"
    },

    totalPointIcon: {
        width: 26,
        height: 26,
        resizeMode: "contain",
        marginTop: 2
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
        fontWeight: "600",
        fontSize: 20,
        zIndex: 2
    },

    boutonGradient: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 10,
        zIndex: 1,
    },

    boutonCommandeDisabled: {
        opacity: 0.45
    },
});
