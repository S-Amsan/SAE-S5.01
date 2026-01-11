import React, {useEffect} from "react";
import {View, Text, Image, ScrollView} from "react-native";


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

export default function Statistiques() {
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        loadUser().then(setUser);
    }, []);

    const statistiques_Data = {
        compteCree : 100,
        userBan : 3,
        signalement : 12,
        justificatifs : 35,
        partenaires : 15,
        recompenses : 42,
        post : 2135,
        postValid : 781,
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
        {titre : "RÉPARTITION DES RÉCOMPENSES ACHETÉES PAR CATÉGORIE", component : RecompensesParCategorieChart},
        {titre : "GESTES ÉCOLOGIQUES HEBDOMADAIRES", component : GesteEcoHebdomadaire},
        {titre : "RÉPARTITION DES POSTS ", component : PostsRepartitionChart},
        {titre : "RÉPARTITION DES OBJETS ABANDONNÉS ", component : ObjetsAbandonneesChart},
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
                                            <GRAPH/>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </View>
                </ScrollView>
            </View>
        </View>
    )
};
