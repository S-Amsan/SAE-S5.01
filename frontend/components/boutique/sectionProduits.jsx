import {View, Text, ScrollView, StyleSheet, Pressable} from "react-native";
import BlocProduit from "./blocProduit";
import { PRODUITS } from "../../utils/data/produit";

export default function SectionProduits() {
    return (
        <View style={styles.section}>
            <View style={styles.entete}>
                <Text style={styles.titre}>Cartes Cadeaux</Text>

                <Pressable nPress={() => router.push("./boutique/touslesProduits")}>
                    <Text style={styles.lien}>Voir tout ></Text>
                </Pressable>

            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {PRODUITS.map((p) => (
                    <BlocProduit
                        key={p.id}
                        titre={p.titre}
                        description={p.description}
                        points={p.points}
                        image={p.image}
                        action={() => console.log("Ajout :", p.titre)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 20
    },
    entete: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    titre: {
        fontSize: 20,
        fontWeight: "700"
    },
    lien: {
        color: "#000000",
        fontSize: 16,
        fontWeight : "bold"
    }
});
