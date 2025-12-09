import React, { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import PostCard from "../../components/PostCard";
import style from "./styles/accueilStyle"
export default function Accueil() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://mon-api.com/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <Header title="Accueil" />

            {loading ? (
                <ActivityIndicator size="large" color="#1DDE9A" style={{ marginTop: 20 }} />
            ) : (
                <ScrollView contentContainerStyle={{ padding: 15 }}>
                    {posts.map((p) => (
                        <PostCard key={p.id} post={p} styles={style.card} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
