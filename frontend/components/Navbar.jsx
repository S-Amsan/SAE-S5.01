import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, usePathname } from "expo-router";

import { loadUser } from "../services/RegisterStorage";

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
import style from "./styles/StyleNavbar";

const BASE_URL = "http://localhost:8080/uploads/";


// ------------------------------
// Correct UserCard
// ------------------------------
function UserCard({ user }) {
    return (
        <ProfilCard
            photo={BASE_URL + user.photoProfile}
            name={user.name}
            username={user.pseudo}
        />
    );
}


// ------------------------------
// NAVBAR PRINCIPALE
// ------------------------------
export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const u = await loadUser();
            console.log("Utilisateur chargé Navbar :", u);
            setUser(u);
        }
        fetchUser();
    }, []);

    const tabs = [
        { id: "accueil", label: "Accueil", Icon: IconAccueil, IconActive: IconAccueilOn },
        { id: "missions", label: "Missions", Icon: IconMission, IconActive: IconMissionOn },
        { id: "social", label: "Social", Icon: IconTrophy, IconActive: IconTrophyOn },
        { id: "boutique", label: "Boutique", Icon: IconBoutique, IconActive: IconBoutiqueOn },
        { id: "qrcode", label: "QR Code", Icon: IconQrCode, IconActive: IconQrCodeOn },
        { id: "notifications", label: "Notifications", Icon: IconNotif, IconActive: IconNotifOn },
        { id: "parametres", label: "Paramètres", Icon: IconParam, IconActive: IconParamOn },
    ];


    // ---------------- WEB ----------------
    if (Platform.OS === "web") {
        return (
            <LinearGradient colors={["#1DDE9A", "#1FDDA0"]} style={style.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

                    <View style={style.titleContainer}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={style.logo}
                            resizeMode="contain"
                        />
                        <Text style={style.title}>EcoCeption</Text>
                    </View>

                    <View style={style.tabsContainer}>
                        {tabs.map((tab) => {
                            const isActive = pathname === `/appPrincipal/${tab.id}`;
                            const IconComponent = isActive ? tab.IconActive : tab.Icon;

                            return (
                                <TouchableOpacity
                                    key={tab.id}
                                    style={style.tabs}
                                    activeOpacity={0.7}
                                    onPress={() => router.push(`/appPrincipal/${tab.id}`)}
                                >
                                    <Image
                                        source={IconComponent}
                                        style={[style.Icon, !isActive && { opacity: 0.45 }]}
                                    />

                                    <Text
                                        style={[
                                            style.IconText,
                                            isActive
                                                ? { color: "#FFFFFF", fontWeight: "600" }
                                                : { color: "#107956", fontWeight: "400" }
                                        ]}
                                    >
                                        {tab.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Carte utilisateur */}
                    {user && <UserCard user={user} />}

                </ScrollView>
            </LinearGradient>
        );
    }


    // ---------------- MOBILE ----------------
    return (
        <View style={style.containerMobile}>
            {tabs.slice(0, 4).map((tab) => {
                const isActive = pathname === `/appPrincipal/${tab.id}`;
                const IconComponent = isActive ? tab.IconActive : tab.Icon;

                return (
                    <Pressable
                        key={tab.id}
                        style={[{ alignItems: "center" }, !isActive && { opacity: 0.45 }]}
                        onPress={() => !isActive && router.push(`/appPrincipal/${tab.id}`)}
                    >
                        <Image source={IconComponent} style={{ width: 25, height: 25 }} />
                        <Text style={[{ fontSize: 11 }, isActive && { color: "#FFFFFF" }]}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
