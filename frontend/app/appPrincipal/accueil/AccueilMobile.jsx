import React, { useEffect, useState, useRef } from "react";
import {
    View,
    ScrollView,
    ActivityIndicator,
    Animated,
} from "react-native";
import { useRouter } from "expo-router";

import Header from "../../../components/Header";
import PostCard from "./Post/PostCard";
import style from "./styles/accueilStyle";
import Navbar from "../../../components/Navbar";
import ScanActionButton from "../../../components/ScanActionButton";
import { loadUser as loadUserFromStorage } from "../../../services/RegisterStorage";

export default function AccueilMobile() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const NAVBAR_HEIGHT = 90;
    const SCAN_BTN_HIDE_X = 120;

    const navbarTranslateY = useRef(new Animated.Value(0)).current;
    const scanBtnTranslateX = useRef(new Animated.Value(0)).current;
    const lastScrollY = useRef(0);

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

            {/* CONTENU */}
            <View style={{ flex: 1 }}>
                <Header user={user} boutonNotification userProfil userDetails />

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

                <View style={{ flex: 1, padding: 10 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#1DDE9A" />
                    ) : (
                        <ScrollView
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: NAVBAR_HEIGHT + 120,
                                minHeight: "100%",
                            }}
                        >
                            {posts.map((p) => (
                                <PostCard key={p.id} post={p} styles={style} />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </View>
        </View>
    );
}
