import React from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import styles from "./styles";

export default function MissionsPage() {

    const items = [
        {
            id: 1,
            title: "Barbecue",
            address: "96 Av. de La Liberté Tunis",
            distance: "5 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/equip.png"),
        },
        {
            id: 2,
            title: "Équipements maison",
            address: "96 Av. de La Liberté Tunis",
            distance: "13 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/equip.png"),
        },
        {
            id: 7,
            title: "Canapé",
            address: "96 Av. de La Liberté Tunis",
            distance: "18 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/equip.png"),
        },

        {
            id: 3,
            title: "Canapé",
            address: "96 Av. de La Liberté Tunis",
            distance: "18 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/equip.png"),
        },

        {
            id: 6,
            title: "Canapé",
            address: "96 Av. de La Liberté Tunis",
            distance: "18 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/equip.png"),
        },

        {
            id: 5,
            title: "Canapé",
            address: "96 Av. de La Liberté Tunis",
            distance: "18 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/equip.png"),
        },

        {
            id: 4,
            title: "Canapé",
            address: "96 Av. de La Liberté Tunis",
            distance: "18 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/equip.png"),
        },
    ];

    return (
        <View style={styles.page}>

            {/* COLONNE GAUCHE */}
            <View style={styles.left}>
                <Text style={styles.header}>
                    Objets à récupérer autour de vous
                </Text>

                <ScrollView showsVerticalScrollIndicator={true}>
                    {items.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <Image source={item.image} style={styles.image} />

                            <View style={styles.content}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.address}>
                                    📍 {item.address}
                                </Text>
                                <Text style={styles.meta}>
                                    {item.author} • {item.time}
                                </Text>
                            </View>

                            <View style={styles.right}>
                                <Text style={styles.distance}>
                                    {item.distance}
                                </Text>

                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        Voir l’objet
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* COLONNE DROITE */}
            <View style={styles.rightPanel}>
                <InfoCard
                    title="Scanner un QR code et Poster"
                    description="Scanner le QR code sur le produit d’un partenaire puis prenez-le en photo avant de le jeter."
                    button="Commencer"
                />

                <InfoCard
                    title="Objets abandonnés"
                    description="Poster des objets abandonnés afin de leur donner une seconde vie."
                    button="Commencer"
                />
            </View>
        </View>
    );
}

function InfoCard({ title, description, button }) {
    return (
        <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>{title}</Text>
            <Text style={styles.infoDesc}>{description}</Text>

            <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.infoButtonText}>{button}</Text>
            </TouchableOpacity>
        </View>
    );
}
