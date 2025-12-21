import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, usePathname } from "expo-router";
import { useWindowDimensions } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchUserByEmail } from "../services/user.api";

import IconAccueil from "../assets/icones/Navbar/Acceuil.png";
import IconMission from "../assets/icones/Navbar/Mission.png";
import IconNotif from "../assets/icones/Navbar/Notification.png";
import IconBoutique from "../assets/icones/Navbar/Boutique.png";
import IconParam from "../assets/icones/Navbar/Parametres.png";
import IconQrCode from "../assets/icones/Navbar/QrCode.png";
import IconTrophy from "../assets/icones/Navbar/Social.png";

import IconAccueilOn from "../assets/icones/Navbar/AccueilOn.png";
import IconMissionOn from "../assets/icones/Navbar/MissionOn.png";
import IconNotifOn from "../assets/icones/Navbar/NotificationOn.png";
import IconBoutiqueOn from "../assets/icones/Navbar/BoutiqueOn.png";
import IconParamOn from "../assets/icones/Navbar/ParametresOn.png";
import IconQrCodeOn from "../assets/icones/Navbar/QrCodeOn.png";
import IconTrophyOn from "../assets/icones/Navbar/SocialOn.png";

import ProfilCard from "./ProfilCard";
import mobileStyles from "./styles/StyleNavbar.native";
import { isWeb } from "../utils/platform";
import { getStyles } from "./styles/StyleNavbar.web";

function UserCard({ user }) {
    console.log("USER CARD PHOTO:", user?.photoProfileUrl);

    return (
        <ProfilCard
            photo={user?.photoProfileUrl ?? null}
            name={user?.name}
            username={user?.pseudo}
        />
    );
}

export default function Navbar() {
    const { width, height } = useWindowDimensions();
    const styles = isWeb ? getStyles(width, height) : mobileStyles;

    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loadUser() {
            try {
                const email = await AsyncStorage.getItem("@auth_email");
                console.log("AUTH EMAIL:", email);

                if (!email) return;

                const user = await fetchUserByEmail(email);
                console.log("USER FETCHED:", user);

                setUser(user);
            } catch (e) {
                console.error("Erreur chargement user :", e);
            }
        }

        loadUser();
    }, []);


    console.log("RENDER USER:", user);
    console.log("RENDER PHOTO URL:", user?.photoProfileUrl);

    const tabs = [
        { id: "accueil", label: "Accueil", Icon: IconAccueil, IconActive: IconAccueilOn },
        { id: "missions", label: "Missions", Icon: IconMission, IconActive: IconMissionOn },
        { id: "social", label: "Social", Icon: IconTrophy, IconActive: IconTrophyOn },
        { id: "boutique", label: "Boutique", Icon: IconBoutique, IconActive: IconBoutiqueOn },
        { id: "codebar", label: "QR Code", Icon: IconQrCode, IconActive: IconQrCodeOn },
        { id: "notifications", label: "Notifications", Icon: IconNotif, IconActive: IconNotifOn },
        { id: "parametres", label: "Paramètres", Icon: IconParam, IconActive: IconParamOn }
    ];

    // ---------------- WEB ----------------
    if (isWeb) {
        return (
            <LinearGradient colors={["#1DDE9A", "#1FDDA0"]} style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                    <View style={styles.titleContainer}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>EcoCeption</Text>
                    </View>

                    <View style={styles.tabsContainer}>
                        {tabs.map(tab => {
                            const isActive = pathname.startsWith(`/appPrincipal/${tab.id}`);
                            const IconComponent = isActive ? tab.IconActive : tab.Icon;

                            return (
                                <TouchableOpacity
                                    key={tab.id}
                                    style={styles.tabs}
                                    onPress={() => router.push(`/appPrincipal/${tab.id}`)}
                                >
                                    <Image
                                        source={IconComponent}
                                        style={[styles.Icon, !isActive && { opacity: 0.45 }]}
                                    />
                                    <Text
                                        style={[
                                            styles.IconText,
                                            isActive
                                                ? { color: "#FFF", fontWeight: "600" }
                                                : { color: "#107956" }
                                        ]}
                                    >
                                        {tab.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {user && <UserCard user={user} />}
                </ScrollView>
            </LinearGradient>
        );
    }

    // ---------------- MOBILE ----------------
    return (
        <View style={styles.container}>
            {tabs.slice(0, 4).map(tab => {
                const isActive = pathname.startsWith(`/appPrincipal/${tab.id}`);
                const IconComponent = isActive ? tab.IconActive : tab.Icon;

                return (
                    <Pressable
                        key={tab.id}
                        style={{ alignItems: "center", opacity: isActive ? 1 : 0.45 }}
                        onPress={() => !isActive && router.push(`/appPrincipal/${tab.id}`)}
                    >
                        <Image source={IconComponent} style={{ width: 25, height: 25 }} />
                        <Text style={{ fontSize: 11, color: isActive ? "#FFF" : "#000" }}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
