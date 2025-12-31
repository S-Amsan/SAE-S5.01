import React, { useEffect, useState, useCallback } from "react";
import { Platform, View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";

import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";

import point from "../../../../assets/icones/point.png";
import { usePanier } from "../../../../context/PanierContext";

function CartCard({ item }) {
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
                {item.quantity > 1 && <Text style={styles.qty}>Quantité : {item.quantity}</Text>}
            </View>
        </View>
    );
}

export default function Index() {
    const onglets = [
        { id: "panier", label: "Mon panier", page: "boutique/panier" },
        { id: "historique", label: "Historique", page: "boutique/historique" },
    ];

    const params = useLocalSearchParams();
    const { items, totalPoints, clearCart } = usePanier();

    const [showJustAdded, setShowJustAdded] = useState(false);

    useEffect(() => {
        const raw = params?.justAdded;
        const justAdded = Array.isArray(raw) ? raw[0] : raw;

        if (String(justAdded) === "1") {
            setShowJustAdded(true);
        }
    }, [params?.justAdded]);

    const handleCheckout = useCallback(() => {
        clearCart();
        setShowJustAdded(false);
    }, [clearCart]);

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
                    {showJustAdded && <Text style={styles.addedTitle}>✅ Ajouté au panier</Text>}

                    {items.length === 0 ? (
                        <Text style={styles.empty}>Ton panier est vide.</Text>
                    ) : (
                        <View style={styles.grid}>
                            {items.map((it) => (
                                <CartCard key={String(it.id)} item={it} />
                            ))}
                        </View>
                    )}

                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total :</Text>
                            <View style={styles.totalValue}>
                                <Text style={styles.totalPoints}>{totalPoints}</Text>
                                <Image source={point} style={styles.totalPointIcon} />
                            </View>
                        </View>

                        <Pressable
                            style={[styles.checkoutButton, items.length === 0 && styles.checkoutDisabled]}
                            onPress={handleCheckout}
                            disabled={items.length === 0}
                        >
                            <LinearGradient
                                colors={["#00DB83", "#0CD8A9"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.boutonGradient}
                                pointerEvents="none"
                            />
                            <Text style={styles.checkoutText}>Passer la commande</Text>
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
        paddingVertical: 24,
    },

    addedTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 18,
    },

    empty: {
        fontSize: 16,
        color: "#666",
        marginTop: 12,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 24,
    },

    carte: {
        width: 320,
        backgroundColor: "#fff",
        overflow: "hidden",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#EDEDED",
    },

    contenu: {
        padding: 16,
    },

    image: {
        width: "100%",
        height: 180,
    },

    titre: {
        fontSize: 20,
        fontWeight: "500",
    },

    description: {
        fontSize: 15,
        color: "#666",
        lineHeight: 20,
        marginTop: 6,
    },

    qty: {
        fontSize: 14,
        color: "#278674",
        marginTop: 10,
        fontWeight: "600",
    },

    ligneTitre: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    pointsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    points: {
        fontSize: 18,
        fontWeight: "500",
        color: "#97D7B8",
    },

    pointIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },

    footer: {
        marginTop: 28,
        alignSelf: "flex-end",
        width: 420,
        gap: 14,
    },

    totalRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 10,
    },

    totalLabel: {
        fontSize: 20,
        fontWeight: "600",
        color: "#278674",
    },

    totalValue: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    totalPoints: {
        fontSize: 26,
        fontWeight: "700",
        color: "#278674",
    },

    totalPointIcon: {
        width: 26,
        height: 26,
        resizeMode: "contain",
        marginTop: 2,
    },

    checkoutButton: {
        height: 54,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
    },

    checkoutText: {
        color: "#FFFFFF",
        fontWeight: "500",
        fontSize: 20,
        zIndex: 2,
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

    checkoutDisabled: {
        opacity: 0.45,
    },
});
