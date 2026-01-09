import {View, Text, ScrollView, StyleSheet, Pressable} from "react-native";
import BlocProduit from "../blocProduit/blocProduit";
import { PRODUITS } from "../../../utils/data/produit";
import { COUPONS } from "../../../utils/data/couponReduction";
import { DONS } from "../../../utils/data/association";
import styles from "./styles/styles";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export default function SectionProduits({ selected, filtreActif, setFiltreActif  }) {
    const estFiltre = selected !== null;
    const montreTout = selected === null;

    const montreCartes = !selected || selected === "cartes";
    const montreCoupons = !selected || selected === "coupons";
    const montreDons = !selected || selected === "dons";

    const LIMITE = 4;

    const produitsAffiches = estFiltre ? PRODUITS : PRODUITS.slice(0, LIMITE);
    const couponsAffiches = estFiltre ? COUPONS : COUPONS.slice(0, LIMITE);
    const donsAffiches = estFiltre ? DONS : DONS.slice(0, LIMITE);

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
                            {PRODUITS.map((p) => (
                                <BlocProduit key={p.id} {...p} style={styles.gridItem} />
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


                    {!estFiltre ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroller}>
                            {couponsAffiches.map((p) => (
                                <BlocProduit key={p.id} {...p} />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.grid}>
                            {COUPONS.map((p) => <BlocProduit key={p.id} {...p} style={styles.gridItem} />)}
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



                    {!estFiltre ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroller}>
                            {donsAffiches.map((p) => (
                                <BlocProduit key={p.id} {...p} />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.grid}>
                            {DONS.map((p) => <BlocProduit key={p.id} {...p} style={styles.gridItem} />)}
                        </View>
                    )}
                </>
            )}
        </View>
    );
}



