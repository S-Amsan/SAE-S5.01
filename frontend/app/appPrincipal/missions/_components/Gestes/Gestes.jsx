import React, {useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    Pressable, Animated,
} from "react-native";
import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";
import Navbar from "../../../../../components/Navbar";
import ScanActionButton from "../../../../../components/ScanActionButton";
import {useRouter} from "expo-router";
import { fetchAllDocuments } from "../../../../../services/documents.api";
import { useEffect } from "react";


export default function Gestes({ onAssociate }) {

    const [partenaires, setPartenaires] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadDocuments = async () => {
            try {
                const data = await fetchAllDocuments();
                setPartenaires(data);
            } catch (e) {
                console.error("FETCH DOCUMENTS ERROR", e);
            } finally {
                setLoading(false);
            }
        };

        loadDocuments();
    }, []);

    const [hoveredId, setHoveredId] = useState(null);

    const router = useRouter();

    const navbarTranslateY = useRef(new Animated.Value(0)).current;
    const scanBtnTranslateX = useRef(new Animated.Value(0)).current;
    const SCAN_BTN_HIDE_X = 120; // largeur + marge
    const lastScrollY = useRef(0);
    const NAVBAR_HEIGHT = 90;

    const handleScroll = (event) => {
        const currentY = event.nativeEvent.contentOffset.y;

        if (currentY > lastScrollY.current + 5) {
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
        } else if (currentY < lastScrollY.current - 5) {
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

        lastScrollY.current = currentY;
    };

    if (isWeb) {
        return (
            <ScrollView contentContainerStyle={styles.webContainer}>
                {partenaires.map((p) => (
                    <View key={p.id} style={styles.webCard}>

                        {/* HEADER */}
                        <View style={styles.webHeader}>
                            <View style={styles.webHeaderLeft}>
                                <Image source={p.logo} style={styles.webSmallLogo} />
                                <Text style={styles.webPartnerName}>{p.name}</Text>
                            </View>

                            <View style={styles.webPointsBadge}>
                                <Text style={styles.webPointsText}>+50 000</Text>
                                <Image
                                    source={require("../../../../../assets/icones/point.png")}
                                    style={styles.webPointsIcon}
                                />
                            </View>
                        </View>

                        {/* MAIN CONTENT */}
                        <View style={styles.webContent}>
                            <Text style={styles.webTitle}>
                                Associer votre {p.id === "nous" ? "carte fidélité" : "abonnement"}{" "}
                                {p.name} à Ecoception et gagner 50 000 points
                            </Text>

                            <Text style={styles.webDescription}>
                                Vous devez fournir un justificatif{" "}
                                {p.id === "nous" ? "de fidélité" : "d’abonnement"}{" "}
                                (PDF officiel ou photo du reçu de paiement).
                            </Text>

                            <View style={styles.webActionRow}>
                                <View />

                                <Pressable
                                    disabled={p.status !== "start"}
                                    onPress={() => p.status === "start" && onAssociate?.(p)}
                                    style={[
                                        styles.webActionButton,
                                        p.status === "pending" && styles.webButtonPending,
                                        p.status === "validated" && styles.webButtonValidated,
                                    ]}
                                >
                                    <Text style={styles.webActionText}>
                                        {p.status === "start" && "Importer mon justificatif"}
                                        {p.status === "pending" && "En attente"}
                                        {p.status === "validated" && "✓ Validé"}
                                    </Text>
                                </Pressable>

                            </View>

                            <Text style={styles.webFooterText}>
                                Vos documents seront traités en toute confidentialité et supprimés après vérification
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );
    }
    if (loading) {
    return (
        <View style={{ flex: 1 }}>
            {/* CONTENU SCROLLABLE */}
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    { paddingBottom: NAVBAR_HEIGHT + 20 },
                ]}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                {partenaires.map((p) => {
                    const isHovered = hoveredId === p.id;

                    return (
                        <View
                            key={p.id}
                            onMouseEnter={() => isWeb && setHoveredId(p.id)}
                            onMouseLeave={() => isWeb && setHoveredId(null)}
                            style={[
                                styles.card,
                                isHovered,
                            ]}
                        >
                            {/* ===== LEFT (TEXTE) ===== */}
                            <View style={styles.left}>
                                <Text style={styles.name}>{p.name}</Text>
                                <Text style={styles.title}>{p.title}</Text>

                                <Pressable
                                    onPress={() => p.status === "start" && onAssociate?.(p)}
                                    style={[
                                        styles.button,
                                        p.status === "start" && styles.buttonStart,
                                        p.status === "pending" && styles.buttonPending,
                                        p.status === "validated" && styles.buttonValidated,
                                    ]}
                                >
                                    <Text style={styles.buttonText}>
                                        {p.status === "start" && "Commencer"}
                                        {p.status === "pending" && "En attente"}
                                        {p.status === "validated" && "✓ Validé"}
                                    </Text>
                                </Pressable>
                            </View>

                            {/* ===== RIGHT (IMAGE + POINTS) ===== */}
                            <View style={styles.imageWrapper}>
                                <View style={styles.pointsBadge}>
                                    <Text style={styles.pointsText}>
                                        +{p.points.toLocaleString()}
                                    </Text>
                                    <Image
                                        source={require("../../../../../assets/icones/point.png")}
                                        style={styles.pointsIcon}
                                    />
                                </View>

                                <Image source={p.logo} style={styles.logo} />
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

            {/* NAVBAR ANIMÉE */}
            <Animated.View
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
        </View>
    );
    }

}
