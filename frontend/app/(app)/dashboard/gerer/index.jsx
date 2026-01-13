import React, {useEffect, useMemo, useCallback, useState} from "react";
import {View, Text, ScrollView, ActivityIndicator} from "react-native";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";

import AccesReserveAdmin from "../_component/AccesReserveAdmin";

import Signalements from "./_cartes/Signalements";
import Utilisateurs from "./_cartes/Utilisateurs";
import Gestes from "./_cartes/Gestes";
import Justificatifs from "./_cartes/Justificatifs";
import Recompenses from "./_cartes/Recompenses";
import Partenaires from "./_cartes/Partenaires";
import Challenges from "./_cartes/Challenges";

import {fetchUsers} from "../../../../services/user.api";
import {fetchAllReports} from "../../../../services/reports.api";
import {fetchAllCards} from "../../../../services/cards.api";
import {fetchAllDocuments} from "../../../../services/documents.api";
import {fetchDonations, getAllPartners} from "../../../../services/admin.api";
import {fetchFollowingCompetitions} from "../../../../services/competitions.api";
import {fetchFollowingEvents} from "../../../../services/events.api";

import {loadUser} from "../../../../services/RegisterStorage";
import styles from "./styles";

export default function Gerer() {
    const [user, setUser] = React.useState(null);

    const [signalement_DATA, setSignalementData] = useState(null);
    const [utilisateurs_DATA, setUtilisateursData] = useState(null);
    const [gestes_DATA, setGestesData] = useState(null);
    const [justificatifs_DATA, setJustificatifsData] = useState(null);
    const [partenaires_DATA, setPartenairesData] = useState(null);
    const [recompenses_DATA, setRecompensesData] = useState(null);
    const [evenements_DATA, setEvenementsData] = useState(null);
    const [concours_DATA, setConcoursData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser().then(setUser);
    }, []);

    const allData = useMemo(() => ({
        signalements: signalement_DATA,
        utilisateurs: utilisateurs_DATA,
        gestes: gestes_DATA,
        justificatifs: justificatifs_DATA,
        partenaires: partenaires_DATA,
        recompenses: recompenses_DATA,
        evenements: evenements_DATA,
        concours: concours_DATA,
    }), [
        signalement_DATA,
        utilisateurs_DATA,
        gestes_DATA,
        justificatifs_DATA,
        partenaires_DATA,
        recompenses_DATA,
        evenements_DATA,
        concours_DATA,
    ]);

    const fetchers = useMemo(() => ({
        signalements: fetchAllReports,
        utilisateurs: fetchUsers,
        gestes: fetchAllCards,
        justificatifs: fetchAllDocuments,
        recompenses: fetchDonations,
        evenements: fetchFollowingEvents,
        concours: fetchFollowingCompetitions,
        partenaires: getAllPartners,
    }), []);

    const setters = useMemo(() => ({
        signalements: setSignalementData,
        utilisateurs: setUtilisateursData,
        gestes: setGestesData,
        justificatifs: setJustificatifsData,
        recompenses: setRecompensesData,
        evenements: setEvenementsData,
        concours: setConcoursData,
        partenaires: setPartenairesData,
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

    // reloadData()
    // reloadData("utilisateurs")
    // reloadData(["utilisateurs", "justificatifs"])
    const reloadData = useCallback(async (param) => {
        const keys = !param
            ? ALL_KEYS
            : Array.isArray(param)
                ? param
                : [param];

        await loadData(keys);
    }, [ALL_KEYS, loadData]);

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

    if (!user?.admin) {
        return <AccesReserveAdmin />;
    }

    const carteTab = [
        {
            titre: "SIGNALEMENTS",
            boutonAjouter: false,
            infoSupplementaire: {text: "signalements en attente"},
            couleur: "#EB5254",
            component: Signalements,
            data: signalement_DATA,
            reloadData,
        },
        {
            titre: "UTILISATEURS",
            boutonAjouter: false,
            infoSupplementaire: null,
            couleur: "",
            component: Utilisateurs,
            data: utilisateurs_DATA,
            reloadData,
        },
        {
            titre: "GESTES",
            boutonAjouter: true,
            infoSupplementaire: null,
            couleur: "#FF5B02",
            component: Gestes,
            data: gestes_DATA,
            reloadData,
        },
        {
            titre: "JUSTIFICATIFS",
            boutonAjouter: false,
            infoSupplementaire: {text: "justificatifs en attente"},
            couleur: "#525CEB",
            component: Justificatifs,
            data: justificatifs_DATA,
            reloadData,
        },
        {
            titre: "PARTENAIRES",
            boutonAjouter: true,
            infoSupplementaire: null,
            couleur: "#7E58CF",
            component: Partenaires,
            data: partenaires_DATA,
            reloadData,
        },
        {
            titre: "RÉCOMPENSES",
            boutonAjouter: true,
            infoSupplementaire: null,
            couleur: "#2DBEBB",
            component: Recompenses,
            data: recompenses_DATA,
            reloadData,
        },
        {
            titre: "ÉVÉNEMENTS",
            boutonAjouter: true,
            infoSupplementaire: null,
            couleur: "#E7A2F0",
            component: Challenges,
            data: evenements_DATA,
            reloadData,
        },
        {
            titre: "CONCOURS",
            boutonAjouter: true,
            infoSupplementaire: null,
            couleur: "#FFD700",
            component: Challenges,
            data: concours_DATA,
            reloadData,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            <View style={{ flex: 1 }}>
                <Header />

                {isLoading ? (
                    <View style={{flex : 1, alignItems:"center", justifyContent : "center", gap : 10}}>
                        <Text style={{fontSize : 20, fontWeight : "bold", color : "#1DDE9A"}}>
                            Chargement des données
                        </Text>
                        <ActivityIndicator size="large" color="#1DDE9A" />
                    </View>
                ) : (
                    <ScrollView style={styles.contenuContainer} contentContainerStyle={{flexGrow: 1}}>
                        <View style={styles.cartesContainer}>
                            {carteTab.map((carte, index) => {
                                const Carte = carte.component;
                                return (
                                    <Carte
                                        key={index}
                                        carte={carte}
                                        allData={allData}
                                    />
                                );
                            })}
                        </View>
                    </ScrollView>
                )}
            </View>
        </View>
    );
}
