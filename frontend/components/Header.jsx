import {View, Text, TouchableOpacity, TextInput, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useNotification } from "../app/(app)/notifications/NotificationContext.jsx";
import styles from "./styles/stylesHeader";
import React, {useState} from "react";
import {useNavigation, useRouter} from "expo-router";

import point from "../assets/icones/point.png";
import trophee from "../assets/icones/trophee.png";
import flamme from "../assets/icones/flamme.png";

import parametres from "../assets/icones/Header/parametres.png";
import notificationPastille from "../assets/icones/Header/notificationPastille.png";
import notificationSansPastille from "../assets/icones/Header/notificationSansPastille.png";
import DEFAULT_PICTURE from "../assets/icones/default_picture.jpg";

import {formatNombreCourt} from "../utils/format";
import {isWeb} from "../utils/platform";

import {fetchMyStats, fetchUserStats} from "../services/user.api";

export default function Header({
       recherche, setRecherche,  //Barre de recherche (web)
       filtres, setFiltres, // filtre de la barre de recherche (web)

       onglets, ongletActifId, setOngletActif, // onglet (web)

       titre, // titre dans le header (mobile)
       boutonRetour = false, onBack, // bouton retour (mobile)
       boutonParametres = false,  // bouton parametre (mobile)
       boutonNotification = false,  // bouton notification (mobile)
       userProfil = false, // photo de profil de l'utilisateur (mobile)
       userDetails = false, // info de l'utilisateur (web et mobile)
       fondTransparent = false, //pas de fond blanc et pas d'ombre (mobile)
       user
}) {

    const router = useRouter();
    const navigation = useNavigation();
    const {openNotifications} = useNotification();

    // Filtre actuellement ouvert
    const [filtreActif, setFiltreActif] = useState(null);

    const handleSelect = (idFiltre, option) => {
        setFiltres(prev =>
            prev.map(f =>
                f.id === idFiltre ? {...f, select: option} : f
            )
        );
        setFiltreActif(null);
    };

    const [userDetailsData, setUserDetailsData] = useState([]);

    React.useEffect(() => {
        fetchMyStats().then(setUserDetailsData);
    }, []);

    const DETAILS_CONFIG = {
        flammes: {
            icon: flamme,
            color: "#fd411d",
            route: "social/votreSerie",
        },
        trophees: {
            icon: trophee,
            color: "#E7A2F0",
            route: "social/classement",
        },
        default: {
            icon: point,
            color: "#278674",
            route: "/boutique",
        },
    };

    const getDetailConfig = (type) => DETAILS_CONFIG[type] ?? DETAILS_CONFIG.default;

    const redirect = (type) => {
        router.push(getDetailConfig(type).route);
    };

    // Photo de profil
    const getPhotoDeProfil = (user) => {
        if (!user) {
            console.log("HEADER → user NULL");
            return DEFAULT_PICTURE;
        }

        const photo =
            user.photoProfileUrl ||
            user.photoProfile ||
            null;

        if (!photo) {
            console.log("HEADER → photoProfile manquante");
            return DEFAULT_PICTURE;
        }

        console.log("HEADER → photo OK :", photo);

        return { uri: photo };
    };



    // Notification
    const getNotificationIcon = () => {
        // TODO Récupérer dans la bd si il y'a des notif

        /* exemple :
           if (notifNonLue > 1) {
              return notificationPastille;
           }
        */

        return notificationSansPastille;
    }

    if (isWeb){
        return (
            <>
                {/* OVERLAY : clique extérieur */}
                {filtreActif && (
                    <TouchableOpacity
                        style={styles.overlay}
                        activeOpacity={1}
                        onPress={() => setFiltreActif(null)}
                    />
                )}
                <View style={styles.container}>

                    <View style={{flexDirection: "row", alignItems: "center", width: "100%"}}>
                        <View style={styles.sousContainer}>

                            {/* BARRE DE RECHERCHE */}
                            {setRecherche && (
                                <View style={styles.barreDeRecherche}>
                                    <Ionicons name="search" size={18} color="#777" />
                                    <TextInput
                                        placeholder="Rechercher"
                                        placeholderTextColor="#777"
                                        style={styles.rechercheInput}
                                        value={recherche}
                                        onChangeText={setRecherche}
                                    />
                                </View>
                            )}

                            {/* FILTRES */}
                            {filtres && (
                                <View style={styles.filtresContainer}>
                                    {filtres.map(filtre => (
                                        <View key={filtre.id} style={styles.filtreContainer}>

                                            {/* BOUTON DU FILTRE */}
                                            <TouchableOpacity
                                                style={styles.filtre}
                                                onPress={() =>
                                                    setFiltreActif(
                                                        filtreActif === filtre.id ? null : filtre.id
                                                    )
                                                }
                                            >
                                                <Text>{filtre.select}</Text>
                                                <Ionicons name="chevron-down" size={16} color="#000" />
                                            </TouchableOpacity>

                                            {/* MENU DÉROULANT */}
                                            {filtreActif === filtre.id && (
                                                <View style={styles.menuDeroulant}>
                                                    {filtre.options.map(option => (
                                                        <TouchableOpacity
                                                            key={option}
                                                            style={styles.option}
                                                            onPress={() => handleSelect(filtre.id, option)}
                                                        >
                                                            <Text style={option === filtre.select && styles.optionSelect}>{option}</Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                            )}

                                        </View>
                                    ))}
                                </View>
                            )}

                            {/* ONGLETS */}
                            {/* ONGLETS */}
                            {onglets && (
                                <View style={styles.ongletsContainer}>
                                    {onglets.map((onglet) => {
                                        const isActive = onglet.id === ongletActifId;

                                        return (
                                            <TouchableOpacity
                                                key={onglet.id}
                                                style={styles.ongletContainer}
                                                onPress={() => {
                                                    if (!isActive && setOngletActif) {
                                                        setOngletActif(onglet.id);
                                                    }
                                                }}
                                            >
                                                <Text
                                                    style={[
                                                        styles.ongletLabel,
                                                        isActive && styles.ongletActiveLabel,
                                                    ]}
                                                >
                                                    {onglet.label}
                                                </Text>

                                                {isActive && <View style={styles.ongletUnderline} />}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            )}

                            {/* USER DETAILS */}
                            {userDetails && (
                                <View style={styles.detailsContainer}>
                                    {userDetailsData.map(detail => {
                                        const config = getDetailConfig(detail.type);

                                        return (
                                            <TouchableOpacity
                                                key={detail.type}
                                                style={styles.detailContainer}
                                                onPress={() => redirect(detail.type)}
                                            >
                                                <Image
                                                    source={config.icon}
                                                    style={{width: 22, height: 22}}
                                                />
                                                <Text style={[styles.detailText, { color: config.color }]}>{formatNombreCourt(detail.valeur)}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </>
        );
    }
    return (<View style={fondTransparent ? styles.containerTransparent : styles.container}>
        {/* ---- GAUCHE ----- */}
        {/* BOUTON RETOUR */}
        {boutonRetour && (
            <TouchableOpacity
                style={styles.boutonRetourContainer}
                onPress={() => {
                    if (typeof onBack === "function") {
                        onBack();
                    } else {
                        router.back();
                    }
                }}
            >
                <Ionicons
                    name="chevron-back"
                    size={25}
                    color={fondTransparent ? "#FFFFFF" : "#06DA95"}
                />
                <Text
                    style={[
                        styles.boutonRetourText,
                        fondTransparent && { color: "#FFFFFF" },
                    ]}
                >
                    Retour
                </Text>
            </TouchableOpacity>
        )}


        {/* BOUTON NOTIFICATION */}
        {boutonNotification && (
            <TouchableOpacity style={styles.boutonNotificationContainer} onPress={openNotifications}>
            <Image
                    source={getNotificationIcon()}
                    style={{width: 30, height: 34}}
                />
            </TouchableOpacity>
        )}

        {/* ---- MILIEU ----- */}
        {/* USER DETAILS */}
        {userDetails && (
            <View style={styles.detailsContainer}>
                {userDetailsData.map(detail => {
                    const config = getDetailConfig(detail.type);

                    return (
                        <TouchableOpacity
                            key={detail.type}
                            style={styles.detailContainer}
                            onPress={() => redirect(detail.type)}
                        >
                            <Image
                                source={config.icon}
                                style={{width: 18, height: 18}}
                            />
                            <Text style={[styles.detailText, { color: config.color }]}>{formatNombreCourt(detail.valeur)}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )}

        {/* TITRE */}
        {titre && (
            <View style={styles.titreContainer}>
                <Text style={[styles.titre,fondTransparent && {color : "#FFFFFF"}]}>{titre}</Text>
            </View>
        )}

        {/* ---- DROITE ----- */}
        {/* BOUTON PARAMETRES*/}
        {boutonParametres && (
            <TouchableOpacity style={styles.boutonParametresContainer}
                              onPress={() => router.push("/(app)/parametres")}
            >
                <Image
                    source={parametres}
                    style={{width: 26.5, height: 25}}
                />
            </TouchableOpacity>
        )}

        {/* PHOTO DE PROFIL*/}
        {userProfil && (
            <TouchableOpacity
                style={styles.photoProfilContainer}
                onPress={() => router.push(`social/profil`)}
            >
                <Image
                    source={
                        user?.photoProfileUrl
                            ? { uri: user.photoProfileUrl }
                            : DEFAULT_PICTURE
                    }
                    style={styles.photoProfil}
                />

            </TouchableOpacity>
        )}
    </View>)
}
