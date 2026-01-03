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

import { loadUser } from "../../../../services/RegisterStorage";
import { fetchUsers } from "../../../../services/user.api";

import {formatNombreCourt,formatNombreEspace} from "../../../../utils/format";
import {tempsRestant} from "../../../../utils/temps";
import {isWeb} from "../../../../utils/platform";

import {getRequiredTrophiesByRankName,RANG_MINIMUM_EVENEMENT} from "../../../../constants/rank"
import {
    fetchLatestCompetition,
    fetchFollowingCompetitions,
    fetchCountOfParticipantsForCompetition, fetchCountOfQualifiedParticipantsForCompetition
} from "../../../../services/competitions.api"
import { fetchCompetitionUserPoints } from "../../../../services/user.api";

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
                <Image source={user_DATA?.photoProfileUrl || DEFAULT_PICTURE} style={styles.userCartePhoto}/>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userCarteNom}>{user_DATA?.name || "USER_NOM"}</Text>
                    <Text style={styles.userCartePseudo}>@{user_DATA?.pseudo || "USER_PSEUDO"}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={27} style={styles.carteIcon} />
        </Pressable>
    )
}

export const EVENT_CONFIG = {
    concours: {
        titre: "Concours mensuels",
        couleur: "#FFD700",
        icon: "calendrier",
        lockable: false,
    },
    evenement: {
        titre: "Événements",
        couleur: "#e5a1ee",
        icon: "medaille",
        lockable: true,
    },
};

const EventCarte = ({type, onPress, event_DATA, event_user_DATA, user_DATA}) => {
    const config = EVENT_CONFIG[type];
    if (!config) return null;

    // Aucun event
    if (!event_DATA) {
        return (
            <Pressable style={styles.carteContainer} onPress={onPress}>
                <View style={styles.partieHautContainer}>
                    <View style={styles.titreContainer}>
                        <Image source={config.icon === "calendrier" ? calendrier : medaille} style={styles.icon} />
                        <Text style={styles.titre}>{config.titre}</Text>
                        <VoirPlusMobile />
                    </View>

                    <View style={styles.alertContainer}>
                        <Text style={styles.messageAlert}>Aucun {type} disponible</Text>
                    </View>
                </View>
                <VoirPlusWeb />
            </Pressable>
        );
    }

    const pointsObjectif = formatNombreEspace(event_DATA.goalPoints);
    const pointsRecolte = formatNombreEspace(event_user_DATA ?? 0);
    const pourcentageDAvancement = Math.min(
        (event_user_DATA ?? 0) / event_DATA.goalPoints,
        1
    );

    // Spécifique événements
    let accessible = true;
    if (config.lockable) {
        const tropheesMin = getRequiredTrophiesByRankName(RANG_MINIMUM_EVENEMENT);
        accessible = (user_DATA?.Trophees ?? 0) >= tropheesMin;
    }

    return (
        <Pressable
            style={styles.carteContainer}
            onPress={accessible ? onPress : null}
        >
            {!accessible && (
                <View style={styles.overlayWrapper}>
                    <View style={styles.overlayContainer}>
                        <Image source={cadena} style={{ width: 14, height: 16 }} />
                        <Text style={styles.overlayText}>Rang Or minimum</Text>
                    </View>
                    <Text style={styles.overlaySousText}>
                        Réservé aux joueurs Or et plus. Montez en rang pour participer et
                        remporter ces récompenses exclusives !
                    </Text>
                </View>
            )}

            <View style={styles.partieHautContainer}>
                <View style={styles.titreContainer}>
                    <Image source={config.icon === "calendrier" ? calendrier : medaille} style={styles.icon} />
                    <Text style={styles.titre}>{config.titre}</Text>
                    <VoirPlusMobile />
                </View>

                <Text style={styles.tempsRestantText}>
                    Fin dans {tempsRestant(event_DATA.deadline)}
                </Text>

                <Text style={styles.nomText}>
                    {event_DATA.name} <Text style={styles.etatText}>(en cours)</Text>
                </Text>
            </View>

            {accessible && (
                <>
                    {event_user_DATA ? (
                        <View style={styles.avancementContainer}>
                            <Text style={styles.avancementText}>
                                <Text style={{ color: config.couleur }}>
                                    {pointsRecolte} points
                                </Text>{" "}
                                récoltés sur {pointsObjectif}
                            </Text>

                            <View style={styles.barreDAvancementContainer}>
                                <View
                                    style={{
                                        backgroundColor: config.couleur,
                                        borderRadius: 24,
                                        width: `${pourcentageDAvancement * 100}%`,
                                    }}
                                />
                                <View
                                    style={{
                                        width: `${(1 - pourcentageDAvancement) * 100}%`,
                                    }}
                                />
                            </View>
                        </View>
                    ) : (
                        <View
                            style={[
                                styles.inscriptionBoutonContainer,
                                { backgroundColor: config.couleur },
                            ]}
                        >
                            <Text style={styles.inscriptionText}>S&apos;inscrire</Text>
                        </View>
                    )}

                    <VoirPlusWeb />
                </>
            )}
        </Pressable>
    );
};

const ConcoursCarte = ({onPress, concours_DATA, concours_user_DATA}) => {
    return (
        <EventCarte
            type="concours"
            onPress={onPress}
            event_DATA={concours_DATA}
            event_user_DATA={concours_user_DATA}
        />
    )
}

const EvenementsCarte = ({onPress, evenements_DATA, evenements_user_DATA, user_DATA}) => {
    return (
        <EventCarte
            type="evenement"
            onPress={onPress}
            event_DATA={evenements_DATA}
            event_user_DATA={evenements_user_DATA}
            user_DATA={user_DATA}
        />
    )
}

const ClassementCarte = ({onPress, user_DATA, podium_DATA}) => {
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
                        <Image source={user_DATA?.photoProfileUrl || DEFAULT_PICTURE} style={styles.userPhoto}/>
                        <Text style={styles.userNomText}>{user_DATA?.name || "USER_NOM"} (Vous)</Text>
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
                source={user_DATA?.photoProfileUrl || DEFAULT_PICTURE} // Si pas de photo alors celle par default
                style={[styles.placePicture,style.picture]}
            />
            <View style={[styles.place, style.place]}>
                <Text style={[styles.placeNumero, style.text]}>{num}</Text>
            </View>
            <Text style={styles.placeNomText}>{user_DATA?.name || "USER_NOM"}</Text>
        </View>
    )
}

export default function Social(){
    const router = useRouter();
    const [concours_DATA, setConcoursData] = React.useState(null);
    const [user_points, setUserPoints] = React.useState(null);

    React.useEffect(() => {
        fetchLatestCompetition().then(setConcoursData); // le concours le plus récent et pas fini, Date_fin > date d'aujourd'hui
        fetchCompetitionUserPoints().then(setUserPoints); // points recolté par l'utilisateurs connecté au concours le plus recent
    }, []);


    const evenements_DATA = {
        Nom : "Événements Hiver Durable ❄️",
        Date_fin : "2026-01-15T17:59:59",
        Points_objectif : 50000,
    }; //TODO récupérer les vrai données -> renvoyer null si pas d'

    const evenements_user_DATA = {
        Points_recolte : 2324
    }; //TODO récupérer les vrai données -> renvoyer null si pas inscrit

    const user_DATA = loadUser();

    const [users_DATA, setUsers_DATA] = React.useState([]);

    React.useEffect(() => {
        fetchUsers().then(setUsers_DATA);
    }, [])

    const allUsers = [
        ...users_DATA.filter(u => u.Id !== user_DATA.Id),
        user_DATA,
    ];

    const usersSortedByRank = [...allUsers]
        .sort((a, b) => b.Trophees - a.Trophees)
        .map((u, i) => ({ ...u, Classement: i + 1 }));


    const podium_DATA = usersSortedByRank.slice(0,3)

    const userClassement =
        usersSortedByRank.findIndex(u => u.Id === user_DATA.Id) + 1;

    const user_DATA_WITH_RANK = {
        ...user_DATA,
        Classement: userClassement,
    };

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
                        <View style={styles.eventContainer}>

                            <ConcoursCarte
                                onPress={() => router.push("./concours")}
                                concours_DATA={concours_DATA}
                                concours_user_DATA={user_points}
                            />

                            <EvenementsCarte
                                onPress={() => router.push("./evenements")}
                                evenements_DATA={evenements_DATA}
                                evenements_user_DATA={evenements_user_DATA}
                                user_DATA={user_DATA}
                            />

                        </View>
                        <View style={styles.classementContainer}>
                            <ClassementCarte
                                onPress={() => router.push("./classement")}
                                user_DATA={user_DATA_WITH_RANK}
                                podium_DATA={podium_DATA}
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    );
};
