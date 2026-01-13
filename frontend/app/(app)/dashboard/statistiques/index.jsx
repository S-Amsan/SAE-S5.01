import React, {useCallback, useEffect, useMemo, useState} from "react";
import {View, Text, Image, ScrollView, ActivityIndicator} from "react-native";


import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";

import document from "../../../../assets/icones/dashboard/document.png"
import partenaire from "../../../../assets/icones/dashboard/partenaire.png"
import post from "../../../../assets/icones/dashboard/post.png"
import recompense from "../../../../assets/icones/dashboard/recompense.png"
import signalement from "../../../../assets/icones/dashboard/signalement.png"
import utilisateur from "../../../../assets/icones/dashboard/utilisateur.png"


import styles from "./styles";
import RecompensesParCategorieChart from "./_graph/RecompensesParCategorieChart";
import GesteEcoHebdomadaire from "./_graph/GesteEcoHebdomadaire";
import PostsRepartitionChart from "./_graph/PostsRepartitionChart";
import ObjetsAbandonneesChart from "./_graph/ObjetsAbandonneesChart";
import {loadUser} from "../../../../services/RegisterStorage";
import AccesReserveAdmin from "../_component/AccesReserveAdmin";
import {fetchAllReports} from "../../../../services/reports.api";
import {fetchUsers} from "../../../../services/user.api";
import {fetchAllCards} from "../../../../services/cards.api";
import {fetchAllDocuments} from "../../../../services/documents.api";
import {fetchDonations, getAllPartners} from "../../../../services/admin.api";
import {fetchFollowingEvents} from "../../../../services/events.api";
import {fetchFollowingCompetitions} from "../../../../services/competitions.api";
import {fetchAllPosts} from "../../../../services/posts.api";

const STATE_LABELS = {
    WAITING: "En attente",
    VALIDATED: "Accepté",
    REJECTED: "Refusé",
};

export default function Statistiques() {
    const [user, setUser] = React.useState(null);

    const [signalement_DATA, setSignalementData] = useState(null);
    const [utilisateurs_DATA, setUtilisateursData] = useState(null);
    const [gestes_DATA, setGestesData] = useState(null);
    const [justificatifs_DATA, setJustificatifsData] = useState(null);
    const [partenaires_DATA, setPartenairesData] = useState(null);
    const [recompenses_DATA, setRecompensesData] = useState(null);
    const [posts_DATA, setPostsData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser().then(setUser);
    }, []);

    const fetchers = useMemo(() => ({
        signalements: fetchAllReports,
        utilisateurs: fetchUsers,
        gestes: fetchAllCards,
        justificatifs: fetchAllDocuments,
        recompenses: fetchDonations,
        partenaires: getAllPartners,
        posts : fetchAllPosts
    }), []);

    const setters = useMemo(() => ({
        signalements: setSignalementData,
        utilisateurs: setUtilisateursData,
        gestes: setGestesData,
        justificatifs: setJustificatifsData,
        recompenses: setRecompensesData,
        partenaires: setPartenairesData,
        posts: setPostsData,
    }), []);

    const ALL_KEYS = useMemo(
        () => Object.keys(fetchers),
        [fetchers]
    );

    const loadData = useCallback(async (keys = ALL_KEYS) => {
        const results = await Promise.all(keys.map((k) => fetchers[k]()));
        results.forEach((res, idx) => {
            const k = keys[idx];
            setters[k]?.(res);
        });
    }, [ALL_KEYS, fetchers, setters]);


    useEffect(() => {
        if (!user) return;

        (async () => {
            try {
                setIsLoading(true);
                await loadData(); // tout charger
            } finally {
                setIsLoading(false);
            }
        })();
    }, [user, loadData]);

    const statistiques_Data = {
        compteCree : utilisateurs_DATA?.length ?? 0,
        userBan : utilisateurs_DATA?.filter(u => u.banned)?.length ?? 0,
        signalement : signalement_DATA?.filter(s => !s.checked)?.length ?? 0,
        justificatifs : justificatifs_DATA?.filter(j => STATE_LABELS[j?.state ?? ""] === STATE_LABELS.WAITING)?.length ?? 0,
        partenaires : partenaires_DATA?.length ?? 0,
        recompenses : recompenses_DATA?.length ?? 0,
        post : posts_DATA?.length ?? 0,
        postValid : 3,
    }

    const cartesTab = [
        {titre : "COMPTES CRÉES", icon : utilisateur,couleur : "#4293E5", data : statistiques_Data.compteCree},
        {titre : "UTILISATEURS BANNIS", icon : utilisateur,couleur : "#EB5254", data : statistiques_Data.userBan},
        {titre : "SIGNALEMENTS EN ATTENTE", icon : signalement,couleur : "#FBD036", data : statistiques_Data.signalement},
        {titre : "JUSTIFICATIFS EN ATTENTE", icon : document,couleur : "#79C360", data : statistiques_Data.justificatifs},
        {titre : "PARTENAIRES", icon : partenaire,couleur : "#7E58CF", data : statistiques_Data.partenaires},
        {titre : "RÉCOMPENSES", icon : recompense,couleur : "#2DBEBB", data : statistiques_Data.recompenses},
        {titre : "POSTS PUBLIÉS", icon : post,couleur : "#F58F44", data : statistiques_Data.post},
        {titre : "POSTS VALIDÉS", icon : post,couleur : "#EC3796", data : statistiques_Data.postValid},
    ]

    const graphsTab = [
        {
            titre : "RÉPARTITION DES RÉCOMPENSES ACHETÉES PAR CATÉGORIE",
            component : RecompensesParCategorieChart,
            data : [
                { value: 2, label: 'CARTES CADEAUX', frontColor: '#36a2eb' },
                { value: 10, label: 'BONS DE RÉDUCTION', frontColor: '#36a2eb' },
                { value: 2, label: 'DONS AUX ASSOCIATIONS', frontColor: '#36a2eb' },
            ]
        },
        {
            titre : "GESTES ÉCOLOGIQUES HEBDOMADAIRES",
            component : GesteEcoHebdomadaire,
            data : {
                labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
                datasets: [{ data: [1, 2, 0, 0, 0, 0, 0] }],
            }
        },
        {
            titre : "RÉPARTITION DES POSTS ",
            component : PostsRepartitionChart,
            data : [
                { name: "de posts validés", population: 25, color: "rgba(76,175,80,0.6)", legendFontColor: "#333" },
                { name: "de posts refusés", population: 15, color: "rgba(244,67,54,0.6)", legendFontColor: "#333" },
                { name: "de posts non votés", population: 60, color: "rgba(33,150,243,0.6)", legendFontColor: "#333" },
            ]

        },
        {
            titre : "RÉPARTITION DES OBJETS ABANDONNÉS ",
            component : ObjetsAbandonneesChart,
            data : [
                { name: "d'objets retrouvés", population: 25, color: "#FFD580", legendFontColor: "#333" },
                { name: "d'objets récupérés", population: 75, color: "#87CEFA", legendFontColor: "#333" },
            ]
        },
    ]


    if (!user?.admin) {
        return <AccesReserveAdmin/>
    }

    return (
        <View style={styles.container}>
            <View style={{ width: "15%" }}>
                <Navbar/>
            </View>
            <View style={{ flex: 1}}>
                <Header/>
                {isLoading ? (
                    <View style={{flex : 1, alignItems:"center", justifyContent : "center", gap : 10}}>
                        <Text style={{fontSize : 20, fontWeight : "bold", color : "#1DDE9A"}}>
                            Chargement des données
                        </Text>
                        <ActivityIndicator size="large" color="#1DDE9A" />
                    </View>
                ) : (
                <ScrollView style={styles.contenuContainer} contentContainerStyle={{flexGrow : 1}}>
                    <View style={styles.cartesContainer}>
                        {
                            cartesTab.map((tab, index) => {
                                return (
                                    <View key={index} style={[styles.carte, {backgroundColor: tab.couleur}]} >
                                        <View style={styles.titreContainer}>
                                            <Image source={tab.icon} style={styles.carteImage} />
                                            <Text style={styles.carteTitre}>{tab.titre}</Text>
                                        </View>
                                        <Text style={styles.carteDataText}>{tab.data || 0}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <View style={styles.graphsContainer}>
                        {
                            graphsTab.map((tab, index) => {
                                const GRAPH = tab.component;
                                return (
                                    <View key={index} style={styles.graphContainer}>
                                        <Text style={styles.graphTitre}>{tab.titre}</Text>
                                        <View style={styles.graph}>
                                            <GRAPH data={tab.data}/>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </View>
                </ScrollView>)}
            </View>
        </View>
    )
};
