import {View, Text, ScrollView, StyleSheet, Pressable} from "react-native";
import BlocProduit from "../blocProduit/blocProduit";
import { PRODUITS } from "../../../utils/data/produit";
import { COUPONS } from "../../../utils/data/couponReduction";
import { DONS } from "../../../utils/data/association";
import styles from "./styles/styles";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export default function SectionProduits({ selected }) {
    const estFiltre = selected !== null;
    const montreTout = selected === null;

    const montreCartes = !selected || selected === "cartes";
    const montreCoupons = !selected || selected === "coupons";
    const montreDons = !selected || selected === "dons";

    return (
        <View style={styles.section}>
            {montreCartes && (
                <>
                    <View style={{flexDirection : "row", alignItems: "center", marginBottom: 12}}>
                        <Text style={styles.lien}>Cartes Cadeaux </Text>
                        <Ionicons name="chevron-forward" size={21} style={styles.flecheMobile} />
                    </View>

                    {!estFiltre ? (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.scroller}
                        >
                            {PRODUITS.map((p) => (
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
                    <View style={{flexDirection : "row", alignItems: "center", marginBottom: 12}}>
                        <Text style={styles.lien}>Bons de réduction </Text>
                        <Ionicons name="chevron-forward" size={21} style={styles.flecheMobile} />
                    </View>

                    {!estFiltre ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroller}>
                            {COUPONS.map((p) => <BlocProduit key={p.id} {...p} />)}
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
                    <View style={{flexDirection : "row", alignItems: "center", marginBottom: 12}}>
                        <Text style={styles.lien}>Dons aux associations </Text>
                        <Ionicons name="chevron-forward" size={21} style={styles.flecheMobile} />
                    </View>


                    {!estFiltre ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroller}>
                            {DONS.map((p) => <BlocProduit key={p.id} {...p} />)}
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



