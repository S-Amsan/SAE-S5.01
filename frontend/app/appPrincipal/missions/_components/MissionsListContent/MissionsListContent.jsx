import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Animated,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";
import Navbar from "../../../../../components/Navbar";
import ScanActionButton from "../../../../../components/ScanActionButton";

import { getAllObjects } from "../../../../../services/objects.api";
import { fetchUserById } from "../../../../../services/user.api";
import { formatRelativeTime } from "../../../../../utils/format";

/* ===========================
   CARD OBJET
=========================== */
function ObjectCard({ item, onSeeObjet }) {
    const [avatar, setAvatar] = useState(null);
    const [pseudo, setPseudo] = useState(null);

    useEffect(() => {
        if (!item?.publisher_user_id) return;

        const loadUser = async () => {
            try {
                const user = await fetchUserById(item.publisher_user_id);
                setAvatar(user.photoProfileUrl);
                setPseudo(user.pseudo);
            } catch (e) {
                console.error(e);
            }
        };

        loadUser();
    }, [item?.publisher_user_id]);

    return (
        <View style={styles.card}>
            {/* IMAGE */}
            <Image
                source={{ uri: item.photoUrl }}
                style={styles.image}
            />

            {/* CONTENU CENTRAL */}
            <View style={styles.body}>
                {/* TITRE + DISTANCE */}
                <View style={styles.topRow}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <Text style={styles.distance}>
                        • {formatRelativeTime(item.creationDate)}
                    </Text>

                </View>

                {/* USER */}
                <View style={styles.userRow}>
                    {avatar && (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    )}
                    <Text style={styles.userText}>
                        @{pseudo}
                    </Text>
                </View>

                {/* ADRESSE */}
                <Text style={styles.address}>
                    📍 {item.address}
                </Text>
            </View>

            {/* COLONNE DROITE */}
            <View style={styles.right}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSeeObjet(item)}
                >
                    <Text style={styles.buttonText}>Récupérer</Text>
                </TouchableOpacity>
            </View>
        </View>


    );
}

/* ===========================
   INFO CARD
=========================== */
function InfoCard({ title, description, button, image, onPress }) {
    return (
        <View style={styles.infoCard}>
            <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>{title}</Text>
                <Text style={styles.infoDesc}>{description}</Text>

                <TouchableOpacity
                    style={styles.infoButton}
                    onPress={onPress}
                >
                    <Text style={styles.infoButtonText}>{button}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageWrapper}>
                <Image source={image} style={styles.infoImage} />
            </View>
        </View>
    );
}

/* ===========================
   PAGE MISSIONS
=========================== */
export default function MissionsPage({ onPostObjet, onSeeObjet }) {
    const router = useRouter();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadObjects = async () => {
            try {
                const data = await getAllObjects();

                const availableObjects = Array.isArray(data)
                    ? data.filter(
                        o => o.picked_up_user_id === null
                    )
                    : [];

                console.log("AVAILABLE OBJECTS:", availableObjects);

                setItems(availableObjects);
            } catch (e) {
                console.error("Erreur chargement objets", e);
            }
        };

        loadObjects();
    }, []);




    /* ===== ANIMATIONS MOBILE ===== */
    const navbarTranslateY = useRef(new Animated.Value(0)).current;
    const scanBtnTranslateX = useRef(new Animated.Value(0)).current;
    const lastScrollY = useRef(0);
    const NAVBAR_HEIGHT = 90;

    const handleScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;

        Animated.parallel([
            Animated.timing(navbarTranslateY, {
                toValue: y > lastScrollY.current ? NAVBAR_HEIGHT : 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scanBtnTranslateX, {
                toValue: y > lastScrollY.current ? 120 : 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        lastScrollY.current = y;
    };

    /* ===== WEB ===== */
    if (isWeb) {
        return (
            <View style={styles.page}>
                <View style={styles.left}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Objets à récupérer autour de vous
                        </Text>
                    </View>

                    <ScrollView>
                        {items.map(item => (
                            <ObjectCard
                                key={item.id}
                                item={item}
                                onSeeObjet={onSeeObjet}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* 👉 INFO CARDS WEB */}
                <View style={styles.rightPanel}>
                    <InfoCard
                        title="Scanner un QR code et poster"
                        description="Scanner le QR code d’un partenaire puis prenez le produit en photo."
                        button="Commencer"
                        image={require("../../../../../assets/missions/scan.png")}
                        onPress={() => router.push("/appPrincipal/codebar")}
                    />

                    <InfoCard
                        title="Objets abandonnés"
                        description="Poster des objets abandonnés pour leur donner une seconde vie."
                        button="Commencer"
                        image={require("../../../../../assets/missions/objet.png")}
                        onPress={onPostObjet}
                    />
                </View>
            </View>
        );
    }

    /* ===== MOBILE ===== */
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: NAVBAR_HEIGHT + 20 }}
            >
                {/* 👉 INFO CARDS MOBILE */}
                <View style={styles.infoBox}>
                    <InfoCard
                        title="Scanner un QR code et poster"
                        description="Scanner le QR code d’un partenaire puis prenez le produit en photo."
                        button="Commencer"
                        image={require("../../../../../assets/missions/scan.png")}
                        onPress={() => router.push("/appPrincipal/codebar")}
                    />

                    <InfoCard
                        title="Objets abandonnés"
                        description="Poster des objets abandonnés pour leur donner une seconde vie."
                        button="Commencer"
                        image={require("../../../../../assets/missions/objet.png")}
                        onPress={onPostObjet}
                    />
                </View>

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Objets à récupérer autour de vous
                    </Text>
                </View>

                {items.map(item => (
                    <ObjectCard
                        key={item.id}
                        item={item}
                        onSeeObjet={onSeeObjet}
                    />
                ))}
            </ScrollView>

            <Animated.View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    transform: [{ translateY: navbarTranslateY }],
                }}
            >
                <Navbar />
            </Animated.View>

            <Animated.View
                style={{
                    position: "absolute",
                    bottom: 10,
                    right: 16,
                    transform: [{ translateX: scanBtnTranslateX }],
                }}
            >
                <ScanActionButton
                    onPress={() => router.push("/appPrincipal/codebar")}
                />
            </Animated.View>
        </View>
    );
}
