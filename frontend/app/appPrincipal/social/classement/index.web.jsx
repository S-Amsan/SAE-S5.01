import {Text, View, Image, ScrollView, TouchableOpacity} from "react-native";
import React, {useState} from "react";

import Header from "../../../../components/Header";

import styles from "./styles/styles";

import DEFAULT_PICTURE from "../../../../assets/icones/default_picture.jpg";
import tropheeIcon from "../../../../assets/icones/trophee.png";
import medaille from "../../../../assets/icones/social/medailleClassement.png";

import { loadUser } from "../../../../services/RegisterStorage";
import {fetchUsers} from "../../../../services/user.api";

import {getCarriere} from "../../../../constants/rank";
import {formatNombreCourt, formatNombreEspace} from "../../../../utils/format";
import Navbar from "../../../../components/Navbar";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";
import OverlaySombre from "../../../../components/OverlaySombre";

// ---------------- LEADERBOARD ----------------

const Leaderboard = ({leaderboard_DATA, user_DATA}) => {
    if (!leaderboard_DATA || !user_DATA) return null
    const podium_users = leaderboard_DATA.slice(0,3);
    const users_hors_podium = leaderboard_DATA.slice(3);

    return (
        <View style={styles.leaderboardContainer}>
            <Text style={styles.leaderboardTitre}>Leaderboard</Text>
            <View style={styles.podiumContainer}>
                {
                    PODIUM_ORDRE.map((index) => (<Place key={index} user_DATA={podium_users[index]}/>))
                }
            </View>
            <View style={styles.classementTableauContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}>
                    <View style={{flex : 1, gap : 10}}>
                        {
                            users_hors_podium.map((user, index) => (<UserCarte key={index} user_DATA={user} userActuel={user_DATA.id === user.id}/>))
                        }
                    </View>

                    <Text style={styles.finText}>Seul le Top 100 est affiché</Text>
                </ScrollView>
                <View style={styles.userActuelCarte}>
                    <UserCarte user_DATA={user_DATA} userActuel={true}/>
                </View>
            </View>
        </View>
    )
}

const PODIUM_ORDRE = [1, 0, 2];

const PODIUM_COLORS = ["#fdd34e", "#f7f7f7", "#e8e8e8"];

const PODIUM_TEXT = [
    { fontSize: 75, color: "#ffffff" },
    { fontSize: 30, color: "#878787" },
    { fontSize: 20, color: "#878787" },
];

const PODIUM_CONFIG = {
        pictures: [60, 45, 40],
        width: ["80%", "75%", "75%"],
        height: [100, 60, 40],
    }


const podiumStyle = [0, 1, 2].map((index) => ({
    place: {
        backgroundColor: PODIUM_COLORS[index],
        width: PODIUM_CONFIG.width[index],
        height: PODIUM_CONFIG.height[index],
    },
    text: PODIUM_TEXT[index],
    picture: {
        width: PODIUM_CONFIG.pictures[index],
        height: PODIUM_CONFIG.pictures[index],
        borderRadius : PODIUM_CONFIG.pictures[index],
    },
}));

const Place = ({user_DATA}) => {
    if (!user_DATA || !user_DATA.classement) return null;

    const classement = user_DATA.classement;
    const trophees = user_DATA?.stats?.trophies ?? 0;
    const style = podiumStyle[classement-1];

    return (
        <View style={styles.placeContainer}>
            <Image
                source={user_DATA?.photoProfileUrl || DEFAULT_PICTURE}
                style={[styles.placePicture, style.picture]}
            />
            <Text style={styles.placeNomText}>{user_DATA?.name || "USER_NOM"}</Text>
            <View style={styles.placeTropheesContainer}>
                <Text style={styles.placeTropheesText}>{formatNombreCourt(trophees)}</Text>
                <Image source={tropheeIcon} style={styles.podiumTropheeIcon}/>
            </View>
            <View style={[styles.place, style.place]}>
                <Text style={[styles.placeNumero,style.text]}>{classement}</Text>
            </View>
        </View>
    )
}

const UserCarte = ({user_DATA, userActuel = false}) => {
    if (!user_DATA || !user_DATA.classement) return null;

    const classement = user_DATA.classement;
    const trophees = user_DATA?.stats?.trophies ?? 0;

    return (
        <View style={[styles.userTopContainer, userActuel && styles.userActuelTopContainer]}>
            <Text style={styles.userTopText}>{formatNombreCourt(classement)}</Text>
            <View style={styles.userInfoContainer}>
                <Image source={user_DATA?.photoProfileUrl || DEFAULT_PICTURE} style={styles.userTopPicture}/>
                <Text style={styles.userTopName}>{user_DATA?.name || "USER_NOM"} {userActuel && "(Vous)"}</Text>{/* TODO Mettre (Vous quand c'est le user Actuel)*/}
            </View>
            <View style={styles.userTropheesContainer}>
                <Text style={styles.userTropheesText}>{formatNombreCourt(trophees)}</Text>
                <Image source={tropheeIcon} style={styles.TropheesIcon}/>
            </View>
        </View>
    )
}


// ---------------- MA CARRIERE ----------------

const MaCarriere = ({user_DATA}) => {
    if (!user_DATA) return null;
    const userTrophees = user_DATA?.stats?.trophies ?? 0;
    const userClassement = user_DATA?.classement  ?? -1;


    const {rankPrecedent , rankActuel, rankSuivant} = getCarriere(userTrophees);

    const tropheesPourPalierSuivant = rankSuivant ? (rankSuivant.requiredTrophies - rankActuel.requiredTrophies) : 0;
    const tropheesDepuisPalierActuel = userTrophees - rankActuel.requiredTrophies;
    const pourcentageDAvancement = Math.min((tropheesDepuisPalierActuel) / tropheesPourPalierSuivant, 1);

    return (
        <View style={styles.macarriereContainer}>
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
                <View >
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
                <Text style={styles.tropheesUser}>{formatNombreEspace(userTrophees)} Trophées</Text>
            </View>
            <View style={styles.boutonsContainer}>
                <View style={styles.bulleInfoPrincipal}>
                    <Image source={medaille} style={styles.infoPrincipalImage}/>
                    <Text style={styles.infoPrincipalText}>Classement global : <Text style={styles.classementGlobalText}>#{formatNombreEspace(userClassement)}</Text></Text>
                </View>
                <TouchableOpacity style={styles.boutonSecondaire}>
                    <Text style={styles.boutonSecondaireText}>En savoir plus sur le classement</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boutonSecondaire}>
                    <Text style={styles.boutonSecondaireText}>Voir les rangs disponibles</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


// ---------------- CLASSEMENT ----------------

export default function Classement(){

    const onglets = [
        {id: "classement",label : "Classement", page : "social/classement"},
        {id: "concours",label : "Concours", page : "social/concours"},
        {id: "evenements",label : "Événements", page : "social/evenements"},
    ];

    const [user_DATA, setUserDATA] = useState(null);
    const [users_DATA, setUsersDATA] = React.useState(null);
    const [leaderboard_DATA, setLeaderboardDATA] = React.useState(null);

    React.useEffect(() => {
        loadUser().then(setUserDATA)
        fetchUsers().then(setUsersDATA);
    }, []);

    React.useEffect(() => {
        if (!users_DATA || !user_DATA) return;

        const normalizedUsers = users_DATA.map(user => ({
            ...user,
            stats: user.stats || {
                trophies: 0,
                flames: 0,
                points: 0,
                userId: user.id
            }
        }));

        const usersSortedByRank = [...normalizedUsers]
            .sort((a, b) => b.stats.trophies - a.stats.trophies)
            .map((u, i) => ({ ...u, classement: i + 1 }));

        setLeaderboardDATA(usersSortedByRank.slice(0,100))

        const userClassement = usersSortedByRank.findIndex(u => u.Id === user_DATA.Id) + 1;


        setUserDATA((prev) => {
            if (!prev) return prev;
            return { ...prev, classement: userClassement };
        });

    }, [users_DATA,user_DATA?.id])

    return(
        <View style={styles.container}>

            <View style={{ width: "15%" }}>
                <Navbar/>
            </View>

            <View style={{ flex: 1}}>
                <Header userDetails={true}/>

                <View style={styles.contenuContainer}>
                    <TabNavbarWeb onglets={onglets} pageBack={"social"}/>

                    <View style={{ flex: 1, flexDirection : "row"}}>
                        <MaCarriere user_DATA={user_DATA}/>
                        <Leaderboard user_DATA={user_DATA} leaderboard_DATA={leaderboard_DATA}/>
                    </View>

                </View>
            </View>
        </View>
    );
};
