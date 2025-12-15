import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { isWeb } from "../../../utils/platform";

const items = [
    {
        id: 1,
        title: "Barbecue",
        address: "96 Av. de La Liberté Tunis",
        distance: "5 km",
        author: "@Maitre",
        time: "2 min",
        image: "https://via.placeholder.com/120",
    },
    {
        id: 2,
        title: "Équipements maison",
        address: "96 Av. de La Liberté Tunis",
        distance: "13 km",
        author: "@Maitre",
        time: "2 min",
        image: "https://via.placeholder.com/120",
    },
    {
        id: 3,
        title: "Canapé",
        address: "96 Av. de La Liberté Tunis",
        distance: "18 km",
        author: "@Maitre",
        time: "2 min",
        image: "https://via.placeholder.com/120",
    },
];

export default function Index() {
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
                    <Header titre={"Régulières"} boutonRetour />
                )}

                <View style={{ flex: 1, flexDirection: "row", padding: 24, gap: 24 }}>
                    {/* LISTE */}
                    <View style={{ flex: 3, backgroundColor: "#fff", borderRadius: 12 }}>
                        <View
                            style={{
                                backgroundColor: "#3EDFA4",
                                padding: 20,
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                                Objets à récupérer autour de vous
                            </Text>
                        </View>

                        <ScrollView>
                            {items.map((item) => (
                                <View
                                    key={item.id}
                                    style={{
                                        flexDirection: "row",
                                        padding: 16,
                                        borderBottomWidth: 1,
                                        borderColor: "#eee",
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: 120, height: 90, borderRadius: 8 }}
                                    />

                                    <View style={{ flex: 1, marginLeft: 16 }}>
                                        <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                            {item.title}
                                        </Text>
                                        <Text style={{ color: "#666", marginVertical: 4 }}>
                                            {item.address}
                                        </Text>
                                        <Text style={{ color: "#999", fontSize: 12 }}>
                                            {item.author} • {item.time}
                                        </Text>
                                    </View>

                                    <View style={{ alignItems: "flex-end", gap: 8 }}>
                                        <Text style={{ color: "#666" }}>{item.distance}</Text>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: "#3EDFA4",
                                                paddingHorizontal: 16,
                                                paddingVertical: 8,
                                                borderRadius: 8,
                                            }}
                                        >
                                            <Text style={{ color: "#fff", fontWeight: "600" }}>
                                                Voir l’objet
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* SIDEBAR */}
                    {isWeb && (
                        <View style={{ flex: 1, gap: 24 }}>
                            <View
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 12,
                                    padding: 20,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                    Scanner un QR code et Poster
                                </Text>
                                <Text style={{ color: "#666", marginVertical: 12 }}>
                                    Scanner le QR code sur le produit d’un de nos partenaires puis prenez-le en photo avant de le jeter.
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#3EDFA4",
                                        padding: 12,
                                        borderRadius: 8,
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                                        Commencer
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 12,
                                    padding: 20,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                    Objets Abandonnés
                                </Text>
                                <Text style={{ color: "#666", marginVertical: 12 }}>
                                    Poster des objets abandonnés afin de leur donner une seconde vie.
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#3EDFA4",
                                        padding: 12,
                                        borderRadius: 8,
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                                        Commencer
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}
