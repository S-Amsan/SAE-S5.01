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
import {fetchAllCards} from "../../../../../services/cards.api";


export default function Gestes({ onAssociate }) {

    const [partenaires, setPartenaires] = useState([]);
    const [loading, setLoading] = useState(true);

    function mergeCardsWithDocuments(cards, documents) {
        const docByCardId = new Map(
            documents.map(doc => [doc.card.id, doc])
        );

        return cards.map(card => ({
            ...card,
            document: docByCardId.get(card.id) ?? null,
        }));
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const [cards, documents] = await Promise.all([
                    fetchAllCards(),
                    fetchAllDocuments(),
                ]);

                console.log("CARDS:", cards);
                console.log("DOCUMENTS:", documents);


                const merged = mergeCardsWithDocuments(cards, documents);

                setPartenaires(merged);
            } catch (e) {
                console.error("LOAD DATA ERROR", e);
            } finally {
                setLoading(false);
            }
        };

        loadData();
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
                {partenaires.map((p) => {
                    const docState = p.document?.state ?? "NONE";

                    return (
                        <View key={p.id} style={styles.webCard}>


                        {/* HEADER */}
                        <View style={styles.webHeader}>
                            <View style={styles.webHeaderLeft}>
                                <Image
                                    source={{ uri: p.photoUrl }}
                                    style={styles.webSmallLogo}
                                />
                                <Text style={styles.webTitle}>{p.title}</Text>
                            </View>

                            <View style={styles.webPointsBadge}>
                                <Text style={styles.webPointsText}>
                                    +{p.points.toLocaleString()}
                                </Text>
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
                                    disabled={docState === "VALIDATED"}
                                    style={[
                                        styles.webActionButton,
                                        docState === "WAITING" && styles.webButtonPending,
                                        docState === "VALIDATED" && styles.webButtonValidated,
                                        docState === "REJECTED" && styles.webButtonRejected,
                                    ]}
                                    onPress={() => {
                                        if (!p.document) {
                                            onAssociate?.(p);
                                        }
                                    }}
                                >
                                    <Text style={styles.webActionText}>
                                        {docState === "NONE" && "Importer mon justificatif"}
                                        {docState === "WAITING" && "En attente"}
                                        {docState === "VALIDATED" && "✓ Validé"}
                                        {docState === "REJECTED" && "Refusé"}
                                    </Text>
                                </Pressable>
                            </View>

                            <Text style={styles.webFooterText}>
                                Vos documents seront traités en toute confidentialité et supprimés après vérification
                            </Text>
                        </View>
                    </View>
                    )
                })}
            </ScrollView>
        );
    }
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Chargement...</Text>
            </View>
        );
    }

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
                    const docState = p.document?.state ?? "NONE";
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
                                <Text style={styles.name}>{p.title}</Text>
                                <Text style={styles.title}>{p.description}</Text>

                                <Pressable
                                    disabled={docState === "VALIDATED"}
                                    style={[
                                        styles.ActionButton,
                                        docState === "WAITING" && styles.buttonPending,
                                        docState === "VALIDATED" && styles.buttonValidated,
                                        docState === "REJECTED" && styles.buttonRejected,
                                    ]}
                                    onPress={() => {
                                        if (!p.document) {
                                            onAssociate?.(p);
                                        }
                                    }}
                                >
                                    <Text style={styles.webActionText}>
                                        {docState === "NONE" && "Importer mon justificatif"}
                                        {docState === "WAITING" && "En attente"}
                                        {docState === "VALIDATED" && "✓ Validé"}
                                        {docState === "REJECTED" && "Refusé"}
                                    </Text>
                                </Pressable>
                            </View>

                            {/* ===== RIGHT (IMAGE + POINTS) ===== */}
                            <View style={styles.imageWrapper}>
                                <View style={styles.pointsBadge}>
                                    <Text style={styles.pointsText}>
                                        +{p.trophies.toLocaleString()}
                                    </Text>
                                    <Image
                                        source={require("../../../../../assets/icones/point.png")}
                                        style={styles.pointsIcon}
                                    />
                                </View>

                                <Image source={{ uri: p.photoUrl }} style={styles.logo} />
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
