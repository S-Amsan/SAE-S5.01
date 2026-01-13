import React, { useEffect, useRef, useState } from "react";
import {
    View,
    ScrollView,
    ActivityIndicator,
    Animated,
} from "react-native";
import { useRouter } from "expo-router";

import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import ScanActionButton from "../../../components/ScanActionButton";

import PostCard from "./Post/PostCard";
import ObjectCard from "../missions/_components/ObjectCard/ObjectCard";

import style from "./styles/accueilStyle";

import { fetchAllPosts } from "../../../services/posts.api";
import { getAllObjects } from "../../../services/objects.api";
import { loadUser as loadUserFromStorage } from "../../../services/RegisterStorage";

export default function AccueilMobile() {
    const router = useRouter();

    const [posts, setPosts] = useState([]);
    const [objects, setObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    /* ===========================
       LOAD USER
    =========================== */
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await loadUserFromStorage();
                setUser(storedUser);
            } catch (e) {
                console.error("Erreur chargement user", e);
            }
        };
        loadUser();
    }, []);

    /* ===========================
       LOAD FEED
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


    /* ===========================
       FEED UNIFIÉ
    =========================== */
    const feed = [
        ...posts.map(post => ({
            type: "post",
            id: `post-${post.id}`,
            date: new Date(post.createdAt),
            data: post,
        })),
        ...objects.map(object => ({
            type: "object",
            id: `object-${object.id}`,
            date: new Date(object.creationDate),
            data: object,
        })),
    ].sort((a, b) => b.date - a.date);

    /* ===========================
       ANIMATIONS
    =========================== */
    const NAVBAR_HEIGHT = 90;
    const SCAN_BTN_HIDE_X = 120;

    const navbarTranslateY = useRef(new Animated.Value(0)).current;
    const scanBtnTranslateX = useRef(new Animated.Value(0)).current;
    const lastScrollY = useRef(0);

    const handleScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        const diff = y - lastScrollY.current;

        if (diff > 10) {
            Animated.parallel([
                Animated.timing(navbarTranslateY, {
                    toValue: NAVBAR_HEIGHT,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scanBtnTranslateX, {
                    toValue: SCAN_BTN_HIDE_X,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else if (diff < -10) {
            Animated.parallel([
                Animated.timing(navbarTranslateY, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scanBtnTranslateX, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }

        lastScrollY.current = y;
    };

    /* ===========================
       RENDER
    =========================== */
    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            {/* NAVBAR */}
            <Animated.View
                pointerEvents="box-none"
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    transform: [{ translateY: navbarTranslateY }],
                    zIndex: 100,
                }}
            >
                <Navbar />
            </Animated.View>

            {/* SCAN BUTTON */}
            <Animated.View
                pointerEvents="box-none"
                style={{
                    position: "absolute",
                    bottom: 10,
                    right: 16,
                    width: 72,
                    height: 72,
                    transform: [{ translateX: scanBtnTranslateX }],
                    zIndex: 99,
                }}
            >
                <ScanActionButton
                    onPress={() => router.push("/appPrincipal/codebar")}
                />
            </Animated.View>

            {/* CONTENT */}
            <View style={{ flex: 1}}>
                <Header user={user} boutonNotification userProfil userDetails />

                <View style={{ flex: 1, padding: 10, backgroundColor:"#fff"  }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#1DDE9A" />
                    ) : (
                        <ScrollView
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: NAVBAR_HEIGHT + 120,
                            }}
                        >
                            {feed.map(item => {
                                if (item.type === "post") {
                                    return (
                                        <PostCard
                                            key={item.id}
                                            post={item.data}
                                            styles={style}
                                        />
                                    );
                                }

                                if (item.type === "object") {
                                    return (
                                        <ObjectCard
                                            key={item.id}
                                            item={item.data}
                                            buttonLabel="Récuperer l'objet"
                                            onSeeObjet={() => {
                                                console.log("CLICK");
                                                router.push({
                                                    pathname: "/appPrincipal/missions",
                                                    params: {
                                                        mode: "recup",
                                                        id: item.data.id,
                                                    },
                                                });
                                            }}
                                        />

                                    );
                                }

                                return null;
                            })}
                        </ScrollView>
                    )}
                </View>
            </View>
        </View>
    );
}
