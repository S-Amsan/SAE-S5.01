import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    ActivityIndicator,
    Pressable, Text, TouchableOpacity,Image,
} from "react-native";
import { useMemo } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";

import PostCard from "./Post/PostCard";
import ObjectCard from "../missions/_components/ObjectCard/ObjectCard";

import SignalementReasons from "./Post/signalement/_components/SignalementReasons";
import SignalementSuccess from "./Post/signalement/_components/SignalementSuccess";

import style from "./styles/accueilStyle";

import { fetchAllPosts } from "../../../services/posts.api";
import { getAllObjects } from "../../../services/objects.api";
import {fetchUserById} from "../../../services/user.api";

export default function AccueilWeb() {
    const [posts, setPosts] = useState([]);
    const [objects, setObjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedObjet, setSelectedObjet] = useState(null);

    const [showSignalement, setShowSignalement] = useState(false);
    const [signalementStep, setSignalementStep] = useState("reasons");

    const [recherche, setRecherche] = useState("");
    const [filtres, setFiltres] = useState([
        {
            id: "type",
            options: ["Tous", "Recycler", "Objet", "Récupérer"],
            select: "Tous",
        },
        {
            id: "tri",
            options: ["Récent", "Ancien"],
            select: "Récent",
        },
    ]);


    const [showObjectModal, setShowObjectModal] = useState(false);


    /* ===========================
       LOAD POSTS + OBJECTS
    =========================== */
    useEffect(() => {
        const loadFeed = async () => {
            try {
                const [postsData, objectsData] = await Promise.all([
                    fetchAllPosts(),
                    getAllObjects(),
                ]);

                const availableObjects = Array.isArray(objectsData)
                    ? objectsData.filter(
                        o => o.picked_up_user_id === null
                    )
                    : [];

                setPosts(Array.isArray(postsData) ? postsData : []);
                setObjects(availableObjects);
            } catch (e) {
                console.error("Erreur chargement feed", e);
            } finally {
                setLoading(false);
            }
        };

        loadFeed();
    }, []);


    function PublisherInfo({ userId }) {
        const [pseudo, setPseudo] = useState(null);
        const [avatar, setAvatar] = useState(null);

        useEffect(() => {
            if (!userId) return;

            fetchUserById(userId)
                .then(user => {
                    setPseudo(user.pseudo);
                    setAvatar(user.photoProfileUrl);
                })
                .catch(console.error);
        }, [userId]);

        return (
            <Text style={{ fontSize: 18, marginTop: 6 }}>
                Posté par : {pseudo ?? "…"}
            </Text>
        );
    }

    /* ===========================
       FEED UNIFIÉ
    =========================== */

    const TYPE_MAP = {
        "Recycler": "Post",
        "Objet": "PostObjet",
        "Récupérer": "PostRecupObjet",
    };


    const filteredFeed = useMemo(() => {
        const typeLabel = filtres.find(f => f.id === "type")?.select;
        const tri = filtres.find(f => f.id === "tri")?.select;

        const selectedSubType = TYPE_MAP[typeLabel];

        const feed = [

            ...posts.map(post => {
                const isRecup = post.object_id !== null && post.object_id !== undefined;

                return {
                    type: "post",
                    subType: isRecup ? "PostRecupObjet" : "Post",
                    date: new Date(post.createdAt),
                    data: post,
                };
            }),


            ...objects.map(object => ({
                type: "object",
                subType: "PostObjet",
                date: new Date(object.creationDate),
                data: object,
            })),
        ];


        return feed

            .filter(item => {
                if (!typeLabel || typeLabel === "Tous") return true;

                if (typeLabel === "Recycler") {
                    return item.type === "post" && item.subType === "Post";
                }

                if (typeLabel === "Récupérer") {
                    return item.type === "post" && item.subType === "PostRecupObjet";
                }

                if (typeLabel === "Objet") {
                    return item.type === "object";
                }

                return true;
            })



            .filter(item => {
                if (!recherche) return true;

                const q = recherche.toLowerCase();


                if (item.subType === "PostObjet") {
                    return item.data.title?.toLowerCase().includes(q);
                }


                if (item.subType === "PostRecupObjet") {
                    return item.data.description?.toLowerCase().includes(q);
                }

                return item.data.description?.toLowerCase().includes(q);
            })

            // ===== TRI =====
            .sort((a, b) => {
                if (tri === "Ancien") {
                    return a.date - b.date;
                }
                return b.date - a.date;
            });
    }, [posts, objects, recherche, filtres]);

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" }}>
            {/* ===== NAVBAR ===== */}
            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            {/* ===== MAIN CONTENT ===== */}
            <View style={{ flex: 1 }}>
                <Header
                    recherche={recherche}
                    setRecherche={setRecherche}
                    filtres={filtres}
                    setFiltres={setFiltres}
                    userDetails
                    userProfil
                />

                <ScrollView>
                    <View style={{ padding: 15, alignItems: "center" }}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#1DDE9A" />
                        ) : (
                            filteredFeed.map(item => {

                                switch (item.subType) {
                                    case "Post":
                                    case "PostRecupObjet":
                                        return (
                                            <PostCard
                                                key={`${item.type}-${item.data.id}`}
                                                post={item.data}
                                                styles={style}
                                                onSignaler={() => {
                                                    setSelectedPostId(item.data.id);
                                                    setShowSignalement(true);
                                                }}
                                            />
                                        );

                                    case "PostObjet":
                                        return (
                                            <ObjectCard
                                                key={`${item.type}-${item.data.id}`}
                                                item={item.data}
                                                buttonLabel="Voir l'objet"
                                                onSeeObjet={(objet) => {
                                                    setSelectedObjet(objet);
                                                    setShowObjectModal(true);
                                                }}
                                            />
                                        );

                                    default:
                                        return null;
                                }

                            })
                        )}
                    </View>
                </ScrollView>
            </View>

            {/* ===== MODAL SIGNALEMENT ===== */}
            {showSignalement && (
                <Pressable
                    style={style.modalOverlay}
                    onPress={() => {
                        setShowSignalement(false);
                        setSignalementStep("reasons");
                        setSelectedPostId(null);
                    }}
                >
                    <Pressable style={style.modalContent} onPress={() => {}}>
                        {signalementStep === "reasons" && (
                            <SignalementReasons
                                postId={selectedPostId}
                                onSuccess={() => setSignalementStep("success")}
                            />
                        )}

                        {signalementStep === "success" && (
                            <SignalementSuccess
                                onDone={() => {
                                    setShowSignalement(false);
                                    setSignalementStep("reasons");
                                    setSelectedPostId(null);
                                }}
                            />
                        )}
                    </Pressable>
                </Pressable>
            )}

            {/* ===== MODAL OBJET ===== */}
            {showObjectModal && selectedObjet && (
                <Pressable
                    style={style.modalOverlay}
                    onPress={() => {
                        setShowObjectModal(false);
                        setSelectedObjet(null);
                    }}
                >
                    <Pressable style={style.modalContent} onPress={() => {}}>
                        <View style={{ padding: 20 }}>
                            <Image
                                source={{ uri: selectedObjet.photoUrl }}
                                style={{ width: "100%", height: 550, borderRadius: 12 }}
                            />

                            <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 12 }}>
                                Objet : {selectedObjet.title}
                            </Text>

                            <PublisherInfo userId={selectedObjet.publisher_user_id} />

                            <Text style={{ fontSize: 18,marginTop: 6 }}>
                                Adresse : {selectedObjet.address}
                            </Text>

                            <Text style={{ fontSize: 18,marginTop: 6}}>
                                Description : {selectedObjet.description}
                            </Text>

                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    backgroundColor: "#1DDE9A",
                                    padding: 14,
                                    borderRadius: 10,
                                    alignItems: "center",
                                    marginBottom:15,
                                }}
                                onPress={() => {
                                    setShowObjectModal(false);
                                    setSelectedObjet(null);
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    Fermer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            )}

        </View>
    );
}
