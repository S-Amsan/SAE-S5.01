import React, {useState} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, Pressable} from "react-native";
import styles from "./styles/styles";

export default function Gestes() {
    const partenaires = [
        {
            id: "ratp",
            name: "RATP",
            title: "Associer votre abonnement Ratp à Ecoception",
            status: "pending", // pending | validated | start
            logo: require("../../../../../assets/icones/missions/ratp.png"),
            points: "+50 000",
        },
        {
            id: "velib",
            name: "Vélib",
            title: "Associer votre abonnement Vélib à Ecoception",
            status: "validated",
            logo: require("../../../../../assets/icones/missions/velib.png"),
            points: "+50 000",
            active: true,
        },
        {
            id: "nous",
            name: "Nous anti-gaspi",
            title: "Associer votre carte fidélité à Ecoception",
            status: "start",
            logo: require("../../../../../assets/icones/missions/gaspi.png"),
            points: "+50 000",
        },
    ];

    const [hoveredId, setHoveredId] = useState(null);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {partenaires.map((p) => {
                const isHovered = hoveredId === p.id;

                return (
                    <Pressable
                        key={p.id}
                        onHoverIn={() => setHoveredId(p.id)}
                        onHoverOut={() => setHoveredId(null)}
                        style={[
                            styles.card,
                            isHovered && styles.cardHover,
                        ]}
                    >
                        <View style={styles.pointsBadge}>
                            <Text style={styles.pointsText}>{p.points}</Text>
                        </View>

                        <View style={styles.left}>
                            <Text style={styles.name}>{p.name}</Text>
                            <Text style={styles.title}>{p.title}</Text>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    p.status === "pending" && styles.buttonPending,
                                    p.status === "validated" && styles.buttonValidated,
                                ]}
                            >
                                <Text style={styles.buttonText}>
                                    {p.status === "pending" && "En attente"}
                                    {p.status === "validated" && "✓ Validé"}
                                    {p.status === "start" && "Commencer"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Image source={p.logo} style={styles.logo} />
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}
