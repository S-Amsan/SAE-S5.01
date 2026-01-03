import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    ActivityIndicator,
} from "react-native";

import Header from "../../../components/Header";
import PostCard from "./Post/PostCard";
import style from "./styles/accueilStyle";
import Navbar from "../../../components/Navbar";

import SignalementReasons from "./Post/signalement/_components/SignalementReasons";
import SignalementSuccess from "./Post/signalement/_components/SignalementSuccess";

import { Pressable } from "react-native";

export default function AccueilWeb() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [showSignalement, setShowSignalement] = useState(false);
    const [signalementStep, setSignalementStep] = useState("reasons");

    const [recherche, setRecherche] = useState("");
    const [filtres, setFiltres] = useState([
        { id: "tri", options: ["Récent", "Ancien"], select: "Récent" },
        { id: "lieu", options: ["France", "Autre"], select: "France" },
    ]);

    useEffect(() => {
        console.log("Recherche :", recherche);
        console.log("Filtres :", filtres);
    }, [recherche, filtres]);


    useEffect(() => {
        const fakePosts = [
            {
                id: 1,
                username: "EcoWarrior",
                avatar:
                    "https://media.licdn.com/dms/image/v2/D4D03AQEuxNTNZ9pcyw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1732986053908?e=2147483647&v=beta&t=KXGYmWrWy4lV6GsVKTahXunyKG4OOIU7-TS_oMW5Q-8",
                isDangerous: false,
                time: "il y a 2h",
                postImage: "https://picsum.photos/600/400?random=1",
            },
            {
                id: 2,
                username: "GreenLife",
                avatar: "https://i.pravatar.cc/150?img=32",
                isDangerous: true,
                time: "il y a 5h",
                postImage: "https://picsum.photos/600/400?random=2",
            },
            {
                id: 3,
                username: "CleanCity",
                avatar: "https://i.pravatar.cc/150?img=45",
                isDangerous: false,
                time: "hier",
                postImage: "https://picsum.photos/600/400?random=3",
            },
        ];

        const timer = setTimeout(() => {
            setPosts(fakePosts);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);


    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" }}>
            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            <View style={{ flex: 1 }}>
                <Header  recherche={recherche}
                         setRecherche={setRecherche}
                         filtres={filtres}
                         setFiltres={setFiltres}
                         userDetails userProfil />

                <ScrollView>
                    <View style={{ padding: 15 }}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#1DDE9A" />
                        ) : (
                            <View style={{ alignItems: "center" }}>
                                {posts.map((p) => (
                                    <PostCard
                                        key={p.id}
                                        post={p}
                                        styles={style}
                                        onSignaler={() => {
                                            setSelectedPostId(p.id);
                                            setShowSignalement(true);
                                        }}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>

            {/* ===== MODAL SIGNALEMENT WEB ===== */}
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
                                onSelect={() => setSignalementStep("success")}
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
        </View>
    );

}
