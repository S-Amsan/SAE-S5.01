import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import styles from "./styles/parametresStyle";
import { deleteMyAccount } from "../../../services/user.api";

/* ===== MENU GAUCHE ===== */
const SETTINGS_MENU = [
    { key: "account", label: "Votre compte" },
    { key: "security", label: "Sécurité et accès au compte" },
    { key: "privacy", label: "Confidentialité et sécurité" },
    { key: "notifications", label: "Notifications" },
    { key: "accessibility", label: "Thèmes" },
    { key: "resources", label: "Ressources supplémentaires" },
];

/* ===== DÉTAILS AVEC DESCRIPTIONS ET ROUTES ===== */
const SECTION_DETAILS = {
    account: [
        {
            id: "account-info",
            title: "Informations du compte",
            desc: "Consultez les informations de votre compte.",
            route: "/(app)/parametres/account/info",
        },
        {
            id: "account-disconnection",
            title: "Déconnexion",
            desc: "Déconnectez-vous.",
        },
        {
            id: "account-disable",
            title: "Désactiver le compte",
            desc: "Supprimer définitivement votre compte.",
            danger: true,
        },
    ],
    security: [
        {
            id: "security-password",
            title: "Changer le mot de passe",
            desc: "Renforcez la sécurité de votre compte.",
            route: "/(app)/parametres/security/password",
        },
        {
            id: "security-2fa",
            title: "Authentification à deux facteurs",
            desc: "Ajoutez une couche de sécurité.",
            route: "/(app)/parametres/security/2fa",
        },
    ],
    privacy: [
        {
            id: "privacy-account",
            title: "Confidentialité du compte",
            desc: "Gérez la visibilité de vos informations.",
            route: "/(app)/parametres/privacy/account",
        },
        {
            id: "privacy-visibility",
            title: "Visibilité du profil",
            desc: "Contrôlez la visibilité de votre profil.",
            route: "/(app)/parametres/privacy/visibility",
        },
    ],
    notifications: [
        {
            id: "notif-pref",
            title: "Préférences de notifications",
            desc: "Choisissez comment vous recevez les notifications.",
            route: "/(app)/parametres/notifications/preferences",
        },
    ],
    theme: [
        {
            id: "dark",
            title: "Sombre",
            desc: "Activer le mode nuit.",
            route: "/(app)/parametres/theme/dark",
        },
        {
            id: "light",
            title: "Clair",
            desc: "Activer le mode jour.",
            route: "/(app)/parametres/theme/light",
        },
    ],
    resources: [
        {
            id: "help",
            title: "Centre d’aide",
            desc: "Consultez les réponses aux questions fréquentes.",
            route: "/(app)/parametres/resources/help",
        },
        {
            id: "terms",
            title: "Conditions d’utilisation",
            desc: "Lisez les règles du service.",
            route: "/(app)/parametres/resources/terms",
        },
        {
            id: "privacy-policy",
            title: "Politique de confidentialité",
            desc: "Découvrez comment vos données sont utilisées.",
            route: "/(app)/parametres/resources/policy",
        },
    ],
};

export default function ParametresWeb() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("account");
    const [activeSetting, setActiveSetting] = useState(null);

    const logout = async () => {
        await AsyncStorage.removeItem("@auth_token");
        await AsyncStorage.removeItem("@auth_email");
        await AsyncStorage.removeItem("@auth_user");
        router.replace("/Login");
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteMyAccount();
            await logout();
        } catch {
            Alert.alert("Erreur", "Impossible de supprimer le compte");
        }
    };

    const confirmDisableAccount = () => {
        const confirmed = window.confirm("Désactiver le compte : Êtes-vous sûr de vouloir désactiver votre compte ?");

        if (confirmed) {
            handleDeleteAccount();
        }
    };

    /* ===== ITEM DROIT CORRIGÉ ===== */
    const SettingItem = ({ id, title, desc, danger, route }) => (
        <Pressable
            onPress={() => {
                setActiveSetting(id);

                if (id === "account-disconnection") {
                    logout();
                } else if (id === "account-disable") {
                    confirmDisableAccount();
                } else if (route) {
                    // On ne push que si une route est définie
                    router.push(route);
                }
            }}
            style={({ hovered }) => [
                danger ? styles.settingItemDanger : styles.settingItem,
                hovered && styles.settingItemHover,
                activeSetting === id && styles.settingItemActive,
            ]}
        >
            <Text style={danger ? styles.settingDanger : styles.settingTitle}>
                {title}
            </Text>
            {desc && <Text style={styles.settingDesc}>{desc}</Text>}
        </Pressable>
    );

    const renderRightPanel = () => (
        <>
            <Text style={styles.rightTitle}>
                {SETTINGS_MENU.find((s) => s.key === activeSection)?.label}
            </Text>
            {SECTION_DETAILS[activeSection]?.map((item) => (
                <SettingItem key={item.id} {...item} />
            ))}
        </>
    );

    return (
        <View style={styles.page}>
            <View style={styles.navbar}>
                <Navbar />
                <Header />
            </View>

            <View style={styles.container}>
                <Header />
                <View style={styles.center}>
                    <ScrollView>
                        <Text style={styles.pageTitle}>Paramètres</Text>
                        {SETTINGS_MENU.map((item) => (
                            <Pressable
                                key={item.key}
                                id={item.id}
                                onPress={() => {
                                    setActiveSection(item.key);
                                    setActiveSetting(null);
                                }}
                                style={({ hovered }) => [
                                    styles.menuItem,
                                    hovered && styles.menuItemHover,
                                    activeSection === item.key && styles.menuItemActive,
                                ]}
                            >
                                <Text style={[
                                    styles.menuLabel,
                                    activeSection === item.key && styles.menuLabelActive,
                                ]}>
                                    {item.label}
                                </Text>
                                <Text style={styles.chevron}>›</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.right}>
                <ScrollView>{renderRightPanel()}</ScrollView>
            </View>
        </View>
    );
}