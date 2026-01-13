import {View, Image, Text, ScrollView, TouchableOpacity, FlatList, Pressable} from "react-native";
import React, {useEffect, useState} from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";

import {isWeb} from "../../../../utils/platform";

import {Ionicons} from "@expo/vector-icons";

import DEFAULT_PICTURE from "../../../../assets/icones/default_picture.jpg";
import DEFAULT_BANNER from "../../../../assets/icones/default_banner.png";
import flamme from "../../../../assets/icones/flamme.png";
import trophee from "../../../../assets/icones/trophee.png";
import hastag from "../../../../assets/icones/social/hastag.png";
import cadeau from "../../../../assets/icones/social/cadeau.png";

import styles from "./styles/styles";
import {getCurrentRank} from "../../../../constants/rank";
import {formatNombreEspace} from "../../../../utils/format";
import {useLocalSearchParams, useRouter} from "expo-router";
import { fetchSuccess } from "../../../../services/competitions.api";
import { getFriends } from "../../../../services/friends.api";
import OverlaySombre from "../../../../components/OverlaySombre";
import {loadUser} from "../../../../services/RegisterStorage";
import {
    fetchActions,
    fetchSuccessForUser, fetchUserActions,
    fetchUserById,
    fetchUsers,
    fetchUserStats
} from "../../../../services/user.api";

const ProfilSection = ({user_DATA, user_amis_DATA, userActuel, router}) => {
    return (
        <View>
            <View style={styles.userWrapper}>
                <View style={styles.userContainer}>
                    <Image
                        source={
                            user_DATA?.photoProfileUrl
                                ? { uri: user_DATA.photoProfileUrl }
                                : DEFAULT_PICTURE
                        }
                        style={styles.userPicture}
                    />
                    <Pressable style={styles.userFlammeContainer} onPress={() => router.push("./votreSerie")}>
                        <Text style={styles.userFlammeText}>{user_DATA?.stats?.flames || 0}</Text>
                        <Image source={flamme} style={styles.flammeIcon}/>
                    </Pressable>
                </View>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userPseudo}>{user_DATA?.name || "USER_NOM"}</Text>
                    <Text style={styles.userNom}>@{user_DATA?.pseudo || "USER_PSEUDO"}</Text>
                    {isWeb &&
                        <View style={styles.userAmisContainer}>
                            <Text style={styles.userAmisNb}>{user_amis_DATA || 0}</Text>
                            <Text style={styles.userAmisText}>Amis</Text>
                        </View>
                    }
                </View>
            </View>


            {!isWeb &&
                <View style={styles.userAmisContainer}>
                    <Text style={styles.userAmisNb}>{user_amis_DATA || 0}</Text>
                    <Text style={styles.userAmisText}>Amis</Text>
                </View>
            }

            {/** Boutons (Ajouter des amis, partager le profil) **/}
            <View style={styles.boutonsContainer}>
                {
                    userActuel ?
                        <TouchableOpacity style={styles.boutonAmisContainer}>
                            <Text style={styles.boutonAmisText}>Modifier</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.boutonAmisContainer}>
                            <Ionicons name="add" size={24} color="#04D992" />
                            <Text style={styles.boutonAmisText}>Amis</Text>
                        </TouchableOpacity>
                }

                <TouchableOpacity style={styles.boutonShareContainer}>
                    <Ionicons name="share-outline" size={24} color="#04D992"/>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const Cartes = ({user_DATA, router}) => {

    const userTrophees = user_DATA?.stats?.trophies || 0
    const {rank : userRank} = getCurrentRank(userTrophees)

    return (
        <View style={styles.cartesContainer}>
            <TouchableOpacity
                style={styles.carte}
                onPress={() => router.push("./classement")}
            >
                <Image source={trophee} style={styles.carteIcon}/>
                <View>
                    <Text style={styles.InfoText}>{formatNombreEspace(userTrophees)}</Text>
                    <Text style={styles.InfoTitre}>Trophée</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.carte}
                onPress={() =>   router.push({
                    pathname: "./classement",
                    params: { onglet: "macarriere" },
                })}
            >
                <Image source={userRank.image} style={[styles.carteIcon, styles.rankIcon]}/>
                <View>
                    <Text style={styles.InfoText}>{`${userRank.name} ${userRank.division}`}</Text>
                    <Text style={styles.InfoTitre}>Ligue Actuelle</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.carte}
                onPress={() => router.push("./classement")}
            >
                <Image source={hastag} style={styles.carteIcon}/>
                <View>
                    <Text style={styles.InfoText}>{formatNombreEspace(user_DATA?.classement || -1)}</Text>
                    <Text style={styles.InfoTitre}>Classement global</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const MesRecompenses = () => {
    // Recompences non ouvert TODO récupéré le nombre de récompence avec le status (non ouvert) Table RecompenceGagne, 0 si aucun
    const recompencesGagne = 0

    return (
        <TouchableOpacity style={styles.mesRecompencesContainer}>
            <Image source={cadeau} style={styles.cadeauIcon}/>
            <Text style={styles.cadeauText}>Mes récompenses <Text style={styles.cadeauNbText}>{recompencesGagne > 0 && "(" + recompencesGagne + ")"}</Text></Text>
            <Ionicons name="chevron-forward" size={30} style={styles.cadeauChevron}/>
        </TouchableOpacity>
    )
}

const Realisations = ({succes_DATA, user_succes_DATA}) => {

    const userSucces = user_succes_DATA ? succes_DATA
            .map(s => ({
                ...s,
                debloque: user_succes_DATA.some(us => us.id_succes === s.id)
            }))
            .sort((a, b) => b.debloque - a.debloque)
        :
        succes_DATA
            .map(s => ({
                ...s,
                debloque: false
            }))
    ;

    return (
        <View style={styles.realisationsWrapper}>

            <View style={styles.realisationsSection}>
                <Text style={styles.titre}>
                    Succès <Text style={styles.titreInfo}>{`${user_succes_DATA?.length || 0}/${succes_DATA.length}`}</Text>
                </Text>

                {isWeb ? (
                    <View style={styles.realisationsWebContainer}>
                        {userSucces.map((item, index) => (
                            <RealisationItem key={index} item={item} />
                        ))}
                    </View>
                ) : (
                    <FlatList
                        horizontal
                        data={userSucces}
                        keyExtractor={(_, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.realisationsContainer}
                        style={styles.realisationsList}
                        renderItem={({ item }) => (
                            <RealisationItem item={item} />
                        )}
                    />
                )}
            </View>

        </View>
    )
}

const RealisationItem = ({ item }) => {
    const image = (
        <Image source={{uri : item.Img_url}} style={styles.realisationIcon} />
    );

    return (
        <TouchableOpacity>
            <View>
                {item.debloque ? image : <OverlaySombre>{image}</OverlaySombre>}
            </View>
        </TouchableOpacity>
    )
};

const UserStatistiques = ({user_statistique_DATA}) => {

    if (!user_statistique_DATA) return null

    return (
        <View style={styles.statistiqueSection}>
            <Text style={styles.titre}>Statistiques</Text>
            <View style={styles.statistiquesContainer}>
                <View style={[styles.statistiqueContainer,{borderColor : "#9afda6"}]}>
                    <Text style={styles.statistiqueInfo}>{user_statistique_DATA?.Action_eco || 0}</Text>
                    <Text style={styles.statistiqueTitre}>Actions éco</Text>
                </View>
                <View style={[styles.statistiqueContainer,{borderColor : "#98ccfd"}]}>
                    <Text style={styles.statistiqueInfo}>{user_statistique_DATA?.Votes_effectues || 0}</Text>
                    <Text style={styles.statistiqueTitre}>Votes effectués</Text>
                </View>
                <View style={[styles.statistiqueContainer,{borderColor : "#fd9898"}]}>
                    <Text style={styles.statistiqueInfo}>{user_statistique_DATA?.Objets_Recup || 0}</Text>
                    <Text style={styles.statistiqueTitre}>Objets récupéré</Text>
                </View>
            </View>
        </View>
    )
}

const UserActivites = ({user_activite_DATA, userActuel}) => {

    return (
        <View style={styles.activiteSection}>
            <Text style={styles.titre}>Activité récente</Text>
            {user_activite_DATA?.length > 0 ?
                <View style={styles.activitesContainer}>
                    {
                        user_activite_DATA.map((activite, index) =>
                            <View key={index} style={styles.activiteContainer}>
                                <Image source={{uri : activite.image_url}} style={styles.activiteImage}/>
                                <Text style={styles.activiteText}>{activite.description}</Text>
                            </View>
                        )

                    }
                </View>
                :
                <Text style={styles.message}>Aucune activité récente😭… {userActuel && "et si vous commenciez maintenant😏 ?"}</Text>
            }
        </View>
    )
}

export default function Profil(){
    const router = useRouter();

    const onglets = [
        {id: "profil",label : "Votre profil", page : "social/profil"},
        {id: "flamme",label : "Votre Série", page : "social/votreSerie"},
    ];

    const { id } = useLocalSearchParams();
    const userActuel = !id;

    const [ongletActifId, setOngletActif] = React.useState("profil");

    const [user_DATA, setUserDATA] = useState(null);
    const [users_DATA, setUsersDATA] = React.useState(null);

    const [user_amis_DATA, setUserAmisData] = React.useState(null);
    const [succes_DATA, setSuccesData] = React.useState([]);
    const [user_succes_DATA, setUserSuccesData] = React.useState(null);
    const [user_statistique_DATA, setUserStatistiqueDATA] = React.useState(null);
    const [user_activite_DATA, setuserActiviteDATA] = React.useState(null);

    useEffect(() => {
        if(userActuel){
            loadUser().then(setUserDATA)
        }else{
            fetchUserById(id).then(setUserDATA)
        }
        fetchUsers().then(setUsersDATA);
    }, []);

    useEffect(()=> {
        if(ongletActifId === "flamme"){
            router.push("./votreSerie")
        }

    },[ongletActifId])

    useEffect(()=> {
        if(!user_DATA?.id) return;

        getFriends().then((friends) => setUserAmisData(friends.length));
        fetchSuccess().then(setSuccesData);
        fetchSuccessForUser(user_DATA?.id).then(setUserSuccesData)
        fetchUserActions(user_DATA?.id).then(setuserActiviteDATA)

    },[user_DATA?.id])



    // Classement
    useEffect(() => {
        let cancelled = false;

        const loadAndRank = async () => {
            if (!users_DATA?.length || !user_DATA?.id) return;

            // Récupérer les stats pour tous les users
            const usersWithStats = await Promise.all(
                users_DATA.map(async (u) => {
                    const stats = await fetchUserStats(u.id);
                    return { ...u, stats: stats ?? { trophies: 0 } };
                })
            );

            if (cancelled) return;

            // Trier + ajouter classement
            const usersSortedByRank = [...usersWithStats]
                .sort((a, b) => (b.stats?.trophies ?? 0) - (a.stats?.trophies ?? 0))
                .map((u, i) => ({ ...u, classement: i + 1 }));

            // Classement + stats du user connecté
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

    useEffect(()=> {
        if (!user_DATA?.stats) return;
        setUserStatistiqueDATA(
            {
                Action_eco : user_DATA?.stats?.ecoActions ?? 0,
                Votes_effectues : 0, // TODO changer
                Objets_Recup : user_DATA?.stats?.recoveredObjects ?? 0
            }
        )

    },[user_DATA?.stats])

    if (!user_DATA) return null;

    return(

        <View style={styles.container}>
            {
                isWeb &&
                <View style={{ width: "15%" }}>
                    <Navbar/>
                </View>
            }
            <View style={{ flex: 1}}>

                {
                    isWeb ?
                        <>
                            {userActuel ?
                                <Header onglets={onglets} ongletActifId={ongletActifId} setOngletActif={setOngletActif}/>
                                :
                                <Header />
                            }

                            <View style={{flex : 1}}>
                                <Image
                                    source={
                                        user_DATA?.profileBannerUrl
                                            ? { uri: user_DATA.profileBannerUrl }
                                            : DEFAULT_BANNER
                                    }
                                    style={styles.banner}
                                />
                                <View style={{paddingLeft : "7.5%", paddingRight : "2.5%",flex : 1}}>
                                    <ProfilSection user_DATA={user_DATA} user_amis_DATA={user_amis_DATA} router={router} userActuel={userActuel}/>
                                    <View style={{flex : 1, flexDirection: "row", marginTop : 200,}}>
                                        <View style={styles.contenuPrincipal}>
                                            <View>
                                                <Cartes user_DATA={user_DATA} router={router}/>
                                                {userActuel && <MesRecompenses/>}
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <UserStatistiques user_statistique_DATA={user_statistique_DATA}/>
                                                <UserActivites user_activite_DATA={user_activite_DATA} userActuel={userActuel}/>
                                            </View>
                                        </View>
                                        <View style={styles.contenuSecondaire}>
                                            <Realisations succes_DATA={succes_DATA} user_succes_DATA={user_succes_DATA}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </>
                        :
                        <>
                            <Header titre={userActuel ? "Mon profil" : `@${user_DATA?.pseudo}` } boutonRetour={true} boutonParametres={userActuel}/>

                            <ScrollView>
                                <Image
                                    source={
                                        user_DATA?.profileBannerUrl
                                            ? { uri: user_DATA.profileBannerUrl }
                                            : DEFAULT_BANNER
                                    }
                                    style={styles.banner}
                                />
                                <ProfilSection user_DATA={user_DATA} user_amis_DATA={user_amis_DATA} router={router} userActuel={userActuel}/>
                                <Cartes user_DATA={user_DATA} router={router}/>
                                {userActuel && <MesRecompenses/>}
                                <Realisations succes_DATA={succes_DATA} user_succes_DATA={user_succes_DATA}/>
                                <UserStatistiques user_statistique_DATA={user_statistique_DATA}/>
                                <UserActivites user_activite_DATA={user_activite_DATA} userActuel={userActuel}/>
                                <View style={{ paddingBottom: 75 }}/>
                            </ScrollView>
                        </>
                }

            </View>
        </View>
    );
};
