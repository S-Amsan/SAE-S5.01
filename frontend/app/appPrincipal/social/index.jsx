import {Image, Platform, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Header from "../../../components/Header";
import { useRouter } from "expo-router";
import Navbar from "../../../components/Navbar";
import React from "react";
import styles from "./styles/styles";

import calendrier from "../../../assets/icones/social/calendrier.png";
import medaille from "../../../assets/icones/social/medaille.png";
import trophee from "../../../assets/icones/social/trophee.png";
import cadena from "../../../assets/icones/social/cadena.png";
import DEFAULT_PICTURE from "../../../assets/icones/default_picture.jpg";

import tropheeIcon from "../../../assets/icones/trophee.png";

import {formatNombreCourt,formatNombreEspace} from "../../../utils/format";

import {getRequiredTrophiesByRankName,RANG_MINIMUM_EVENEMENT} from "../../../constants/rank"

const tempsRestant = (dateFin) => {
    const maintenant = new Date();
    const fin = new Date(dateFin);

    const diffMs = fin - maintenant;

    if (diffMs <= 0) return "Terminé";

    const diffMin = Math.floor(diffMs / 1000 / 60);
    const diffHeures = Math.floor(diffMin / 60);
    const diffJours = Math.floor(diffHeures / 24);

    if (diffJours >= 1) {
        return `${diffJours} jour${diffJours > 1 ? "s" : ""}`;
    }

    if (diffHeures >= 1) {
        const heures = diffHeures;
        const minutes = diffMin % 60;
        return `${heures} h ${minutes} min`;
    }

    return `${diffMin} min`;
};

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
                <View style={styles.voirPlusContainer}>
                    <Text style={styles.voirPlusText}>Voir plus</Text>
                </View>
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
                </View>
                <View style={styles.alertContainer}>
                    <Text style={styles.messageAlert}>Aucun concours disponible</Text>
                </View>
            </View>
            <View style={styles.voirPlusContainer}>
                <Text style={styles.voirPlusText}>Voir plus</Text>
            </View>
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
                                style={{width : 21, height : 24}}
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
                        <View style={styles.voirPlusContainer}>
                            <Text style={styles.voirPlusText}>Voir plus</Text>
                        </View>
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
                </View>
                <View style={styles.alertContainer}>
                    <Text style={styles.messageAlert}>Aucun concours disponible</Text>
                </View>
            </View>
            <View style={styles.voirPlusContainer}>
                <Text style={styles.voirPlusText}>Voir plus</Text>
            </View>
        </Pressable>
    )
}

const PODIUM_ORDRE = [1, 0, 2];

const Classement = ({onPress, user_DATA, podium_DATA}) => {
    if (!podium_DATA || podium_DATA.length < 3) return null;

    return (
        <Pressable style={styles.carteContainer} onPress={onPress }>

            <View style={styles.partieHautContainer}>
                <View style={styles.titreContainer}>
                    <Image
                        source={trophee}
                        style={styles.icon}
                    />
                    <Text style={styles.titre}>Classement</Text>
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
                    <View style={styles.topContainer}><Text style={styles.topText}><Text style={styles.gras}>TOP</Text> {formatNombreCourt(user_DATA?.Classement || -1)}</Text></View>
                    <View style={styles.userContainer}>
                        <Image source={user_DATA?.Photo_url || DEFAULT_PICTURE} style={styles.userPhoto}/>
                        <Text style={styles.userNomText}>{user_DATA?.Nom || "USER_NOM"} (Vous)</Text>
                    </View>
                    <View style={styles.tropheesContainer}>
                        <Text style={styles.tropheesText}>{formatNombreCourt(user_DATA?.Trophees || -1)}</Text>
                        <Image source={tropheeIcon} style={{width: 40, height: 40}} />
                    </View>
                </View>
            </View>
            <View style={styles.voirPlusContainer}>
                <Text style={styles.voirPlusText}>Voir plus</Text>
            </View>
        </Pressable>
    )
}

const podiumStyle = [
    {place : {backgroundColor :"#fdd34e",width: "80%", height: "40%"}, text : {fontSize : 30, color : "#ffffff"}, picture : {width : 100, height : 100}},
    {place :{backgroundColor :"#f7f7f7",width: "70%", height: "35%"}, text : {fontSize : 20, color : "#878787"}, picture : {width : 90, height : 90}},
    {place :{backgroundColor :"#e8e8e8",width: "60%", height: "30%"}, text : {fontSize : 16, color : "#878787"}, picture : {width : 80, height : 80}},
];

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
        Photo_url : "https://i.pinimg.com/236x/bb/df/ec/bbdfecbe813809bf72def9772538e323.jpg",
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
                Platform.OS === 'web' ?
                    <View style={{ width: "15%" }}>
                        <Navbar/>
                    </View>
                    :
                    <Navbar/>
            }
            <View style={{ flex: 1}}>
                <Header boutonNotification={true} userDetails={true} userProfil={true}/>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {Platform.OS !== "web" &&
                        <Pressable style={{margin : 50, padding : 50, backgroundColor : '#253ed5'}} onPress={() => router.push("./social/votreProfil")}>
                            <Text>Profil</Text>
                        </Pressable>
                    }

                    <View style={styles.cartesWrapper}>
                        <View style={styles.cartesContainer}>

                            <Concours
                                onPress={() => router.push("./social/concours")}
                                concours_DATA={concours_DATA}
                                concours_user_DATA={concours_user_DATA}
                            />

                            <Evenements
                                onPress={() => router.push("./social/evenements")}
                                evenements_DATA={evenements_DATA}
                                evenements_user_DATA={evenements_user_DATA}
                                user_DATA={user_DATA}
                            />

                        </View>
                        <View style={styles.classementContainer}>
                            <Classement
                                onPress={() => router.push("./social/classement")}
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
