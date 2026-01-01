import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { isWeb } from "../../../../utils/platform";
import styles from "../styles/accueilStyle";

export default function PostCard({ post, onSignaler }) {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const handleSignaler = () => {
        setShowMenu(false);

        if (isWeb) {

            onSignaler?.(post.id);
        } else {
            router.push({
                pathname: "/appPrincipal/accueil/Post/signalement",
                params: { postId: post.id },
            });
        }
    };

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />

                <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>Maître @{post.username}</Text>
                        <Text style={styles.time}> · {post.time}</Text>
                    </View>

                    <Text style={styles.text}>
                        a jeté une bouteille à la poubelle !
                    </Text>
                </View>

                <TouchableOpacity onPress={() => setShowMenu(v => !v)}>
                    <Ionicons name="ellipsis-horizontal" size={30} color="#777" />
                </TouchableOpacity>
            </View>

            {/* MENU */}
            {showMenu && (
                <View style={styles.postMenu}>
                    <TouchableOpacity
                        style={styles.postMenuRow}
                        onPress={() => {
                            setShowMenu(false);
                            console.log("Voir profil");
                        }}
                    >
                        <Text style={styles.postMenuText}>Voir le profil</Text>
                        <Image
                            style={styles.profil}
                            source={require("../../../../assets/icones/accueil/profil.png")}
                        />
                    </TouchableOpacity>

                    <View style={styles.postMenuSeparator} />

                    <TouchableOpacity
                        style={styles.postMenuRow}
                        onPress={handleSignaler}
                    >
                        <Text style={styles.postMenuDanger}>Signaler le post</Text>
                        <Image
                            style={styles.signal}
                            source={require("../../../../assets/icones/accueil/signal.png")}
                        />
                    </TouchableOpacity>
                </View>
            )}

            {/* Image */}
            <Image source={{ uri: post.postImage }} style={styles.image} />

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn}>
                    <Image
                        source={require("../../../../assets/icones/accueil/likeNone.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn}>
                    <Image
                        source={require("../../../../assets/icones/accueil/dislikeNone.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
