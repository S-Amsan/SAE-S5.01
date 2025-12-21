import React, { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator, Platform } from "react-native";
import Header from "../../../components/Header";
import PostCard from "./PostCard";
import style from "./styles/accueilStyle";
import Navbar from "../../../components/Navbar";

export default function Index() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fakePosts = [
            {
                id: 1,
                username: "EcoWarrior",
                avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEuxNTNZ9pcyw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1732986053908?e=2147483647&v=beta&t=KXGYmWrWy4lV6GsVKTahXunyKG4OOIU7-TS_oMW5Q-8",
                isDangerous: false,
                time: "il y a 2h",
                postImage: "https://picsum.photos/600/400?random=1"
            },
            {
                id: 2,
                username: "GreenLife",
                avatar: "https://i.pravatar.cc/150?img=32",
                isDangerous: true,
                time: "il y a 5h",
                postImage: "https://picsum.photos/600/400?random=2"
            },
            {
                id: 3,
                username: "CleanCity",
                avatar: "https://i.pravatar.cc/150?img=45",
                isDangerous: false,
                time: "hier",
                postImage: "https://picsum.photos/600/400?random=3"
            }
        ];

        setTimeout(() => {
            setPosts(fakePosts);
            setLoading(false);
        }, 800);
    }, []);

    const [recherche, setRecherche] = useState("");

    const [filtres, setFiltres] = useState([
        { id: "tri", options: ["Récent", "Ancien"], select: "Récent" },
        { id: "lieu", options: ["France", "Autre"], select: "France" }
    ]);

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" }}>
            {Platform.OS === "web" ? (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            ) : (
                <Navbar />

            )}

            <View style={{ flex: 1 }}>
                <Header
                    recherche={recherche}
                    setRecherche={setRecherche}
                    filtres={filtres}
                    setFiltres={setFiltres}
                    userDetails={true}
                    userProfil={true}
                />

                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                        paddingTop: 10
                    }}
                >
                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="#1DDE9A"
                            style={{ marginTop: 20 }}
                        />
                    ) : (
                        <ScrollView contentContainerStyle={{ padding: 15 }}>
                            {posts.map(p => (
                                <PostCard key={p.id} post={p} styles={style} />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </View>
        </View>
    );
}
