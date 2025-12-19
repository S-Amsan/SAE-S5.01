import {View, Text, ScrollView, StyleSheet, Pressable} from "react-native";
import BlocProduit from "./blocProduit";
import { PRODUITS } from "../../utils/data/produit";
import { COUPONS } from "../../utils/data/couponReduction";
import { DONS } from "../../utils/data/association";

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
                    <Text style={styles.lien}>Cartes Cadeaux &gt;</Text>

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
                    <Text style={styles.lien}>Bons de réduction &gt;</Text>

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
                    <Text style={styles.lien}>Dons aux associations &gt;</Text>

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

const styles = StyleSheet.create({
    section: { marginLeft: 36 },

    lien: {
        color: "#000",
        fontFamily: "Inter",
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 18,
    },

    scroller: {
        paddingHorizontal: 16,
        paddingBottom: 6,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 32,
        paddingHorizontal: 16,
    },

    gridItem: {
        width: "22.5%",
        marginRight: 0,
        marginBottom: 0,
    },

});


