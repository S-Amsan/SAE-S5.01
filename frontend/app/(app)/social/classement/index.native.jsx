import {Text, View, Image, ScrollView, TouchableOpacity} from "react-native";
import React, {useState} from "react";

import Header from "../../../../components/Header";

import styles from "./styles/styles";
import TabNavbarMobile from "../../../../components/TabNavbarMobile";

import DEFAULT_PICTURE from "../../../../assets/icones/default_picture.jpg";
import tropheeIcon from "../../../../assets/icones/trophee.png";
import medaille from "../../../../assets/icones/social/medailleClassement.png";

import { loadUser } from "../../../../services/RegisterStorage";
import {fetchUsers, fetchUserStats} from "../../../../services/user.api";

import {getCarriere} from "../../../../constants/rank";
import {formatNombreCourt, formatNombreEspace} from "../../../../utils/format";
import OverlaySombre from "../../../../components/OverlaySombre";
import {useLocalSearchParams, useRouter} from "expo-router";

// ---------------- LEADERBOARD ----------------

const Leaderboard = ({isActive, leaderboard_DATA, user_DATA, router}) => {
    if (!leaderboard_DATA || !user_DATA) return null
    const podium_users = leaderboard_DATA.slice(0,3);
    const users_hors_podium = leaderboard_DATA.slice(3);

    return (
        <View style={[{display: isActive ? "flex" : "none"}, styles.leaderboardContainer]}>
            <View style={styles.podiumContainer}>
                {
                    PODIUM_ORDRE.map((index) => (<Place key={index} user_DATA={podium_users[index]} userActuel={user_DATA.id === podium_users[index].id} router={router}/>))
                }
            </View>
            <View style={styles.classementTableauContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    {
                        users_hors_podium.map((user, index) => (<UserCarte key={index} user_DATA={user} userActuel={user_DATA.id === user.id} separateur={index !== users_hors_podium.length - 1} router={router}/>))
                    }
                    <Text style={styles.finText}>Seul le Top 100 est affiché</Text>
                </ScrollView>
                <View style={styles.userActuelCarte}>
                    <UserCarte user_DATA={user_DATA} userActuel={true} separateur={false} router={router}/>
                </View>
            </View>
        </View>
    )
}

const PODIUM_ORDRE = [1, 0, 2];

const PODIUM_CONFIG =
    {
        widths: ["100%", "100%", "100%"],
        heights: ["55%", "40%", "30%"],
    };

const podiumStyle = [0, 1, 2].map((index) => ({
    place: {
        width: PODIUM_CONFIG.widths[index],
        height: PODIUM_CONFIG.heights[index],
    },
}));


const Place = ({user_DATA, userActuel, router}) => {
    if (!user_DATA || !user_DATA.classement) return null;

    const classement = user_DATA.classement;
    const trophees = user_DATA?.stats?.trophies ?? 0;
    const style = podiumStyle[classement-1];

    return (
        <View style={styles.placeContainer}>
            <TouchableOpacity
                onPress={() => {
                    router.push(userActuel ? "./profil" : {pathname: "./profil", params: { id: user_DATA.id }})
                }}
            >
                <Image
                    source={
                        user_DATA?.photoProfileUrl
                            ? { uri: user_DATA.photoProfileUrl }
                            : DEFAULT_PICTURE
                    }
                    style={styles.placePicture}
                />
            </TouchableOpacity>

            <Text numberOfLines={1} style={styles.placeNomText}>{user_DATA?.name || "USER_NOM"}</Text>
            <View style={styles.placeTropheesContainer}>
                <Text style={styles.placeTropheesText}>{formatNombreCourt(trophees)}</Text>
                <Image source={tropheeIcon} style={styles.podiumTropheeIcon}/>
            </View>
            <View style={[styles.place, style.place]}>
                <Text style={styles.placeNumero}>{classement}</Text>
            </View>
        </View>
    )
}

const UserCarte = ({user_DATA, userActuel = false, separateur = true, router}) => {
    if (!user_DATA || !user_DATA.classement) return null;

    const classement = user_DATA.classement;
    const trophees = user_DATA?.stats?.trophies ?? 0;

    return (
        <TouchableOpacity
            style={styles.userTopContainer}
            onPress={() => {
                router.push(userActuel ? "./profil" : {pathname: "./profil", params: { id: user_DATA.id }})
            }}
        >
            <Text style={styles.userTopText}>{formatNombreCourt(classement)}</Text>
            <View style={styles.userInfoContainer}>
                <Image source={user_DATA?.photoProfileUrl ? { uri: user_DATA.photoProfileUrl } : DEFAULT_PICTURE} style={styles.userTopPicture}/>
                <Text style={styles.userTopName}>{user_DATA?.name || "USER_NOM"} {userActuel && "(Vous)"}</Text>
            </View>
            <View style={styles.userTropheesContainer}>
                <Text style={styles.userTropheesText}>{formatNombreCourt(trophees)}</Text>
                <Image source={tropheeIcon} style={styles.TropheesIcon}/>
            </View>
            {
                separateur &&
                <View style={styles.separateurWrapper}>
                    <View style={styles.demiLigneSeparateur}/>
                </View>
            }
        </TouchableOpacity>
    )
}


// ---------------- MA CARRIERE ----------------

const MaCarriere = ({isActive, user_DATA}) => {
    if (!user_DATA) return null;
    const userTrophees = user_DATA?.stats?.trophies ?? 0;
    const userClassement = user_DATA?.classement  ?? -1;

    const {rankPrecedent , rankActuel, rankSuivant} = getCarriere(userTrophees);

    const tropheesPourPalierSuivant = rankSuivant ? (rankSuivant.requiredTrophies - rankActuel.requiredTrophies) : 0;
    const tropheesDepuisPalierActuel = userTrophees - rankActuel.requiredTrophies;
    const pourcentageDAvancement = Math.min((tropheesDepuisPalierActuel) / tropheesPourPalierSuivant, 1);

    return (
        <View style={[{display: isActive ? "flex" : "none"}, styles.macarriereContainer]}>
           <View style={styles.rankInfoContainer}>
               <Text style={styles.titreCarriere}>Vous êtes</Text>
               <View style={styles.rankContainer}>
                   <OverlaySombre>
                       <Image source={rankPrecedent?.image || null} style={styles.rankCoter}/>
                   </OverlaySombre>

                   <Image source={rankActuel.image} style={styles.rankActuel}/>

                   <OverlaySombre>
                       <Image source={rankSuivant?.image || null} style={styles.rankCoter}/>
                   </OverlaySombre>
               </View>
               <View>
                   <Text style={[styles.rankNomText,{color : rankActuel.color}]}>{rankActuel.name + " " + rankActuel.division}</Text>
                   <Text style={styles.rankDescriptionText}>{rankActuel.description}</Text>
               </View>
           </View>
           <View style={styles.tropheesInfoContainer}>
               <View style={styles.barreDeProgressionContainer}>
                   <Text style={styles.tropheesPalier}>{rankActuel ? formatNombreCourt(rankActuel.requiredTrophies) : ""}</Text>
                   <View style={styles.barreDAvancementContainer}>
                       <View
                           style={{
                               backgroundColor: rankActuel.color,
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
                   <Text style={styles.tropheesPalier}>{rankSuivant ? formatNombreCourt(rankSuivant.requiredTrophies) : "∞"}</Text>
               </View>
               <Text style={styles.tropheesUser}>{formatNombreCourt(userTrophees)} Trophées</Text>
           </View>
           <View style={styles.boutonsContainer}>
               <View style={styles.bulleInfoPrincipal}>
                   <Image source={medaille} style={styles.infoPrincipalImage}/>

                   <Text style={styles.infoPrincipalText}>Classement global : <Text style={styles.classementGlobalText}>#{formatNombreEspace(userClassement)}</Text></Text>
               </View>
               <View style={styles.boutonsSecondaireContainer}>
                   <TouchableOpacity style={styles.boutonSecondaire}>
                       <Text style={styles.boutonSecondaireText}>En savoir plus sur le classement</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.boutonSecondaire}>
                       <Text style={styles.boutonSecondaireText}>Voir les rangs disponibles</Text>
                   </TouchableOpacity>
               </View>
           </View>
        </View>
    )
}


// ---------------- CLASSEMENT ----------------
const CONFIG_TABNAVBAR = {
    leaderboard : {transparent : true},
    macarriere : {transparent : false},
}

export default function Classement(){
    const { onglet } = useLocalSearchParams();

    const ongletsMobile = [
        {id: "leaderboard", label: "Leaderboard", component: Leaderboard},
        {id: "macarriere", label: "Ma carrière", component: MaCarriere},
    ];

    const router = useRouter()

    const [ongletActifId, setOngletActifId] = React.useState(onglet ?? "leaderboard");
    const config = CONFIG_TABNAVBAR[ongletActifId];

    const [user_DATA, setUserDATA] = useState(null);
    const [users_DATA, setUsersDATA] = React.useState(null);
    const [leaderboard_DATA, setLeaderboardDATA] = React.useState(null);

    React.useEffect(() => {
        loadUser().then(setUserDATA)
        fetchUsers().then(setUsersDATA);
    }, []);

    // Classement
    React.useEffect(() => {
        let cancelled = false;

        const loadAndRank = async () => {
            if (!users_DATA?.length || !user_DATA?.id) return;

            // 1) Récupérer les stats pour tous les users
            const usersWithStats = await Promise.all(
                users_DATA.map(async (u) => {
                    const stats = await fetchUserStats(u.id);
                    return { ...u, stats: stats ?? { trophies: 0 } };
                })
            );

            if (cancelled) return;

            // 2) Trier + ajouter classement
            const usersSortedByRank = [...usersWithStats]
                .sort((a, b) => (b.stats?.trophies ?? 0) - (a.stats?.trophies ?? 0))
                .map((u, i) => ({ ...u, classement: i + 1 }));

            // 3) Leaderboard que les 100 premiers
            setLeaderboardDATA(usersSortedByRank.slice(0,100))

            // 4) Classement + stats du user connecté
            const userIndex = usersSortedByRank.findIndex((u) => u.id === user_DATA.id);

            const userClassement = userIndex + 1;
            const userFromRank = userIndex >= 0 ? usersSortedByRank[userIndex] : null;

            setUserDATA((prev) => {
                if (!prev) return prev;

                return {
                    ...prev,
                    // on prend les infos à jour (stats + classement) si on l'a trouvé
                    ...(userFromRank ? { stats: userFromRank.stats, classement: userFromRank.classement } : { classement: userClassement }),
                };
            });

        };

        loadAndRank();

        return () => {
            cancelled = true;
        };
    }, [users_DATA, user_DATA?.id]);

    return(
        <View style={[styles.container, config.transparent && {backgroundColor: "#05D991"}]}>

            <View style={{ flex: 1}}>
                <Header titre={"Classement"} boutonRetour={true} fondTransparent={config.transparent}/>
                <View style={{ flex: 1}}>
                    <TabNavbarMobile
                        ongletActifId={ongletActifId}
                        onglets={ongletsMobile}
                        setOngletActif={setOngletActifId}
                        transparent={config.transparent}
                    />

                    {
                        ongletsMobile.map((onglet) => {
                            const OngletComponent = onglet.component;
                            return (
                                <OngletComponent
                                    key={onglet.id}
                                    isActive={onglet.id === ongletActifId}
                                    setOngletActifId={setOngletActifId}
                                    user_DATA={user_DATA}
                                    leaderboard_DATA={leaderboard_DATA}
                                    router={router}
                                />
                            );
                        })
                    }
                </View>
            </View>
        </View>
    );
};
