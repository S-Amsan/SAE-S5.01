import {View, Image, Text, ScrollView, TouchableOpacity, FlatList} from "react-native";
import React, {useEffect} from "react";

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
import badge from "../../../../assets/icones/social/badge_exemple.png";
import activite from "../../../../assets/icones/social/activite_exemple.png";

import styles from "./styles/styles";
import {getCurrentRank} from "../../../../constants/rank";
import {formatNombreEspace} from "../../../../utils/format";
import {useNavigation, useRouter} from "expo-router";
import { fetchSuccess } from "../../../../services/competitions.api";
import { getFriends } from "../../../../services/friends.api";

const Profil = ({user_DATA, user_amis_DATA}) => {
    return (
        <View>
            <View style={styles.userWrapper}>
                <View style={styles.userContainer}>
                    <Image source={DEFAULT_PICTURE} style={styles.userPicture}/>
                    <View style={styles.userFlammeContainer}>
                        <Text style={styles.userFlammeText}>{user_DATA?.Flammes || 0}</Text>
                        <Image source={flamme} style={styles.flammeIcon}/>
                    </View>
                </View>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userPseudo}>{user_DATA?.Nom || "USER_NOM"}</Text>
                    <Text style={styles.userNom}>@{user_DATA?.Pseudo || "USER_PSEUDO"}</Text>
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
                <TouchableOpacity style={styles.boutonAmisContainer}>
                    <Ionicons name="add" size={24} color="#04D992" />
                    <Text style={styles.boutonAmisText}>Amis</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boutonShareContainer}>
                    <Ionicons name="share-outline" size={24} color="#04D992"/>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const Cartes = ({user_DATA}) => {
    const users_DATA = Array.from({ length: 150000 }, (_, index) => ({
        Id: index + 1,
        Nom: "",
        Pseudo: "",
        Photo_url: "",
        Trophees: Math.floor(Math.random() * 100000),
    }));//TODO récupérer les vrai données (de tout les utilisateur), Table User + User_Stats

    const allUsers = [
        ...users_DATA.filter(u => u.Id !== user_DATA.Id),
        user_DATA,
    ];

    const usersSortedByRank = [...allUsers]
        .sort((a, b) => b.Trophees - a.Trophees)
        .map((u, i) => ({ ...u, Classement: i + 1 }));

    const userClassement =
        usersSortedByRank.findIndex(u => u.Id === user_DATA.Id) + 1;

    const user_DATA_WITH_RANK = {
        ...user_DATA,
        Classement: userClassement,
    };

    const {rank : userRank} = getCurrentRank(user_DATA.Trophees)

    return (
        <View style={styles.cartesContainer}>
            <View style={styles.carte}>
                <Image source={trophee} style={styles.carteIcon}/>
                <View>
                    <Text style={styles.InfoText}>{formatNombreEspace(user_DATA.Trophees)}</Text>
                    <Text style={styles.InfoTitre}>Trophée</Text>
                </View>
            </View>
            <View style={styles.carte}>
                <Image source={userRank.image} style={[styles.carteIcon, styles.rankIcon]}/>
                <View>
                    <Text style={styles.InfoText}>{`${userRank.name} ${userRank.division}`}</Text>
                    <Text style={styles.InfoTitre}>Ligue Actuelle</Text>
                </View>
            </View>
            <View style={styles.carte}>
                <Image source={hastag} style={styles.carteIcon}/>
                <View>
                    <Text style={styles.InfoText}>{formatNombreEspace(user_DATA_WITH_RANK.Classement)}</Text>
                    <Text style={styles.InfoTitre}>Classement global</Text>
                </View>
            </View>
        </View>
    )
}

const MesRecompenses = () => {
    // Recompences non ouvert TODO récupéré le nombre de récompence avec le status (non ouvert) Table RecompenceGagne, 0 si aucun
    const recompencesGagne = 0

    return (
        <TouchableOpacity style={styles.mesRecompencesContainer}>
            <Image source={cadeau} style={styles.cadeauIcon}/>
            <Text style={styles.cadeauText}>Mes récompences <Text style={styles.cadeauNbText}>{recompencesGagne > 0 && "(" + recompencesGagne + ")"}</Text></Text>
            <Ionicons name="chevron-forward" size={30} style={styles.cadeauChevron}/>
        </TouchableOpacity>
    )
}

const Realisations = ({succes_DATA}) => {
    // Badge TODO récupere les badges gagné par l'utilisateur connecté (Table Evenement si type = "Evenement competitif" et si Date_fin < ajd et si Points_objectif <= Points_recolte , null si aucun
    const user_Badge_DATA = [
        {Nom : "Événements Hiver Durable ❄️", Img_url : badge},
    ]
    // Succes de l'utilisateur TODO récupere les succes de l'utilisateur connecte (table User_Succes, récuperer que les id des succes qu'il a), null si aucun
    const user_succes_DATA = [
        {id_succes : 1},
        {id_succes : 2},
        {id_succes : 5},
    ]


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

            <View style={styles.realisationsSection}>
                <Text style={styles.titre}>
                    Badge <Text style={styles.titreInfo}>{user_Badge_DATA?.length || 0}</Text>
                </Text>

                {user_Badge_DATA ? (
                    isWeb ? (
                        <View style={styles.realisationsWebContainer}>
                            {user_Badge_DATA.map((item, index) => (
                                <TouchableOpacity key={index}>
                                    <Image source={item.Img_url} style={styles.realisationIcon} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <FlatList
                            horizontal
                            data={user_Badge_DATA}
                            keyExtractor={(_, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.realisationsContainer}
                            style={styles.realisationsList}
                            renderItem={({ item }) => (
                                <TouchableOpacity>
                                    <Image source={item.Img_url} style={styles.realisationIcon} />
                                </TouchableOpacity>
                            )}
                        />
                    )
                ) : (
                    <Text style={styles.message}>
                        Qualifiez-vous lors d&#39;événements pour obtenir leurs badges.
                    </Text>
                )}
            </View>

        </View>
    )
}

const RealisationItem = ({ item }) => (
    <TouchableOpacity>
        <View>
            <Image source={item.Img_url} style={styles.realisationIcon} />
            {!item.debloque && (
                <Image
                    source={item.Img_url}
                    style={[styles.realisationIcon, styles.succesNonDebloque]}
                />
            )}
        </View>
    </TouchableOpacity>
);

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

const UserActivites = ({user_activite_DATA}) => {

    return (
        <View style={styles.activiteSection}>
            <Text style={styles.titre}>Activité récente</Text>
            {user_activite_DATA ?
                <View style={styles.activitesContainer}>
                    {
                        user_activite_DATA.map((activite, index) =>
                            <View key={index} style={styles.activiteContainer}>
                                <Image source={activite.Img_url} style={styles.activiteImage}/>
                                <Text style={styles.activiteText}>{activite.Description}</Text>
                            </View>
                        )

                    }
                </View>
                :
                <Text style={styles.message}>Aucune activité récente😭… et si vous commenciez maintenant😏 ?</Text>
            }
        </View>
    )
}

export default function VotreProfil(){
    const navigation = useNavigation();
    const router = useRouter();

    const onglets = [
        {id: "profil",label : "Votre profil", page : "social/votreProfil"},
        {id: "flamme",label : "Votre Série", page : "social/votreSerie"},
    ];
    const [ongletActifId, setOngletActif] = React.useState("profil");
    const [succes_DATA, setSuccesData] = React.useState([]);
    const [user_amis_DATA, setUserAmisData] = React.useState(0);

    useEffect(()=> {
        if(ongletActifId === "flamme"){
            router.push("./votreSerie")
        }
        fetchSuccess().then(setSuccesData);
        getFriends().then((friends) => setUserAmisData(friends.length));
    },[ongletActifId])

    const user_DATA = {
        Id : 35,
        Nom : null,
        Pseudo : null,
        Photo_url : null,
        Trophees : Math.floor(Math.random() * 100000),
        Flammes : Math.floor(Math.random() * 100),
    };//TODO récupérer les vrai données (de l'utilisateur), Table User + User_Stats

    if (!user_DATA) {
        navigation.goBack();
        return null;
    }


    // les stats de l'utilisateur TODO récupere les statistiques de l'utilisateur connecte
    const user_statistique_DATA = {
        Action_eco : 2560, // TODO (de l'utilisateur) : Nombre de post avec status validé (dans la Table Post) + Nombre de documents avec status validé (dans la Table User_Documents)
        Votes_effectues : 5448, // TODO (de l'utilisateur) : nombre de vote qu'il a fait dans la table Post_Validation, nombre de lignes avec le id_user
        Objets_Recup : 21 // TODO (de l'utilisateur) : Nombre de post avec status validé (dans la Table Post) et avec pour id_Action qui a pour type "Objet récupéré"
    }

    // les activité récent de l'utilisateur TODO récupere les activité récent de l'utilisateur connecte (Table User_Activite, récuperer que les 3 dernier, prendre la clé #Id_Activite et dans la table Activite prendre l'activité correspondant), null si aucun
    const user_activite_DATA = [
        {Description : "A recyclé une bouteille plastique", Img_url : activite},
        {Description : "A recyclé une bouteille plastique", Img_url : activite},
        {Description : "A recyclé une bouteille plastique", Img_url : activite},
    ]

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
                            <Header onglets={onglets} ongletActifId={ongletActifId} setOngletActif={setOngletActif}/>

                            <View style={{flex : 1}}>
                                <Image source={DEFAULT_BANNER} style={styles.banner} />
                                <View style={{paddingLeft : "7.5%", paddingRight : "2.5%",flex : 1}}>
                                    <Profil user_DATA={user_DATA} user_amis_DATA={user_amis_DATA}/>
                                    <View style={{flex : 1, flexDirection: "row", marginTop : 200,}}>
                                        <View style={styles.contenuPrincipal}>
                                            <View>
                                                <Cartes user_DATA={user_DATA}/>
                                                <MesRecompenses/>
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <UserStatistiques user_statistique_DATA={user_statistique_DATA}/>
                                                <UserActivites user_activite_DATA={user_activite_DATA}/>
                                            </View>
                                        </View>
                                        <View style={styles.contenuSecondaire}>
                                            <Realisations succes_DATA={succes_DATA}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </>
                        :
                        <>
                            <Header titre={"Mon profil"} boutonRetour={true} boutonParametres={true}/>

                            <ScrollView>
                                <Image source={DEFAULT_BANNER} style={styles.banner} />
                                <Profil user_DATA={user_DATA} user_amis_DATA={user_amis_DATA}/>
                                <Cartes user_DATA={user_DATA}/>
                                <MesRecompenses/>
                                <Realisations succes_DATA={succes_DATA}/>
                                <UserStatistiques user_statistique_DATA={user_statistique_DATA}/>
                                <UserActivites user_activite_DATA={user_activite_DATA}/>
                                <View style={{ paddingBottom: 75 }}/>
                            </ScrollView>
                        </>
                }

            </View>
        </View>
    );
};
