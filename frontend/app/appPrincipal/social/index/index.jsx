import {Image, Pressable, ScrollView, Text, View} from "react-native";
import { useRouter } from "expo-router";
import React, {useState} from "react";

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

import {formatNombreCourt,formatNombreEspace} from "../../../../utils/format";
import {tempsRestant} from "../../../../utils/temps";
import {isWeb} from "../../../../utils/platform";

import {getRequiredTrophiesByRankName,RANG_MINIMUM_EVENEMENT} from "../../../../constants/rank"
import {fetchLatestCompetition,} from "../../../../services/competitions.api"
import {
    fetchUserPointsForCompetition,
    fetchUserPointsForEvent,
    fetchUsers,
    fetchUserStats
} from "../../../../services/user.api";

import styles from "./styles/styles";
import {fetchLatestEvent} from "../../../../services/events.api";

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
                <Image
                    source={
                        user_DATA?.photoProfileUrl
                            ? { uri: user_DATA.photoProfileUrl }
                            : DEFAULT_PICTURE
                    }
                    style={styles.userCartePhoto}
                />
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

const EventCarte = ({type, onPress, event_DATA, user_stats}) => {
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
    const pointsRecolte = formatNombreEspace(event_DATA?.collectedPoints ?? 0);
    const pourcentageDAvancement = Math.min(
        (event_DATA?.collectedPoints ?? 0) / event_DATA.goalPoints,
        1
    );

    // Spécifique événements
    let accessible = false;
    if (config.lockable) {
        const tropheesMin = getRequiredTrophiesByRankName(RANG_MINIMUM_EVENEMENT);
        const statsArray = Array.isArray(user_stats)
            ? user_stats
            : (user_stats?.stats ?? user_stats?.items ?? []);

        const userTrophees =
            statsArray.find(item => item.type === "trophees")?.valeur ?? 0;

        accessible = userTrophees >= tropheesMin;

    }else{
        accessible = true;
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
                    {event_DATA?.collectedPoints ? (
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

const ConcoursCarte = ({onPress, concours_DATA}) => {
    return (
        <EventCarte
            type="concours"
            onPress={onPress}
            event_DATA={concours_DATA}
        />
    )
}

const EvenementsCarte = ({onPress, evenements_DATA, user_stats}) => {
    if (!user_stats) return null;

    return (
        <EventCarte
            type="evenement"
            onPress={onPress}
            event_DATA={evenements_DATA}
            user_stats={user_stats}
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
                    <View style={styles.topContainer}><Text style={styles.topText}>{isWeb && <Text style={styles.gras}>TOP</Text>} {formatNombreCourt(user_DATA?.classement || -1)}</Text></View>
                    <View style={styles.userContainer}>
                        <Image source={user_DATA?.photoProfileUrl || DEFAULT_PICTURE} style={styles.userPhoto}/>
                        <Text style={styles.userNomText}>{user_DATA?.name || "USER_NOM"} (Vous)</Text>
                    </View>
                    <View style={styles.tropheesContainer}>
                        <Text style={styles.tropheesText}>{formatNombreCourt(user_DATA?.stats?.trophies ?? 0)}</Text>
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
    const num = user_DATA.classement;
    const style = podiumStyle[num - 1];

    if (!user_DATA) return null;

    return (
        <View style={styles.placeContainer}>
            <Image
                source={
                    user_DATA?.photoProfileUrl
                        ? { uri: user_DATA.photoProfileUrl }
                        : DEFAULT_PICTURE
                }
                style={[styles.placePicture,style.picture]}
            />
            <View style={[styles.place, style.place]}>
                <Text style={[styles.placeNumero, style.text]}>{num}</Text>
            </View>
            <Text style={styles.placeNomText}>{user_DATA?.name || "USER_NOM"}</Text>
        </View>
    )
}

export default function Social() {
    const router = useRouter();

    const [concours_DATA, setConcoursData] = useState(null);
    const [evenements_DATA, setEvenementsData] = useState(null);

    const [user_DATA, setUserDATA] = useState(null);
    const [user_stats, setUserStats] = useState(null);
    const [users_DATA, setUsersDATA] = useState(null);
    const [podium_DATA, setPodiumDATA] = useState(null);

    /* ===============================
       CHARGEMENT INITIAL (indépendant)
    =============================== */
    React.useEffect(() => {
        fetchLatestCompetition().then(setConcoursData).catch(console.error);
        fetchLatestEvent().then(setEvenementsData).catch(console.error);
        loadUser().then(setUserDATA).catch(console.error);
        fetchUsers().then(setUsersDATA).catch(console.error);
    }, []);

    /* ===============================
       STATS USER (dépend de user.id)
    =============================== */
    React.useEffect(() => {
        if (!user_DATA?.id) return;

        fetchUserStats(user_DATA.id)
            .then(setUserStats)
            .catch(console.error);
    }, [user_DATA?.id]);

    /* ===============================
       POINTS CONCOURS
    =============================== */
    React.useEffect(() => {
        if (!concours_DATA?.id) return;

        fetchUserPointsForCompetition(concours_DATA.id)
            .then(collectedPoints => {
                setConcoursData(prev => ({
                    ...prev,
                    collectedPoints
                }));
            })
            .catch(console.error);
    }, [concours_DATA?.id]);

    /* ===============================
       POINTS EVENEMENTS
    =============================== */
    React.useEffect(() => {
        if (!evenements_DATA?.id) return;

        fetchUserPointsForEvent(evenements_DATA.id)
            .then(collectedPoints => {
                setEvenementsData(prev => ({
                    ...prev,
                    collectedPoints
                }));
            })
            .catch(console.error);
    }, [evenements_DATA?.id]);

    /* ===============================
       CLASSEMENT / PODIUM
    =============================== */
    React.useEffect(() => {
        if (!users_DATA || !user_DATA?.id) return;

        const normalizedUsers = users_DATA.map(u => ({
            ...u,
            stats: u.stats || {
                trophies: 0,
                flames: 0,
                points: 0,
                userId: u.id
            }
        }));

        const usersSortedByRank = [...normalizedUsers]
            .sort((a, b) => (b.stats.trophies ?? 0) - (a.stats.trophies ?? 0))
            .map((u, i) => ({ ...u, classement: i + 1 }));

        setPodiumDATA(usersSortedByRank.slice(0, 3));

        const userClassement =
            usersSortedByRank.findIndex(u => u.id === user_DATA.id) + 1;

        setUserDATA(prev =>
            prev ? { ...prev, classement: userClassement } : prev
        );
    }, [users_DATA, user_DATA?.id]);

    /* ===============================
       RENDER
    =============================== */
    return (
        <View style={styles.container}>
            {isWeb ? (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            ) : (
                <Navbar />
            )}

            <View style={{ flex: 1 }}>
                <Header
                    boutonNotification
                    userDetails
                    userProfil
                    user={user_DATA}
                />

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {!isWeb && (
                        <ProfilCarte
                            onPress={() => router.push("./votreProfil")}
                            user_DATA={user_DATA}
                        />
                    )}

                    <View style={styles.cartesWrapper}>
                        <View style={styles.eventContainer}>
                            <ConcoursCarte
                                onPress={() => router.push("./concours")}
                                concours_DATA={concours_DATA}
                            />

                            <EvenementsCarte
                                onPress={() => router.push("./evenements")}
                                evenements_DATA={evenements_DATA}
                                user_stats={user_stats}
                            />
                        </View>

                        <View style={styles.classementContainer}>
                            <ClassementCarte
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
}

