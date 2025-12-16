import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Pressable, Platform } from "react-native";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import styles from "./styles/parametresStyle";

const SETTINGS_MENU = [
    { key: "account", label: "Votre compte" },
    { key: "security", label: "Sécurité et accès au compte" },
    { key: "privacy", label: "Confidentialité et sécurité" },
    { key: "notifications", label: "Notifications" },
    { key: "accessibility", label: "Accessibilité, affichage et langues" },
    { key: "resources", label: "Ressources supplémentaires" },
];

export default function Parametres() {
    const [activeSection, setActiveSection] = useState("account");

    const renderRightPanel = () => {
        switch (activeSection) {

            case "account":
                return (
                    <>
                        <Text style={styles.rightTitle}>Votre compte</Text>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Informations du compte</Text>
                            <Text style={styles.settingDesc}>
                                Consultez les informations de votre compte comme votre numéro de téléphone et votre adresse e-mail.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Changer le mot de passe</Text>
                            <Text style={styles.settingDesc}>
                                Modifiez votre mot de passe à tout moment.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Télécharger une archive de vos données</Text>
                            <Text style={styles.settingDesc}>
                                Obtenez un aperçu des données associées à votre compte.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItemDanger}>
                            <Text style={styles.settingDanger}>Désactiver le compte</Text>
                            <Text style={styles.settingDesc}>
                                Découvrez comment désactiver temporairement ou définitivement votre compte.
                            </Text>
                        </TouchableOpacity>
                    </>
                );

            case "security":
                return (
                    <>
                        <Text style={styles.rightTitle}>Sécurité et accès au compte</Text>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Sécurité du compte</Text>
                            <Text style={styles.settingDesc}>
                                Gérez la sécurité de votre compte et protégez-le contre les accès non autorisés.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Changer le mot de passe</Text>
                            <Text style={styles.settingDesc}>
                                Mettez à jour votre mot de passe pour renforcer la sécurité de votre compte.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Authentification à deux facteurs</Text>
                            <Text style={styles.settingDesc}>
                                Ajoutez une couche de sécurité supplémentaire lors de la connexion.
                            </Text>
                        </TouchableOpacity>
                    </>
                );

            case "privacy":
                return (
                    <>
                        <Text style={styles.rightTitle}>Confidentialité et sécurité</Text>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Confidentialité du compte</Text>
                            <Text style={styles.settingDesc}>
                                Gérez qui peut voir votre contenu et interagir avec vous.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Comptes bloqués</Text>
                            <Text style={styles.settingDesc}>
                                Consultez et gérez la liste des comptes que vous avez bloqués.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Visibilité du profil</Text>
                            <Text style={styles.settingDesc}>
                                Contrôlez la visibilité de votre profil et de vos informations personnelles.
                            </Text>
                        </TouchableOpacity>
                    </>
                );

            case "notifications":
                return (
                    <>
                        <Text style={styles.rightTitle}>Notifications</Text>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Préférences de notifications</Text>
                            <Text style={styles.settingDesc}>
                                Choisissez comment et quand vous recevez des notifications.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Notifications push</Text>
                            <Text style={styles.settingDesc}>
                                Activez ou désactivez les notifications sur votre appareil.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Notifications par e-mail</Text>
                            <Text style={styles.settingDesc}>
                                Gérez les e-mails que vous recevez concernant votre activité.
                            </Text>
                        </TouchableOpacity>
                    </>
                );

            case "accessibility":
                return (
                    <>
                        <Text style={styles.rightTitle}>Accessibilité, affichage et langues</Text>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Accessibilité</Text>
                            <Text style={styles.settingDesc}>
                                Ajustez l’interface pour améliorer votre expérience d’utilisation.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Affichage</Text>
                            <Text style={styles.settingDesc}>
                                Modifiez le thème, la taille du texte et l’apparence générale.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Langue</Text>
                            <Text style={styles.settingDesc}>
                                Choisissez la langue utilisée dans l’application.
                            </Text>
                        </TouchableOpacity>
                    </>
                );

            case "resources":
                return (
                    <>
                        <Text style={styles.rightTitle}>Ressources supplémentaires</Text>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Centre d’aide</Text>
                            <Text style={styles.settingDesc}>
                                Consultez les réponses aux questions fréquentes.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Conditions d’utilisation</Text>
                            <Text style={styles.settingDesc}>
                                Lisez les règles et conditions liées à l’utilisation du service.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Politique de confidentialité</Text>
                            <Text style={styles.settingDesc}>
                                Découvrez comment vos données sont collectées et utilisées.
                            </Text>
                        </TouchableOpacity>
                    </>
                );



        default:
                return (
                    <Text style={styles.placeholder}>
                        Section en cours de construction 🚧
                    </Text>
                );
        }
    };

    return (
        <View style={styles.page}>
            {/* LEFT NAVBAR */}
            {Platform.OS === "web" && (
                <View style={styles.navbar}>
                    <Navbar />
                    <Header />

                </View>
            )}
            <View style={styles.container}>
            <Header />

                {/* CENTER SETTINGS LIST */}
            <View style={styles.center}>
                <ScrollView>
                    <Text style={styles.pageTitle}>Settings</Text>

                    {SETTINGS_MENU.map((item) => (
                        <Pressable
                            key={item.key}
                            onPress={() => setActiveSection(item.key)}
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


            {/* RIGHT DETAILS PANEL */}
            {Platform.OS === "web" && (
                <View style={styles.right}>
                    <ScrollView>{renderRightPanel()}</ScrollView>
                </View>
            )}
        </View>
    );
}
