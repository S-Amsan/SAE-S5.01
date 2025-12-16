import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function NotificationItem({ item }) {
    return (
        <TouchableOpacity style={{ flexDirection: "row", paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: "#eee" }} activeOpacity={0.8}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#f0f0f0", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                {/* ici tu peux mettre l'avatar ou icône : */}
                {item.avatar ? <Image source={{ uri: item.avatar }} style={{ width: 44, height: 44, borderRadius: 22 }} /> : <Text>♻️</Text>}
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700" }}>{item.title}</Text>
                <Text numberOfLines={2} style={{ color: "#555", marginTop: 2 }}>{item.text}</Text>
                <Text style={{ color: "#999", fontSize: 12, marginTop: 6 }}>{item.date}</Text>
            </View>

            {item.unread ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#07b56a", marginLeft: 8, alignSelf: "center" }} /> : null}
        </TouchableOpacity>
    );
}

