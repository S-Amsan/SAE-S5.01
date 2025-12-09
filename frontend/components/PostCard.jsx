import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PostCard({ post, styles }) {
    return (
        <View style={styles.card}>

            {/* --- User Row --- */}
            <View style={styles.userRow}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />

                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={styles.username}>@{post.username} </Text>

                    {post.isDangerous && (
                        <Text style={styles.danger}>(utilisateur dangereux)</Text>
                    )}
                </View>

                <Text style={styles.time}>· {post.time}</Text>
            </View>

            {/* --- Post Image --- */}
            <Image
                source={{ uri: post.postImage }}
                style={styles.postImage}
            />

            {/* --- Actions Row --- */}
            <View style={styles.actions}>
                <TouchableOpacity>
                    <Ionicons name="arrow-up" size={26} color="#444" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="arrow-down" size={26} color="#444" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
