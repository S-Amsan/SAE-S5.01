import React, { useEffect, useState } from "react";
import {ScrollView, View, ActivityIndicator, Platform} from "react-native";
import Header from "../../../components/Header";
import PostCard from "../../../components/PostCard";
import style from "./styles/accueilStyle"
import Navbar from "../../../components/Navbar";
export default function Index() {
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

    const [recherche, setRecherche] = useState("");

    const [filtres, setFiltres] = useState([
        { id: "tri", options: ["Récent", "Ancien"], select: "Récent" },
        { id: "lieu", options: ["France", "Autre"], select: "France" }
    ]);

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" }}>
            {
                Platform.OS === 'web' ?
                    <View style={{ width: "15%" }}>
                        <Navbar/>
                    </View>
                    :
                    <Navbar/>
            }
            <View style={{ flex: 1}}>
                <Header recherche={recherche}
                        setRecherche={setRecherche}
                        filtres={filtres}
                        setFiltres={setFiltres}
                        userDetails={true}
                        userProfil={true}/>

                <View style={{flex: 1,
                    paddingHorizontal: 15,
                    paddingTop: 10,}}>

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
            </View>

        </View>
    );
}
