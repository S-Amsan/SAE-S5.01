import React, {useEffect, useState} from "react";
import {View, ScrollView} from "react-native";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";

import Signalements from "./_cartes/Signalements";

import {fetchAllReports} from "../../../../services/reports.api";
import AccesReserveAdmin from "../_component/AccesReserveAdmin";
import {loadUser} from "../../../../services/RegisterStorage";

import styles from "./styles";

export default function Gerer() {
    const [user, setUser] = React.useState(null);
    const [signalement_DATA, setSignalementDATA] = useState(null);

    useEffect(() => {
        fetchAllReports().then(setSignalementDATA);
        loadUser().then(setUser);
    },[])

    if (!user?.admin) {
        return <AccesReserveAdmin/>
    }

    const carteTab = [
        {
            titre : "SIGNALEMENTS",
            boutonAjouter : false,
            infoSupplementaire : {text : "signalements en attente"},
            couleur : "#EB5254",
            component : Signalements,
            data : signalement_DATA,
        },
        {
            titre : "UTILISATEURS",
            boutonAjouter : false,
            infoSupplementaire : null,
            couleur: "",
            component : Signalements,
        },
        {
            titre : "GESTES",
            boutonAjouter : true,
            infoSupplementaire : null,
            couleur: "#FF5B02",
            component : Signalements,
        },
        {
            titre : "JUSTIFICATIFS",
            boutonAjouter : false,
            infoSupplementaire : {text : "justificatifs en attente"},
            couleur: "#525CEB",
            component : Signalements,
        },
        {
            titre : "PARTENAIRES",
            boutonAjouter : true,
            infoSupplementaire : null,
            couleur: "#7E58CF",
            component : Signalements,
        },
        {
            titre : "RÉCOMPENSES",
            boutonAjouter : true,
            infoSupplementaire : null,
            couleur: "#2DBEBB",
            component : Signalements,
        },
        {
            titre : "ÉVÉNEMENTS",
            boutonAjouter : true,
            infoSupplementaire : null,
            couleur: "#E7A2F0",
            component : Signalements,
        },
        {
            titre : "CONCOURS",
            boutonAjouter : true,
            infoSupplementaire : null,
            couleur: "#FFD700",
            component : Signalements,
        },
    ]
    return (
        <View style={styles.container}>
            <View style={{ width: "15%" }}>
                <Navbar/>
            </View>
            <View style={{ flex: 1}}>
                <Header/>
                <ScrollView style={styles.contenuContainer} contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.cartesContainer}>
                        {carteTab.map((carte,index) => {
                            const Carte = carte.component;
                            return (
                                <Carte key={index} carte={carte}/>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};
