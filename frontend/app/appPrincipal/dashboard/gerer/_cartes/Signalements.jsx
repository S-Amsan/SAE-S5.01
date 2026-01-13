import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import Carte from "../../_component/Carte";
import Br from "../../_component/Br";
import PopUp from "../../../../../components/PopUp";
import {tempsEcoule} from "../../../../../utils/temps";
import {banUser, invalidatePost} from "../../../../../services/admin.api";
import Toast from "react-native-toast-message";

const getTypeObjet = (post) => {
    if (post.object_id !== null) {
        return "Objet récupéré";
    }

    if (post.description?.toLowerCase().includes("recycl")) {
        return "Objet recyclé";
    }
    return "Objet trouvé";
};

const PostPreview = ({ report }) => {
    if (!report?.post) return null;

    const post = report.post;
    const user = report.user;

    return (
        <View style={styles.card}>
            {/* Header */}
            {(user?.photoProfileUrl || user?.pseudo || user?.name || post?.createdAt) && (
                <View style={styles.header}>
                    {!!user?.photoProfileUrl && (
                        <Image source={{ uri: user.photoProfileUrl }} style={styles.avatar} />
                    )}

                    <View style={{ flex: 1 }}>
                        <View style={styles.nameRow}>
                            {!!(user?.pseudo || user?.name) && (
                                <Text style={styles.name}>@{user?.pseudo ?? user?.name}</Text>
                            )}

                            {!!post?.createdAt && (
                                <Text style={styles.time}>
                                    {" · il y a"} {(tempsEcoule(post.createdAt))}
                                </Text>
                            )}
                        </View>

                        {!!user?.name && user?.pseudo && (
                            <Text style={styles.subName}>{user.name}</Text>
                        )}
                    </View>
                </View>
            )}

            {/* Titre / nom */}
            {!!post?.name && <Text style={styles.title}>{post.name}</Text>}

            {/* Description */}
            {!!post?.description && <Text style={styles.text}>{post.description}</Text>}

            {/* Image */}
            {!!post?.imageUrl && (
                <Image source={{ uri: post.imageUrl }} style={styles.image} />
            )}
        </View>
    );
}


export default function Signalements ({carte}) {
    const [postToPreview, setPostToPreview] = useState(null);
    const [recherche, setRecherche] = useState("");

    const filtres = [
        ["de A à Z", "de Z à A"],
        ["traité", "non traité", "tous"],
        ["Objet recyclé", "Objet trouvé", "Objet récupéré", "tous les types"],
    ]

    const valeurDefaut = ["de A à Z", "non traité", "tous les types"]

    const [selected, setSelected] = useState(valeurDefaut);

    const [tri, etat, typeFiltre] = selected;


    const dataFiltree = (carte?.data ?? [])
        // Recherche user name
        .filter((c) =>
            (c.user?.name ?? "").toLowerCase().includes(recherche.trim().toLowerCase())
        )
        // Filtre état
        .filter((c) => {
            if (etat === "traité") return c.checked === true;
            if (etat === "non traité") return c.checked !== true;
            return true; // "tous"
        })

        // Filtre type objet
        .filter((c) => {
            if (typeFiltre === "tous les types") return true;
            const type = getTypeObjet(c.post);
            return type === typeFiltre;
        })

        // Tri
        .sort((a, b) => {
            const A = (a.user?.name ?? "").toLowerCase();
            const B = (b.user?.name ?? "").toLowerCase();
            if (tri === "de Z à A") return B.localeCompare(A);
            return A.localeCompare(B); // défaut A-Z
        });

    const resetFiltres = () => {
        setRecherche("")
        setSelected(valeurDefaut)
    }

    const handleBannir = (user) => {
        if (!user.banned){
            banUser(user.id).then(() => {
                    carte.reloadData("utilisateurs")
                    Toast.show({
                        type: "success",
                        text1: "Confirmation de ban",
                        text2: `@${user.name} a été ban avec succès!`
                    })
                }
            )
        }else{
            Toast.show({
                type: "info",
                text1: "Utilisateur déjà banni",
                text2: `@${user.name} est déjà banni(e).`
            });
        }
    }

    const handleInvalider = (post) => {
        if (!post.validated){ // TODO c'est un boolean changer ça
            Toast.show({
                type: "info",
                text1: "Post déjà invalide",
                text2: `Le post est déjà invalide.`
            });
        }else{
            // TODO then invalidatePost(post.id);
            Toast.show({
                type: "success",
                text1: "Confirmation d'invalidation de post",
                text2: `Le post à été invalider avec succès!`
            })
        }

    }

    return (
        <Carte carte={carte} recherche={recherche} setRecherche={setRecherche} filtres={filtres} selected={selected} setSelected={setSelected} styleScrollView={{gap : 10}}>
            <PopUp visible={postToPreview} setVisible={() => setPostToPreview(null)}>
                <PostPreview report={postToPreview} />
            </PopUp>
            {dataFiltree.map(c => {
                const type = getTypeObjet(c.post)

                return (
                    <View key={c.id} style={styles.signalementItem}>
                        <View style={styles.signalementPartieHaute}>
                            <Image source={c.user.photoProfileUrl} style={styles.userPhoto}/>
                            <View style={styles.signalementInfoEntete}>
                                <Text style={styles.userNameText}>@{c.user.name}</Text>
                                <Text style={styles.signalementRaisonEtiquette}>{c.reason}</Text>
                            </View>
                        </View>
                        <Br/>
                        <View style={styles.signalementPostContainer}>
                            <Image source={c.post.imageUrl} style={styles.signalementPostImage}/>
                            <View style={styles.signalementInfoPostContainer}>
                                <Text style={styles.signalementInfoPostText}>Type : {type}</Text>
                                <Text style={styles.signalementInfoPostText}>Signalé le : {c.createdAt.slice(0,10).split("-").join("/")}</Text>
                                <Text style={styles.signalementInfoPostText}>Etat : {c.checked ? "traité" : "non traité"}</Text>
                            </View>
                        </View>
                        <View style={styles.signalementBoutonsContainer}>
                            <TouchableOpacity
                                style={[styles.signalementBouton, styles.voirPostBouton]}
                                onPress={() => setPostToPreview(c)}
                            >
                                <Text style={[styles.signalementBoutonText, styles.voirPostBoutonText]}>Voir le post</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.signalementBouton, styles.invaliderBouton]}
                                onPress={() => handleInvalider(c.post)}
                            >
                                <Text style={styles.signalementBoutonText}>Invalider</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.signalementBouton, styles.banBouton]}
                                onPress={() => handleBannir(c.user)}
                            >
                                <Text style={[styles.signalementBoutonText, styles.banBoutonText]}>Bannir l&#39;utilisateur</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
            {
                !carte?.data ?
                    <Text>Aucun signalement</Text>
                    :
                    dataFiltree.length === 0 &&
                    <Text>Aucun résultat, <Text style={styles.resetText} onPress={() => resetFiltres()}>Réinitialiser les filtres.</Text></Text>
            }
        </Carte>
    )
}


const styles = StyleSheet.create({
    signalementItem : {
        boxShadow : "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius : 10,
    },
    signalementPartieHaute : {
        padding : 10,
        flexDirection : "row",
        gap : 7.5,
        alignItems : "center",
    },
    userPhoto : {
        height : 40,
        width : 40,
        borderRadius : 40,
    },
    userNameText : {
        fontSize : 15,
        fontWeight : "bold",
    },
    signalementInfoEntete : {
        gap : 2,
    },
    signalementRaisonEtiquette : {
        fontSize : 12,
        color : "#FFFFFF",
        backgroundColor : "#dc4b4b",
        borderRadius : 3,
        paddingHorizontal : 3,
        alignSelf: "flex-start"
    },
    signalementPostContainer : {
        padding : 10,
        gap : 15,
        flexDirection : "row",
    },
    signalementPostImage : {
        boxShadow : "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius : 10,
        width : 120,
        height : 70,
        resizeMode : "stretch",
        alignItems: "center",
    },
    signalementInfoPostContainer : {
        justifyContent : "space-evenly",
    },
    signalementInfoPostText : {
        fontSize : 13,
        fontWeight : "600",
    },
    signalementBoutonsContainer : {
        padding : 10,
        flexDirection : "row",
        gap : 10,
    },
    signalementBouton : {
        width : "20%",
        borderRadius : 5,
        paddingVertical : 5,
    },
    signalementBoutonText : {
        fontSize : 12,
        fontWeight : "600",
        textAlign: "center",
    },
    voirPostBouton : {
        borderWidth : 1,
        borderColor : "#F2F2F2",
        backgroundColor : "#f8f8f8",
    },
    invaliderBouton : {
        borderWidth : 1,
        borderColor : "#F2F2F2",
        backgroundColor : "#f8f8f8",
    },
    banBouton : {
        backgroundColor : "#dc4b4b",
    },
    voirPostBoutonText : {
        color : "#909090",
    },
    banBoutonText : {
        color : "#FFFFFF",
    },
    resetText : {
        color : "#4192e3",
        textDecorationLine : "underline",
    },
    card: {
        width: 520,
        maxWidth: "92%",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
        zIndex: 200,
    },
    header: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginBottom: 8,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 44,
    },
    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    name: {
        fontWeight: "700",
        fontSize: 14,
    },
    subName: {
        fontSize: 12,
        color: "#666",
        marginTop: 2,
    },
    time: {
        fontSize: 12,
        color: "#777",
    },
    title: {
        fontSize: 16,
        fontWeight: "800",
        marginTop: 6,
    },
    text: {
        marginTop: 6,
        fontSize: 13,
        color: "#222",
    },
    image: {
        marginTop: 10,
        width: "100%",
        height: 260,
        borderRadius: 12,
        resizeMode: "cover",
    },
})
