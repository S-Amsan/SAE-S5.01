import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import point from "../../assets/icones/point.png";

export default function HeaderBoutique({ filtreActif, setFiltreActif, mode = "complet" }) {
    const router = useRouter();

    return (
        <View style={styles.conteneur}>
            {mode === "complet" && (
                <View style={styles.gauche}>
                    <Pressable style={[styles.boutonFiltre, filtreActif === "cartes" && styles.boutonFiltreActif]}
                               onPress={() => setFiltreActif(filtreActif === "cartes" ? null : "cartes")}
                    >
                        <Text style={[styles.texteFiltre, filtreActif === "cartes" && styles.texteFiltreActif]}>
                            Cartes cadeaux
                        </Text>
                    </Pressable>

                    <Pressable style={[styles.boutonFiltre, filtreActif === "coupons" && styles.boutonFiltreActif]}
                               onPress={() => setFiltreActif(filtreActif === "coupons" ? null : "coupons")}
                    >
                        <Text style={[styles.texteFiltre, filtreActif === "coupons" && styles.texteFiltreActif]}>
                            Bons de réduction
                        </Text>
                    </Pressable>

                    <Pressable style={[styles.boutonFiltre, filtreActif === "dons" && styles.boutonFiltreActif]}
                               onPress={() => setFiltreActif(filtreActif === "dons" ? null : "dons")}
                    >
                        <Text style={[styles.texteFiltre, filtreActif === "dons" && styles.texteFiltreActif]}>
                            Dons aux associations
                        </Text>
                    </Pressable>
                </View>
            )}

            <View style={styles.droite}>
                <Pressable style={styles.boutonPanier} onPress={() => router.push("./panier")}>
                    <Image style={styles.iconePanier} source={{uri: "https://cdn-icons-png.flaticon.com/512/2662/2662459.png",}}/>
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

const styles = StyleSheet.create({
    conteneur: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 16,
    },

    gauche: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginLeft: 9,
    },

    boutonFiltre: {
        backgroundColor: "#FFFFFF",
        borderRadius: 35,
        paddingHorizontal: 24,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EDEDED",
    },

    texteFiltre: {
        fontSize: 20,
        color: "#278674",
        fontWeight: "600",
    },

    boutonFiltreActif: {
        backgroundColor: "#E9FBF4",
        borderColor: "#04DA90",
    },

    texteFiltreActif: {
        color: "#04DA90",
    },

    droite: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginRight: 20,
    },

    boutonPanier: {
        width: 84,
        height: 60,
        borderRadius: 35,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#EDEDED",
    },

    iconePanier: {
        width: 36,
        height: 36,
        resizeMode: "contain",
    },

    blocPoints: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 35,
        paddingHorizontal: 24,
        height: 60,
        borderWidth: 1,
        gap : 8,
        borderColor: "#EDEDED",
    },

    pointsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    textePoints: {
        fontSize: 20,
        color: "#278674",
        fontWeight: "600",
    },

    valeurPoints: {
        fontSize: 20,
        color: "#278674",
        fontWeight: "600",
    },

    pointIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        marginTop: 2,
    },

});
