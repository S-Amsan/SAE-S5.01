import {View, Text, ScrollView, StyleSheet, Pressable, TextInput} from "react-native";
import BlocProduit from "../blocProduit/blocProduit";
import { PRODUITS } from "../../../utils/data/produit";
import { COUPONS } from "../../../utils/data/couponReduction";
import { DONS } from "../../../utils/data/association";
import styles from "./styles/styles";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export default function SectionProduits({ selected, filtreActif, setFiltreActif, recherche, setRecherche }) {
    const estFiltre = selected !== null;
    const montreTout = selected === null;

    const montreCartes = !selected || selected === "cartes";
    const montreCoupons = !selected || selected === "coupons";
    const montreDons = !selected || selected === "dons";

    const r = (recherche ?? "").trim().toLowerCase();

    const filtrerParNom = (liste) => {
        if (!r) return liste;
        return liste.filter((p) => {
            const t1 = String(p.titre ?? "").toLowerCase();
            const t2 = String(p.titreComplet ?? "").toLowerCase();
            return t1.includes(r) || t2.includes(r);
        });
    };

    const produitsAffiches = estFiltre ? filtrerParNom(PRODUITS) : PRODUITS.slice(0, 4);
    const couponsAffiches  = estFiltre ? filtrerParNom(COUPONS)  : COUPONS.slice(0, 4);
    const donsAffiches     = estFiltre ? filtrerParNom(DONS)     : DONS.slice(0, 4);


    const toggleFiltre = (val) => setFiltreActif(filtreActif === val ? null : val);

    return (
        <View style={styles.section}>
            {montreCartes && (
                <>
                    <View style={styles.flecheMobile}>
                        <Text style={styles.lien}>Cartes Cadeaux </Text>

                        <Pressable onPress={() => toggleFiltre("cartes")} hitSlop={10}>
                            <Ionicons name="chevron-forward" size={23} style={styles.iconeChevron} />
                        </Pressable>
                    </View>

                    {estFiltre && (
                        <View style={styles.rechercheWrapper}>
                            <Ionicons
                                name="search"
                                size={20}
                                color="#8E8E93"
                                style={styles.iconeRecherche}
                            />

                            <TextInput
                                value={recherche}
                                onChangeText={setRecherche}
                                placeholder="Rechercher un produit"
                                placeholderTextColor="#8E8E93"
                                style={styles.rechercheInput}
                            />
                        </View>
                    )}

                    {!estFiltre ? (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.scroller}
                        >
                            {produitsAffiches.map((p) => (
                                <BlocProduit key={p.id} {...p} />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.grid}>
                            {produitsAffiches.map((p, i) => (
                                <BlocProduit key={`${p.id}-${i}`} {...p} style={styles.gridItem} />
                            ))}
                        </View>
                    )}
                </>
            )}

            {montreCoupons && (
                <>
                    <View style={styles.flecheMobile}>
                        <Text style={styles.lien}>Bons de réduction </Text>

                        <Pressable onPress={() => toggleFiltre("coupons")} hitSlop={10}>
                            <Ionicons name="chevron-forward" size={23} style={styles.iconeChevron} />
                        </Pressable>
                    </View>

                    {estFiltre && (
                        <View style={styles.rechercheWrapper}>
                            <Ionicons
                                name="search"
                                size={20}
                                color="#8E8E93"
                                style={styles.iconeRecherche}
                            />

                            <TextInput
                                value={recherche}
                                onChangeText={setRecherche}
                                placeholder="Rechercher un bon de réduction"
                                placeholderTextColor="#8E8E93"
                                style={styles.rechercheInput}
                            />
                        </View>
                    )}


                    {!estFiltre ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroller}>
                            {couponsAffiches.map((p) => (
                                <BlocProduit key={p.id} {...p} />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.grid}>
                            {couponsAffiches.map((p, i) => (
                                <BlocProduit key={`${p.id}-${i}`} {...p} style={styles.gridItem} />
                            ))}
                        </View>
                    )}
                </>
            )}

            {montreDons && (
                <>
                    <View style={styles.flecheMobile}>
                        <Text style={styles.lien}>Dons aux associations </Text>

                        <Pressable onPress={() => toggleFiltre("dons")} hitSlop={10}>
                            <Ionicons name="chevron-forward" size={23} style={styles.iconeChevron} />
                        </Pressable>
                    </View>

                    {estFiltre && (
                        <View style={styles.rechercheWrapper}>
                            <Ionicons
                                name="search"
                                size={20}
                                color="#8E8E93"
                                style={styles.iconeRecherche}
                            />

                            <TextInput
                                value={recherche}
                                onChangeText={setRecherche}
                                placeholder="Rechercher une association"
                                placeholderTextColor="#8E8E93"
                                style={styles.rechercheInput}
                            />
                        </View>
                    )}

                    {!estFiltre ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroller}>
                            {donsAffiches.map((p) => (
                                <BlocProduit key={p.id} {...p} />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.grid}>
                            {donsAffiches.map((p, i) => (
                                <BlocProduit key={`${p.id}-${i}`} {...p} style={styles.gridItem} />
                            ))}
                        </View>
                    )}
                </>
            )}
        </View>
    );
}



