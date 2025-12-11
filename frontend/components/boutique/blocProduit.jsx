import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {useRouter} from "expo-router";

export default function BlocProduit({ titre, description, points, image, action }) {

    const router = useRouter();

    return (
        <View style={styles.carte}>
            <TouchableOpacity style={styles.contenu} onPress={() => router.push("./boutique/detailsproduit")}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={styles.titre}>{titre}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.points}>{points} pts</Text>
                <TouchableOpacity style={styles.bouton} onPress={action}>
                    <Text style={styles.texteBouton}>Ajouter au panier</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    carte: {
        width: 220,
        backgroundColor: "white",
        borderRadius: 12,
        marginRight: 16,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: 120
    },
    contenu: {
        padding: 12
    },
    titre: {
        fontSize: 18,
        fontWeight: "600"
    },
    description: {
        fontSize: 13,
        color: "#555",
        marginBottom: 10
    },
    points: {
        fontSize: 14,
        fontWeight: "600",
        color: "#00b894",
        marginBottom: 10
    },
    bouton: {
        backgroundColor: "#00c48c",
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center"
    },
    texteBouton: {
        color: "white",
        fontWeight: "600"
    }
});
