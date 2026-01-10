import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import styles from "./styles/styles";
import point from "../../../assets/icones/point.png";
import { usePanier } from "../../../context/PanierContext";

export default function BlocProduit({
                                        id,
                                        titre,
                                        titreComplet,
                                        description,
                                        descriptionLongue,
                                        points,
                                        imageCarte,
                                        banniere,
                                        type,
                                        style
                                    }) {
    const router = useRouter();
    const { estFavori } = usePanier();

    const favori = typeof estFavori === "function" ? estFavori(id) : false;

    const ouvrirDetails = () => {
        router.push({
            pathname: "/appPrincipal/boutique/detailsproduit",
            params: {
                id,
                titre,
                titreComplet,
                description,
                descriptionLongue,
                points: String(points),
                imageCarte,
                banniere,
                type,
            },
        });
    };

    return (
        <View style={[styles.carte, style]}>
            <TouchableOpacity onPress={ouvrirDetails}>
                <Image source={{ uri: imageCarte }} style={styles.image} />

                {Platform.OS !== "web" ? (
                    <View style={styles.contenu}>
                        <View>
                            <Text style={styles.titre}>
                                {titre}{favori ? " ❤️" : ""}
                            </Text>
                            <Text style={styles.description}>{description}</Text>
                        </View>

                        <View style={styles.prixWrapper}>
                            <Text style={styles.points}>{points} </Text>
                            <Image source={point} style={styles.pointIcon} />
                        </View>
                    </View>
                ) : (
                    <View style={styles.contenu}>
                        <View style={styles.ligneTitre}>
                            <Text style={styles.titre}>
                                {titre}{favori ? " ❤️" : ""}
                            </Text>

                            <View style={styles.pointsWrapper}>
                                <Text style={styles.points}>{points}</Text>
                                <Image source={point} style={styles.pointIcon} />
                            </View>
                        </View>

                        <Text style={styles.description}>{description}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}
