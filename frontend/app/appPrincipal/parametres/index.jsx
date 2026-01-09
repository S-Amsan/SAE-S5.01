import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import styles from "./styles/parametresStyle";

const SETTINGS_MENU = [
    { key: "account", label: "Votre compte" },
    { key: "security", label: "Sécurité et accès au compte" },
    { key: "privacy", label: "Confidentialité et sécurité" },
    { key: "notifications", label: "Notifications" },
    { key: "accessibility", label: "Accessibilité, affichage et langues" },
    { key: "resources", label: "Ressources supplémentaires" },
];

export default function Index() {
    const [activeSection, setActiveSection] = useState("account");
    const [activeSetting, setActiveSetting] = useState(null);

    const SettingItem = ({ id, title, desc, danger = false }) => (
        <Pressable
            onPress={() => setActiveSetting(id)}
            style={({ hovered }) => [
                danger ? styles.settingItemDanger : styles.settingItem,
                hovered && styles.settingItemHover,
                activeSetting === id && styles.settingItemActive,
            ]}
        >
            <Text style={danger ? styles.settingDanger : styles.settingTitle}>
                {title}
            </Text>
            <Text style={styles.settingDesc}>{desc}</Text>
        </Pressable>
    );

    const renderRightPanel = () => {
        switch (activeSection) {
            case "account":
                return (
                    <>
                        <Text style={styles.rightTitle}>Votre compte</Text>
                        <SettingItem
                            id="account-info"
                            title="Informations du compte"
                            desc="Consultez les informations de votre compte comme votre numéro de téléphone et votre adresse e-mail."
                        />
                        <SettingItem
                            id="account-password"
                            title="Changer le mot de passe"
                            desc="Modifiez votre mot de passe à tout moment."
                        />
                        <SettingItem
                            id="account-data"
                            title="Télécharger une archive de vos données"
                            desc="Obtenez un aperçu des données associées à votre compte."
                        />
                        <SettingItem
                            id="account-disable"
                            title="Désactiver le compte"
                            desc="Découvrez comment désactiver temporairement ou définitivement votre compte."
                            danger
                        />
                    </>
                );

            case "security":
                return (
                    <>
                        <Text style={styles.rightTitle}>Sécurité et accès au compte</Text>
                        <SettingItem
                            id="security-main"
                            title="Sécurité du compte"
                            desc="Gérez la sécurité de votre compte et protégez-le contre les accès non autorisés."
                        />
                        <SettingItem
                            id="security-password"
                            title="Chanaaaaager le mot de passe"
                            desc="Mettez à jour votre mot de passe pour renforcer la sécurité de votre compte."
                        />
                        <SettingItem
                            id="security-2fa"
                            title="Authentification à deux facteurs"
                            desc="Ajoutez une couche de sécurité supplémentaire lors de la connexion."
                        />
                    </>
                );

            case "privacy":
                return (
                    <>
                        <Text style={styles.rightTitle}>Confidentialité et sécurité</Text>
                        <SettingItem
                            id="privacy-account"
                            title="Confidentialité du compte"
                            desc="Gérez qui peut voir votre contenu et interagir avec vous."
                        />
                        <SettingItem
                            id="privacy-blocked"
                            title="Comptes bloqués"
                            desc="Consultez et gérez la liste des comptes que vous avez bloqués."
                        />
                        <SettingItem
                            id="privacy-visibility"
                            title="Visibilité du profil"
                            desc="Contrôlez la visibilité de votre profil et de vos informations personnelles."
                        />
                    </>
                );

            case "notifications":
                return (
                    <>
                        <Text style={styles.rightTitle}>Notifications</Text>
                        <SettingItem
                            id="notif-pref"
                            title="Préférences de notifications"
                            desc="Choisissez comment et quand vous recevez des notifications."
                        />
                        <SettingItem
                            id="notif-push"
                            title="Notifications push"
                            desc="Activez ou désactivez les notifications sur votre appareil."
                        />
                        <SettingItem
                            id="notif-mail"
                            title="Notifications par e-mail"
                            desc="Gérez les e-mails que vous recevez concernant votre activité."
                        />
                    </>
                );

            case "accessibility":
                return (
                    <>
                        <Text style={styles.rightTitle}>Accessibilité, affichage et langues</Text>
                        <SettingItem
                            id="accessibility"
                            title="Accessibilité"
                            desc="Ajustez l’interface pour améliorer votre expérience d’utilisation."
                        />
                        <SettingItem
                            id="display"
                            title="Affichage"
                            desc="Modifiez le thème, la taille du texte et l’apparence générale."
                        />
                        <SettingItem
                            id="language"
                            title="Langue"
                            desc="Choisissez la langue utilisée dans l’application."
                        />
                    </>
                );

            case "resources":
                return (
                    <>
                        <Text style={styles.rightTitle}>Ressources supplémentaires</Text>
                        <SettingItem
                            id="help"
                            title="Centre d’aide"
                            desc="Consultez les réponses aux questions fréquentes."
                        />
                        <SettingItem
                            id="terms"
                            title="Conditions d’utilisation"
                            desc="Lisez les règles et conditions liées à l’utilisation du service."
                        />
                        <SettingItem
                            id="privacy-policy"
                            title="Politique de confidentialité"
                            desc="Découvrez comment vos données sont collectées et utilisées."
                        />
                    </>
                );

            default:
                return <Text style={styles.placeholder}>Section en cours de construction 🚧</Text>;
        }
    };

    return (
        <View style={styles.page}>
            {Platform.OS === "web" && (
                <View style={styles.navbar}>
                    <Navbar />
                    <Header />
                </View>
            )}

            <View style={styles.container}>
                <Header />
                <View style={styles.center}>
                    <ScrollView>
                        <Text style={styles.pageTitle}>Paramètres</Text>
                        {SETTINGS_MENU.map((item) => (
                            <Pressable
                                key={item.key}
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
                                <Text
                                    style={[
                                        styles.menuLabel,
                                        activeSection === item.key && styles.menuLabelActive,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                                <Text style={styles.chevron}>›</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </View>

            {Platform.OS === "web" && (
                <View style={styles.right}>
                    <ScrollView>{renderRightPanel()}</ScrollView>
                </View>
            )}
        </View>
    );
}
