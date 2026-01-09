import React from "react";
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
import RewardsByCategoryChart from "./_graph/RewardsByCategoryChart";
import WeeklyEcoActionsChart from "./_graph/WeeklyEcoActionsChart";
import PostsDistributionChart from "./_graph/PostsDistributionChart";
import AbandonedObjectsChart from "./_graph/AbandonedObjectsChart";

export default function Statistiques() {

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
        {titre : "SIGNALEMENT", icon : signalement,couleur : "#FBD036", data : statistiques_Data.signalement},
        {titre : "JUSTIFICATIFS EN ATTENTE", icon : document,couleur : "#79C360", data : statistiques_Data.justificatifs},
        {titre : "PARTENAIRES", icon : partenaire,couleur : "#7E58CF", data : statistiques_Data.partenaires},
        {titre : "RÉCOMPENSES", icon : recompense,couleur : "#2DBEBB", data : statistiques_Data.recompenses},
        {titre : "POST PUBLIÉS", icon : post,couleur : "#F58F44", data : statistiques_Data.post},
        {titre : "POST VALIDÉ", icon : post,couleur : "#EC3796", data : statistiques_Data.postValid},
    ]

    return (
        <View style={styles.container}>
            <View style={{ width: "15%" }}>
                <Navbar/>
            </View>
            <View style={{ flex: 1}}>
                <Header/>
                <ScrollView style={styles.contenuContainer} contentContainerStyle={{flex : 1}}>
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

                    <View style={{flex: 1, flexDirection: "row", flexWrap : "wrap", justifyContent: "space-evenly", alignItems: "center"}}>
                        <RewardsByCategoryChart/>
                        <WeeklyEcoActionsChart/>
                        <PostsDistributionChart/>
                        <AbandonedObjectsChart/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};
