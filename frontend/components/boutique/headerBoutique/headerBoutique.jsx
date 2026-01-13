import { Pressable, View, Text, Image, Platform, ScrollView } from "react-native";
import { useRouter, usePathname } from "expo-router";
import point from "../../../assets/icones/point.png";
import { usePanier } from "../../../context/PanierContext";
import styles from "./styles/styles";

export default function HeaderBoutique({ filtreActif, setFiltreActif, mode = "complet" }) {
    const router = useRouter();
    const pathname = usePathname();
    const { nombreProduits } = usePanier();

    const ongletActif = pathname?.includes("historique") ? "achats" : "catalogue";

    if (Platform.OS !== "web") {
        return (
            <View style={styles.conteneurMobile}>
                <View style={styles.onglets}>
                    <Pressable
                        style={[styles.onglet, ongletActif === "catalogue" && styles.ongletActif]}
                        onPress={() => router.push("boutique")}
                    >
                        <Text style={[styles.texteOnglet, ongletActif === "catalogue" && styles.texteOngletActif]}>
                            Catalogue
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.onglet, ongletActif === "achats" && styles.ongletActif]}
                        onPress={() => router.push("boutique/historique")}
                    >
                        <Text style={[styles.texteOnglet, ongletActif === "achats" && styles.texteOngletActif]}>
                            Mes achats
                        </Text>
                    </Pressable>
                </View>

                {mode === "complet" && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.ligneFiltresMobile}
                    >
                        <Pressable
                            style={[styles.chip, filtreActif === "cartes" && styles.chipActif]}
                            onPress={() => setFiltreActif(filtreActif === "cartes" ? null : "cartes")}
                        >
                            <Text style={[styles.texteChip, filtreActif === "cartes" && styles.texteChipActif]}>
                                Cartes cadeaux
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[styles.chip, filtreActif === "coupons" && styles.chipActif]}
                            onPress={() => setFiltreActif(filtreActif === "coupons" ? null : "coupons")}
                        >
                            <Text style={[styles.texteChip, filtreActif === "coupons" && styles.texteChipActif]}>
                                Bons de réduction
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[styles.chip, filtreActif === "dons" && styles.chipActif]}
                            onPress={() => setFiltreActif(filtreActif === "dons" ? null : "dons")}
                        >
                            <Text style={[styles.texteChip, filtreActif === "dons" && styles.texteChipActif]}>
                                Dons aux assos
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[styles.chip, filtreActif === "favoris" && styles.chipActif]}
                            onPress={() => setFiltreActif(filtreActif === "favoris" ? null : "favoris")}
                        >
                            <Text style={[styles.texteChip, filtreActif === "favoris" && styles.texteChipActif]}>
                                Favoris
                            </Text>
                        </Pressable>
                    </ScrollView>
                )}
            </View>
        );
    }

    return (
        <View style={styles.conteneur}>
            {mode === "complet" && (
                <View style={styles.gauche}>
                    <Pressable
                        style={[styles.boutonFiltre, filtreActif === "cartes" && styles.boutonFiltreActif]}
                        onPress={() => setFiltreActif(filtreActif === "cartes" ? null : "cartes")}
                    >
                        <Text style={[styles.texteFiltre, filtreActif === "cartes" && styles.texteFiltreActif]}>
                            Cartes cadeaux
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.boutonFiltre, filtreActif === "coupons" && styles.boutonFiltreActif]}
                        onPress={() => setFiltreActif(filtreActif === "coupons" ? null : "coupons")}
                    >
                        <Text style={[styles.texteFiltre, filtreActif === "coupons" && styles.texteFiltreActif]}>
                            Bons de réduction
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.boutonFiltre, filtreActif === "dons" && styles.boutonFiltreActif]}
                        onPress={() => setFiltreActif(filtreActif === "dons" ? null : "dons")}
                    >
                        <Text style={[styles.texteFiltre, filtreActif === "dons" && styles.texteFiltreActif]}>
                            Dons aux associations
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.boutonFiltre, filtreActif === "favoris" && styles.boutonFiltreActif]}
                        onPress={() => setFiltreActif(filtreActif === "favoris" ? null : "favoris")}
                    >
                        <Text style={[styles.texteFiltre, filtreActif === "favoris" && styles.texteFiltreActif]}>
                            Favoris
                        </Text>
                    </Pressable>
                </View>
            )}

            <View style={styles.droite}>
                <Pressable style={styles.boutonPanier} onPress={() => router.push("./panier")}>
                    <Image
                        style={styles.iconePanier}
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/2662/2662459.png" }}
                    />
                    {nombreProduits > 0 && (
                        <View style={styles.badgePanier}>
                            <Text style={styles.badgePanierTexte}>
                                {nombreProduits > 99 ? "99+" : String(nombreProduits)}
                            </Text>
                        </View>
                    )}
                </Pressable>

                <View style={styles.blocPoints}>
                    <Text style={styles.textePoints}>Solde de points :</Text>
                    <View style={styles.pointsWrapper}>
                        <Text style={styles.valeurPoints}>150k</Text>
                        <Image source={point} style={styles.pointIcon} />
                    </View>
                </View>
            </View>
        </View>
    );
}
