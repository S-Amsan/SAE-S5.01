import React, {useRef, useState} from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity, Animated,
} from "react-native";
import styles from "./styles/styles";
import { isWeb } from "../../../../../utils/platform";
import { useLocalSearchParams, useRouter } from "expo-router";
import Navbar from "../../../../../components/Navbar";
import ScanActionButton from "../../../../../components/ScanActionButton";

export default function MissionsPage({ onPostObjet }) {

    const router = useRouter();

    const items = [
        {
            id: 1,
            title: "Barbecue",
            address: "96 Av. de La Liberté Tunis",
            distance: "5 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/missions/scan.png"),
            description:"Venez me récuperer"
        },
        {
            id: 2,
            title: "Équipements maison",
            address: "96 Av. de La Liberté Tunis",
            distance: "13 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/missions/objet.png"),
        },
        {
            id: 3,
            title: "Canapé",
            address: "96 Av. de La Liberté Tunis",
            distance: "18 km",
            author: "@Maitre",
            time: "hier",
            image: require("../../../../../assets/missions/scan.png"),
        },

        {
            id: 4,
            title: "Équipements maison",
            address: "96 Av. de La Liberté Tunis",
            distance: "13 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/missions/objet.png"),
        },
        {
            id: 5,
            title: "Canapé",
            address: "96 Av. de La Liberté Tunis",
            distance: "18 km",
            author: "@Maitre",
            time: "hier",
            image: require("../../../../../assets/missions/scan.png"),
        },
        {
            id: 6,
            title: "Équipements maison",
            address: "96 Av. de La Liberté Tunis",
            distance: "13 km",
            author: "@Maitre",
            time: "2 min",
            image: require("../../../../../assets/missions/objet.png"),
        },
        {
            id: 7,
            title: "Canapé",
            address: "96 Av. de La Liberté Tunis",
            distance: "18 km",
            author: "@Maitre",
            time: "hier",
            image: require("../../../../../assets/missions/scan.png"),
        },
    ];

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
            <View style={styles.page}>
                <View style={styles.left}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Objets à récupérer autour de vous
                        </Text>
                    </View>

                    <ScrollView showsVerticalScrollIndicator style={{backgroundColor:"#fff"}}>
                        <View>
                        {items.map(item => (
                            <View key={item.id} style={styles.card}>
                                <Image source={item.image} style={styles.image}/>

                                <View style={styles.content}>
                                    <View style={styles.content1}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.address}>📍 {item.address}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.meta}>
                                            {item.author} • {item.time}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.describe}>
                                            {item.description}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.right}>
                                    <Text style={styles.distance}>{item.distance}</Text>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>
                                            Voir l’objet
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                        </View>
                    </ScrollView>
                </View>

                    <View style={styles.rightPanel}>
                        <View style={styles.info}>
                            <Text>
                                Comment sa marche ?
                            </Text>
                            </View>
                        <View style={styles.Container}>
                            <InfoCard
                                title="Scanner un QR code et poster"
                                description="Scanner le QR code d’un partenaire puis prenez le produit en photo."
                                button="Commencer"
                                image={require("../../../../../assets/missions/scan.png")}
                                onPress={() => {
                                    console.log("CLICK SCAN");
                                    router.push("/appPrincipal/codebar");
                                }}
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
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* CONTENU SCROLLABLE */}
            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: NAVBAR_HEIGHT + 20, // espace pour la navbar
                }}
            >
                {/* HEADER INFO */}
                <InfoHeader
                    title="Parrainer un ami +1000/filleul"
                    image={require("../../../../../assets/missions/parrainage.png")}
                />

                {/* INFO CARDS */}
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

                {/* LIST HEADER */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Objets à récupérer autour de vous
                    </Text>
                </View>

                {/* LIST */}
                {items.map(item => (
                    <View key={item.id} style={styles.card}>
                        <Image source={item.image} style={styles.image} />

                        <View style={styles.content}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.address}>📍 {item.address}</Text>
                            <Text style={styles.meta}>
                                {item.author} • {item.time}
                            </Text>
                            {item.description && (
                                <Text style={styles.describe}>{item.description}</Text>
                            )}
                        </View>

                        <View style={styles.right}>
                            <Text style={styles.distance}>{item.distance}</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Voir l’objet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* NAVBAR ANIMÉE (AU-DESSUS DU SCROLL) */}
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


function InfoHeader({ title, description,image}) {
    return (
        <View style={styles.infoHeader}>
            <View style={styles.spship}>
            <View style={{justifyContent:'center'}}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View>
            <Image
                source={image}
                style={styles.HeaderImage}
                resizeMode="contain"
            />
        </View>
        </View>
        </View>
    );
}
