import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {useRouter} from "expo-router";

export default function BlocProduit({ titre, description, points, image, action, style }) {

    const router = useRouter();

    return (
        <View style={[styles.carte, style]}>
            <TouchableOpacity onPress={() => router.push("./detailsproduit")}>
                <Image source={{ uri: image }} style={styles.image} />

                <View style={styles.contenu}>
                    <View style={styles.ligneTitre}>
                        <Text style={styles.titre}>{titre}</Text>
                        <Text style={styles.points}>{points} pts</Text>
                    </View>

                    <Text style={styles.description}>{description}</Text>

                    <TouchableOpacity style={styles.bouton} onPress={action}>
                        <Text style={styles.texteBouton}>Ajouter au panier</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    carte: {
        width: 280,
        backgroundColor: "#fff",
        marginRight: 94,
        overflow: "hidden",
        borderRadius : 8,

        borderWidth: 2,
        borderColor: "#EDEDED",
        marginBottom : 40,
    },

    contenu: {
        padding: 16,
    },

    image: {
        width: "100%",
        height: 170,
    },

    titre: {
        fontSize: 21,
        fontWeight: "500",
        marginBottom: 6,
    },

    description: {
        fontSize: 15,
        color: "#666",
        lineHeight: 20,
        marginBottom: 15,
    },

    ligneTitre: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },

    points: {
        fontSize: 18,
        fontWeight: "500",
        color: "#97D7B8",
    },

    bouton: {
        backgroundColor: "#07D999",
        paddingVertical: 11,
        borderRadius: 10,
        alignItems: "center",
    },

    texteBouton: {
        color: "white",
        fontWeight: "500",
        fontSize: 14,
    },
});




