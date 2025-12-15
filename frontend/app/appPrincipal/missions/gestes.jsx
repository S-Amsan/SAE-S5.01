import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { isWeb } from "../../../utils/platform";

const partenaires = [
    {
        id: "ratp",
        name: "RATP",
        title: "Associer votre abonnement Ratp à Ecoception et gagner 50 000 points",
        description:
            "Vous devez fournir Justificatif d’abonnement Navigo (PDF officiel ou photo du reçu de paiement).",
        logo: require("../../../assets/icones/missions/ratp.png"),
    },
    {
        id: "velib",
        name: "Vélib",
        title: "Associer votre abonnement Vélib à Ecoception et gagner 50 000 points",
        description:
            "Vous devez fournir Justificatif d’abonnement de vélib (PDF officiel ou photo du reçu de paiement).",
        logo: require("../../../assets/icones/missions/velib.png"),
    },
    {
        id: "nous",
        name: "Nous anti-gaspi",
        title:
            "Associer votre carte fidélité à Ecoception et gagner 50 000 points",
        description:
            "Vous devez fournir Justificatif de fidélité (PDF officiel ou photo du reçu de paiement).",
        logo: require("../../../assets/icones/missions/gaspi.png"),
    },
];

export default function Gestes() {
    const onglets = [
        { id: "missions", label: "Régulières", page: "missions/listes" },
        { id: "gestes", label: "Une fois", page: "missions/gestes" },
    ];

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f6f6f6" }}>
            {isWeb && (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            )}

            <View style={{ flex: 1 }}>
                {isWeb ? (
                    <Header onglets={onglets} />
                ) : (
                    <Header titre={"Une fois"} boutonRetour boutonParametres />
                )}

                <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
                    {partenaires.map((p) => (
                        <View
                            key={p.id}
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: 20,
                                padding: 24,
                                flexDirection: "row",
                                alignItems: "center",
                                shadowColor: "#000",
                                shadowOpacity: 0.05,
                                shadowRadius: 10,
                            }}
                        >
                            <Image
                                source={p.logo}
                                style={{ width: 60, height: 60, resizeMode: "contain" }}
                            />

                            <View style={{ flex: 1, marginLeft: 24 }}>
                                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                                    {p.name}
                                </Text>
                                <Text style={{ marginTop: 8, fontWeight: "600" }}>
                                    {p.title}
                                </Text>
                                <Text style={{ marginTop: 8, color: "#666" }}>
                                    {p.description}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 8,
                                        fontSize: 12,
                                        color: "#999",
                                    }}
                                >
                                    Vos documents seront traités en toute confidentialité et supprimé après vérification
                                </Text>
                            </View>

                            <View style={{ alignItems: "flex-end", gap: 16 }}>
                                <View
                                    style={{
                                        backgroundColor: "#3EDFA4",
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        borderRadius: 8,
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                                        +50 000
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#3EDFA4",
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                                        Importer mon justificatif
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}
