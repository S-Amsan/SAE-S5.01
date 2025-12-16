import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

export default function MissionsListContent({ items }) {
    return (
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
            ))}
        </ScrollView>
    );
}
