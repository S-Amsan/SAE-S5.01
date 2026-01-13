import React, { useEffect, useMemo, useState } from "react";
import {View, Text, Image, TouchableOpacity, Pressable, StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { isWeb } from "../../../../utils/platform";
import styles from "../styles/accueilStyle";
import { fetchUserById } from "../../../../services/user.api";
import { formatRelativeTime } from "../../../../utils/format";
import {
    likePost,
    dislikePost,
    didILikePost,
    didIDislikePost
} from "../../../../services/posts.api";
import { fetchObjectById } from "../../../../services/objects.api";
import {loadUser} from "../../../../services/RegisterStorage";
import PopUp from "../../../../components/PopUp";

export default function PostCard({ post, onSignaler }) {
    const router = useRouter();

    const [showMenu, setShowMenu] = useState(false);
    const [loadingLike, setLoadingLike] = useState(false);
    const [reaction, setReaction] = useState(null);

    const [avatar, setAvatar] = useState(null);
    const [pseudo, setPseudo] = useState(null);

    const [userActuel, setUserActuel] = useState(null);

    // Pour la sous-card objet
    const [originalObject, setOriginalObject] = useState(null);
    const [objectAuthor, setObjectAuthor] = useState(null);

    const isPickupPost = useMemo(() => post.object_id != null, [post.object_id]);

    /* ============================
       REACTION (posts normaux)
    ============================ */
    useEffect(() => {
        let cancelled = false;

        const loadReaction = async () => {
            try {
                const liked = await didILikePost(post.id);
                if (cancelled) return;

                if (liked) {
                    setReaction("like");
                    return;
                }

                const disliked = await didIDislikePost(post.id);
                if (cancelled) return;

                setReaction(disliked ? "dislike" : null);
            } catch (e) {
                console.error("Erreur chargement réaction", e);
            }
        };

        loadReaction();

        return () => {
            cancelled = true;
        };
    }, [post.id]);


    /* ============================
       AUTEUR DU POST
    ============================ */
    useEffect(() => {
        let cancelled = false;

        const loadUser = async () => {
            try {
                const user = await fetchUserById(post.user_id);
                if (cancelled) return;
                setAvatar(user.photoProfileUrl);
                setPseudo(user.pseudo);
            } catch (e) {
                console.error(e);
            }
        };

        loadUser();

        return () => {
            cancelled = true;
        };
    }, [post.user_id]);

    /* ============================
       FETCH OBJET (pickup)
    ============================ */
    useEffect(() => {
        let cancelled = false;

        const loadObject = async () => {
            try {
                if (!isPickupPost) {
                    setOriginalObject(null);
                    setObjectAuthor(null);
                    return;
                }

                const obj = await fetchObjectById(post.object_id);
                if (cancelled) return;

                setOriginalObject(obj);

                if (obj?.publisher_user_id) {
                    const user = await fetchUserById(obj.publisher_user_id);
                    if (cancelled) return;
                    setObjectAuthor(user);
                } else {
                    setObjectAuthor(null);
                }
            } catch (e) {
                console.error("Erreur chargement objet pickup", e);
                if (!cancelled) {
                    setOriginalObject(null);
                    setObjectAuthor(null);
                }
            }
        };

        loadObject();

        return () => {
            cancelled = true;
        };
    }, [isPickupPost, post.object_id]);

    /* ============================
        FETCH User connecté
    ============================ */
    useEffect(() => {
        loadUser().then(setUserActuel);
    },[])

    /* ============================
       ACTIONS
    ============================ */
    const handleLike = async () => {
        if (reaction === "like" || loadingLike) return;

        try {
            setLoadingLike(true);
            await likePost(post.id);
            setReaction("like");
        } catch (e) {
            console.error("Erreur like", e);
        } finally {
            setLoadingLike(false);
        }
    };

    const handleDislike = async () => {
        if (reaction === "like" || loadingLike) return;

        try {
            setLoadingLike(true);
            await dislikePost(post.id);
            setReaction("dislike");
        } catch (e) {
            console.error("Erreur dislike", e);
        } finally {
            setLoadingLike(false);
        }
    };

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

    const handleVoirLeProfil = () => {
        setShowMenu(false);

        if(post?.user_id){
            router.push({pathname: "./social/profil", params: { id: post?.user_id }})
        }
    };
    const handleSupprimer = () => {
        setShowMenu(false);

    };

    const postUserActuel = userActuel?.id === post?.user_id

    /* ============================
       RENDER
    ============================ */
    return (
        <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.header}>
                <Image source={{ uri: avatar }} style={styles.avatar} />

                <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>@{pseudo}</Text>
                        <Text style={styles.time}>
                            {" · "}{formatRelativeTime(post.createdAt)}
                        </Text>
                    </View>

                    <View>
                        {isPickupPost && (
                            <Text style={[styles.text, styles.pickupLabel]}>
                                a récupéré un objet abandonné !
                            </Text>
                        )}

                        {!!post.description && (
                            <Text style={styles.text}>
                                {post.description}
                            </Text>
                        )}
                    </View>


                </View>

                <TouchableOpacity onPress={() => setShowMenu(v => !v)}>
                    <Ionicons name="ellipsis-horizontal" size={30} color="#777" />
                </TouchableOpacity>
            </View>


            {/* OVERLAY (clic dehors => ferme) */}
            {showMenu && (
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={() => setShowMenu(false)}
                />
            )}

            {/* MENU */}
            {showMenu && (
                postUserActuel ?
                    <View style={[styles.postMenu, {width : 220}]}>
                        <TouchableOpacity style={styles.postMenuRow} onPress={handleSupprimer}>
                            <Text style={styles.postMenuDanger}>Supprimer mon post</Text>
                            <Ionicons name="trash-outline" size={19} color="#FF5858" />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.postMenu}>
                        <TouchableOpacity
                            style={styles.postMenuRow}
                            onPress={handleVoirLeProfil}
                        >
                            <Text style={styles.postMenuText}>Voir le profil</Text>
                            <Image
                                style={styles.profil}
                                source={require("../../../../assets/icones/accueil/profil.png")}
                            />
                        </TouchableOpacity>

                        <View style={styles.postMenuSeparator} />

                        <TouchableOpacity style={styles.postMenuRow} onPress={handleSignaler}>
                            <Text style={styles.postMenuDanger}>Signaler le post</Text>
                            <Image
                                style={styles.signal}
                                source={require("../../../../assets/icones/accueil/signal.png")}
                            />
                        </TouchableOpacity>
                    </View>
            )}

            {/* IMAGE DU POST */}
            <Image source={{ uri: post.imageUrl }} style={styles.image} />

            {/* SOUS-CARD : OBJET D’ORIGINE (pickup uniquement) */}
            {isPickupPost && originalObject && (
                <View style={styles.quoteCard}>
                    <View style={styles.quoteHeader}>
                        <Image
                            source={{ uri: objectAuthor?.photoProfileUrl }}
                            style={styles.quoteAvatar}
                        />

                        <View style={{ flex: 1 }}>
                            <View style={styles.nameRow}>
                                <Text style={styles.quoteName}>
                                    @{objectAuthor?.pseudo ?? "utilisateur"}
                                </Text>
                                <Text style={styles.time}>
                                    {" · "}{formatRelativeTime(
                                    originalObject.creationDate ?? originalObject.creation_date
                                )}
                                </Text>
                            </View>

                            <Text style={styles.quoteText}>
                                a trouvé un objet abandonné !
                            </Text>
                        </View>
                    </View>

                    <View style={styles.quoteBody}>
                        <Image
                            source={{
                                uri:
                                    originalObject.photoUrl ??
                                    originalObject.photo_url ??
                                    originalObject.photo,
                            }}
                            style={styles.quoteImage}
                        />

                        <View style={{ flex: 1 }}>
                            <Text style={styles.quoteTitle}>
                                {originalObject.title ?? "Objet"}
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            {!postUserActuel && post?.id && (
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
            )}
        </View>
    );
}
