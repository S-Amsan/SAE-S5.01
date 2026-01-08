import React, {useEffect, useState} from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { isWeb } from "../../../../utils/platform";
import styles from "../styles/accueilStyle";
import {fetchUserById} from "../../../../services/user.api";
import {formatRelativeTime} from "../../../../utils/format";
import { likePost, dislikePost } from "../../../../services/posts.api";


export default function PostCard({ post, onSignaler }) {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();
    const [loadingLike, setLoadingLike] = useState(false);
    const [reaction, setReaction] = useState(null);


    const handleSignaler = () => {
        setShowMenu(false);

        if (isWeb) {

            onSignaler?.(post.id);
        } else {
            router.push({
                pathname: "/appPrincipal/accueil/PostAction/signalement",
                params: { postId: post.id },
            });
        }
    };

    const [avatar, setAvatar] = useState(null);
    const [pseudo, setPseudo] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await fetchUserById(post.user_id);
                setAvatar(user.photoProfileUrl);
                setPseudo(user.pseudo);
            } catch (e) {
                console.error(e);
            }
        };

        loadUser();
    }, [post.user_id]);
    const handleLike = async () => {
        if (reaction === "like") return;

        try {
            await likePost(post.id);
            setReaction("like");
        } catch (e) {
            console.error("Erreur like", e);
        }
    };

    const handleDislike = async () => {
        if (reaction === "dislike") return;

        try {
            await dislikePost(post.id);
            setReaction("dislike");
        } catch (e) {
            console.error("Erreur dislike", e);
        }
    };


    /**
     * Example response:
     * ```json
     * {
     *   "id": 3,
     *   "name": "Test post",
     *   "description": "Test description",
     *   "address": "Test address",
     *   "imageUrl": "http://82.66.240.161:8090/files/abf24cb4cb7bb1cde11769b75196f111a38644d64d41c1dc84197708ed7ad6c0.png",
     *   "createdAt": "2026-01-05T23:44:43.305624",
     *   "user_id": 1
     * }
     * ```
     */

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{ uri: avatar}} style={styles.avatar} />

                <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>@{pseudo}</Text>
                        <Text style={styles.time}> {" · "}{formatRelativeTime(post.createdAt)}</Text>
                    </View>

                    <Text style={styles.text}>
                        {post.description}
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
            <Image source={{ uri: post.imageUrl }} style={styles.image} />

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={handleLike}>
                    <Image
                        source={
                            reaction === "like"
                                ? require("../../../../assets/icones/accueil/like.png")
                                : require("../../../../assets/icones/accueil/likeNone.png")
                        }
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDislike}>
                    <Image
                        source={
                            reaction === "dislike"
                                ? require("../../../../assets/icones/accueil/dislike.png")
                                : require("../../../../assets/icones/accueil/dislikeNone.png")
                        }
                        style={styles.icon}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}
