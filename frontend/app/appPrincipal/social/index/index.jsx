import {Image, Pressable, ScrollView, Text, View} from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import {Ionicons} from "@expo/vector-icons";

import calendrier from "../../../../assets/icones/social/calendrier.png";
import medaille from "../../../../assets/icones/social/medaille.png";
import trophee from "../../../../assets/icones/social/trophee.png";
import cadena from "../../../../assets/icones/social/cadena.png";
import DEFAULT_PICTURE from "../../../../assets/icones/default_picture.jpg";
import tropheeIcon from "../../../../assets/icones/trophee.png";

import {formatNombreCourt,formatNombreEspace} from "../../../../utils/format";
import {tempsRestant} from "../../../../utils/temps";
import {isWeb} from "../../../../utils/platform";

import {getRequiredTrophiesByRankName,RANG_MINIMUM_EVENEMENT} from "../../../../constants/rank"

import styles from "./styles/styles";

const VoirPlusWeb = () => {
    if (isWeb) {
        return (
            <View style={styles.voirPlusContainer}>
                <Text style={styles.voirPlusText}>Voir plus</Text>
            </View>
        )
    }
    return null;
}

const VoirPlusMobile = () => {
    if (!isWeb) {
        return (
            <Ionicons name={"arrow-forward-circle-outline"} size={20}/>
        )
    }
    return null;
}

const ProfilCarte = ({onPress, user_DATA}) => {

    return (
        <Pressable style={styles.userCarteContainer} onPress={onPress}>
            <View style={styles.userInfoContainer}>
                <Image source={user_DATA?.Photo_url || DEFAULT_PICTURE} style={styles.userCartePhoto}/>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userCarteNom}>{user_DATA?.Nom || "USER_NOM"}</Text>
                    <Text style={styles.userCartePseudo}>@{user_DATA?.Pseudo || "USER_PSEUDO"}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={27} style={styles.carteIcon} />
        </Pressable>
    )
}

const Concours = ({onPress, concours_DATA, concours_user_DATA}) => {

    if (concours_DATA){
        const pointsObjectif = formatNombreEspace(concours_DATA.Points_objectif)
        const pointsRecolte = formatNombreEspace(concours_user_DATA?.Points_recolte ?? 0)

        const pourcentageDAvancement = Math.min( (concours_user_DATA?.Points_recolte ?? 0) / concours_DATA?.Points_objectif, 1);

        return (
            <Pressable style={styles.carteContainer} onPress={onPress}>
                <View style={styles.partieHautContainer}>
                    <View style={styles.titreContainer}>
                        <Image
                            source={calendrier}
                            style={styles.icon}
                        />
                        <Text style={styles.titre}>Concours mensuels</Text>
                        <VoirPlusMobile/>
                    </View>
                    <Text style={styles.tempsRestantText}>Fin dans {tempsRestant(concours_DATA.Date_fin)}</Text>
                    <Text style={styles.nomText}>{concours_DATA.Nom} <Text style={styles.etatText}>(en cours)</Text></Text>
                </View>
                {
                    concours_user_DATA ?
                        <View style={styles.avancementContainer}>
                            <Text style={styles.avancementText}><Text style={{color : "#FFD700"}}>{pointsRecolte} points</Text> récoltés sur {pointsObjectif}</Text>
                            <View style={styles.barreDAvancementContainer}>
                                <View style={{backgroundColor: "#FFD700", borderRadius : 24, width : `${pourcentageDAvancement*100}%`}}/>
                                <View style={{width : `${(1-pourcentageDAvancement)*100}%`}}/>
                            </View>
                        </View>
                        :
                        <View style={[styles.inscriptionBoutonContainer,{backgroundColor: "#FFD700"}]}>
                            <Text style={styles.inscriptionText}>S&#39;inscrire</Text>
                        </View>

                }
                <VoirPlusWeb/>
            </Pressable>
        )
    }
    return (
        <Pressable style={styles.carteContainer} onPress={onPress}>
            <View style={styles.partieHautContainer}>
                <View style={styles.titreContainer}>
                    <Image
                        source={calendrier}
                        style={styles.icon}
                    />
                    <Text style={styles.titre}>Concours mensuels</Text>
                    <VoirPlusMobile/>
                </View>
                <View style={styles.alertContainer}>
                    <Text style={styles.messageAlert}>Aucun concours disponible</Text>
                </View>
            </View>
            <VoirPlusWeb/>
        </Pressable>
    )
}

const Evenements = ({onPress, evenements_DATA, evenements_user_DATA, user_DATA}) => {

    if (evenements_DATA){
        const pointsObjectif = formatNombreEspace(evenements_DATA.Points_objectif)
        const pointsRecolte = formatNombreEspace(evenements_user_DATA?.Points_recolte ?? 0)
        const pourcentageDAvancement = Math.min( (evenements_user_DATA?.Points_recolte ?? 0) / evenements_DATA?.Points_objectif, 1);

        const tropheesMinimumRequis = getRequiredTrophiesByRankName(RANG_MINIMUM_EVENEMENT);
        const evenementAccesible = (user_DATA?.Trophees ?? 0) >= tropheesMinimumRequis

        return (
            <Pressable style={styles.carteContainer} onPress={evenementAccesible ? onPress : null}>
                {!evenementAccesible && (
                    <View style={styles.overlayWrapper}>
                        <View style={styles.overlayContainer}>
                            <Image
                                source={cadena}
                                style={{width : 14, height : 16}}
                            />
                            <Text style={styles.overlayText}>Rang Or minimum</Text>
                        </View>
                        <Text style={styles.overlaySousText}>Réservé aux joueurs Or et plus. Montez en rang pour participer et remporter ces récompenses exclusives !</Text>
                    </View>
                )}

                <View style={styles.partieHautContainer}>
                    <View style={styles.titreContainer}>
                        <Image
                            source={medaille}
                            style={styles.icon}
                        />
                        <Text style={styles.titre}>Événements</Text>
                        <VoirPlusMobile/>
                    </View>
                    <Text style={styles.tempsRestantText}>Fin dans {tempsRestant(evenements_DATA.Date_fin)}</Text>
                    <Text style={styles.nomText}>{evenements_DATA.Nom} <Text style={styles.etatText}>(en cours)</Text></Text>
                </View>
                { evenementAccesible &&
                    <>
                        {
                            evenements_user_DATA ?
                                <View style={styles.avancementContainer}>
                                    <Text style={styles.avancementText}><Text style={{color : "#e5a1ee"}}>{pointsRecolte} points</Text> récoltés sur {pointsObjectif}</Text>
                                    <View style={styles.barreDAvancementContainer}>
                                        <View style={{backgroundColor: "#e5a1ee", borderRadius : 24, width : `${pourcentageDAvancement*100}%`}}/>
                                        <View style={{width : `${(1-pourcentageDAvancement)*100}%`}}/>
                                    </View>
                                </View>
                                :
                                <View style={[styles.inscriptionBoutonContainer,{backgroundColor: "#e5a1ee"}]}>
                                    <Text style={styles.inscriptionText}>S&#39;inscrire</Text>
                                </View>

                        }
                        <VoirPlusWeb/>
                    </>
                }
            </Pressable>
        )
    }
    return (
        <Pressable style={styles.carteContainer} onPress={onPress}>
            <View style={styles.partieHautContainer}>
                <View style={styles.titreContainer}>
                    <Image
                        source={medaille}
                        style={styles.icon}
                    />
                    <Text style={styles.titre}>Événements</Text>
                    <VoirPlusMobile/>
                </View>
                <View style={styles.alertContainer}>
                    <Text style={styles.messageAlert}>Aucun concours disponible</Text>
                </View>
            </View>
            <VoirPlusWeb/>
        </Pressable>
    )
}

const Classement = ({onPress, user_DATA, podium_DATA}) => {
    if (!podium_DATA || podium_DATA.length < 3) return null;

    return (
        <Pressable style={styles.carteContainer} onPress={onPress}>
            <View style={styles.partieHautContainer}>
                <View style={styles.titreContainer}>
                    <Image
                        source={trophee}
                        style={styles.icon}
                    />
                    <Text style={styles.titre}>Classement</Text>
                    <VoirPlusMobile/>
                </View>
            </View>
            <View style={styles.podiumContainer}>
                {PODIUM_ORDRE.map((place) => {
                    return (<Place key={place} user_DATA={podium_DATA[place]} />)
                })}
            </View>

            <View style={styles.classementUserWrapper}>
                <View style={styles.ligneSeparateur}/>
                <View style={styles.classementUserContainer}>
                    <View style={styles.topContainer}><Text style={styles.topText}>{isWeb && <Text style={styles.gras}>TOP</Text>} {formatNombreCourt(user_DATA?.Classement || -1)}</Text></View>
                    <View style={styles.userContainer}>
                        <Image source={user_DATA?.Photo_url || DEFAULT_PICTURE} style={styles.userPhoto}/>
                        <Text style={styles.userNomText}>{user_DATA?.Nom || "USER_NOM"} (Vous)</Text>
                    </View>
                    <View style={styles.tropheesContainer}>
                        <Text style={styles.tropheesText}>{formatNombreCourt(user_DATA?.Trophees || -1)}</Text>
                        <Image source={tropheeIcon} style={styles.tropheesIcon} />
                    </View>
                </View>
            </View>
            <VoirPlusWeb/>
        </Pressable>
    )
}


const PODIUM_ORDRE = [1, 0, 2];

const PODIUM_COLORS = ["#fdd34e", "#f7f7f7", "#e8e8e8"];

const PODIUM_TEXT = [
    { fontSize: 30, color: "#ffffff" },
    { fontSize: 20, color: "#878787" },
    { fontSize: 16, color: "#878787" },
];

const PODIUM_CONFIG = isWeb
    ? {
        widths: ["80%", "70%", "60%"],
        heights: ["40%", "35%", "30%"],
        pictures: [100, 90, 80],
    }
    : {
        widths: ["80%", "80%", "80%"],
        heights: ["55%", "45%", "30%"],
        pictures: [30, 25, 20],
    };

const podiumStyle = [0, 1, 2].map((index) => ({
    place: {
        backgroundColor: PODIUM_COLORS[index],
        width: PODIUM_CONFIG.widths[index],
        height: PODIUM_CONFIG.heights[index],
    },
    text: PODIUM_TEXT[index],
    picture: {
        width: PODIUM_CONFIG.pictures[index],
        height: PODIUM_CONFIG.pictures[index],
    },
}));


const Place = ({user_DATA}) => {
    const num = user_DATA.Classement;
    const style = podiumStyle[num - 1];

    if (!user_DATA) return null;

    return (
        <View style={styles.placeContainer}>
            <Image
                source={user_DATA?.Photo_url || DEFAULT_PICTURE} // Si pas de photo alors celle par default
                style={[styles.placePicture,style.picture]}
            />
            <View style={[styles.place, style.place]}>
                <Text style={[styles.placeNumero, style.text]}>{num}</Text>
            </View>
            <Text style={styles.placeNomText}>{user_DATA?.Nom || "USER_NOM"}</Text>
        </View>
    )
}

export default function Social(){
    const router = useRouter();

    const concours_DATA = {
        Nom : "Concours de Décembre 2025",
        Date_fin : "2025-12-30T17:59:59",
        Points_objectif : 10000,
    }; //TODO récupérer les vrai données -> renvoyer null si pas de concours en cours

    const concours_user_DATA = {
        Points_recolte : 2324
    }; //TODO récupérer les vrai données -> renvoyer null si l'utilisateur actuel n'est pas inscrit

    const evenements_DATA = {
        Nom : "Événements Hiver Durable ❄️",
        Date_fin : "2026-01-15T17:59:59",
        Points_objectif : 50000,
    }; //TODO récupérer les vrai données -> renvoyer null si pas d'

    const evenements_user_DATA = {
        Points_recolte : 2324
    }; //TODO récupérer les vrai données -> renvoyer null si pas inscrit

    const user_DATA = {
        Id : 1,
        Nom : "",
        Pseudo : "",
        Photo_url : "",
        Trophees : 57400,
        Classement : 1544487,

    }; //TODO récupérer les vrai données

    const podium_DATA = [
        {
            Id : 1,
            Nom : "",
            Photo_url : "",
            Trophees : 6504140,
            Classement : 1,

        },
        {
            Id : 2,
            Nom : "",
            Photo_url : "",
            Trophees : 6504130,
            Classement : 2,

        },
        {
            Id : 3,
            Nom : "",
            Photo_url : "",
            Trophees : 6504120,
            Classement : 3,

        }
    ] //TODO récupérer les vrai données, les 3 premier du classement -> ce qui ont le plus de trophées

    return(
        <View style={styles.container}>
            {
                isWeb ?
                    <View style={{ width: "15%" }}>
                        <Navbar/>
                    </View>
                    :
                    <Navbar/>
            }
            <View style={{ flex: 1}}>
                <Header boutonNotification={true} userDetails={true} userProfil={true}/>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {!isWeb &&
                        <ProfilCarte
                            onPress={() => router.push("./votreProfil")}
                            user_DATA={user_DATA}
                        />
                    }

                    <View style={styles.cartesWrapper}>
                        <View style={styles.cartesContainer}>

                            <Concours
                                onPress={() => router.push("./concours")}
                                concours_DATA={concours_DATA}
                                concours_user_DATA={concours_user_DATA}
                            />

                            <Evenements
                                onPress={() => router.push("./evenements")}
                                evenements_DATA={evenements_DATA}
                                evenements_user_DATA={evenements_user_DATA}
                                user_DATA={user_DATA}
                            />

                        </View>
                        <View style={styles.classementContainer}>
                            <Classement
                                onPress={() => router.push("./classement")}
                                user_DATA={user_DATA}
                                podium_DATA={podium_DATA}
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    );
};
