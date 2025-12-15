import { ScrollView, Text, View, Image} from "react-native";
import React from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";
import TabNavbarMobile from "../../../../components/TabNavbarMobile";

import { isWeb } from "../../../../utils/platform";

import cible from "../../../../assets/icones/social/cible.png";
import horloge from "../../../../assets/icones/social/horloge.png";

import styles from "./styles/styles";

const EnCours = ({ isActive }) => {
    return (
        <View style={[styles.contenuContainer,{ display: isActive ? "flex" : "none"}]}>
            <View style={styles.partieInfoContainer}>
                <View style={styles.nomEventContainer}>
                    <Text style={styles.nomEventText}>Concours du 11/25</Text>
                </View>
                <View style={styles.InfoEventWrapper}>
                    <View style={styles.InfoEventContainer}>
                        <Image source={cible} style={styles.InfoEventImage}></Image>
                        <Text style={styles.InfoEventNom}>Objectif : atteindre 10 000 points</Text>
                    </View>
                    <View style={styles.InfoEventContainer}>
                        <Image source={horloge} style={styles.InfoEventImage}></Image>
                        <Text style={styles.InfoEventNom}>Fin dans 19 jours </Text>
                    </View>
                </View>
            </View>

            <View style={styles.carteInfoContainer}></View>
            <View style={styles.boutonsContainer}></View>
            <View style={styles.infosContainer}></View>
        </View>
    );
};

const Statistiques = ({ isActive }) => {
    return (
        <View style={[styles.contenuContainer,{ display: isActive ? "flex" : "none"}]}>
            <Text>Contenu Statistiques</Text>
        </View>
    );
};

export default function Concours() {
    const ongletsWeb = [
        { id: "classement", label: "Leaderboard", page: "social/classement" },
        { id: "concours", label: "Concours", page: "social/concours" },
        { id: "evenements", label: "Événements", page: "social/evenements" },
    ];

    const ongletsMobile = [
        { id: "encours", label: "En cours", component: EnCours },
        { id: "statistiques", label: "Statistiques", component: Statistiques },
    ];

    const [ongletActifId, setOngletActifId] = React.useState("encours");

    return (
        <View style={styles.container}>
            {isWeb && (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            )}

            <View style={{ flex: 1 }}>
                {isWeb ? (
                    <Header userDetails={true} />
                ) : (
                    <Header titre={"Concours"} boutonRetour={true} />
                )}

                <ScrollView>
                    {isWeb ? (
                        <TabNavbarWeb onglets={ongletsWeb} pageBack={"social"} />
                    ) : (
                        <TabNavbarMobile
                            ongletActifId={ongletActifId}
                            onglets={ongletsMobile}
                            setOngletActif={setOngletActifId}
                        />
                    )}

                    {/* Affichage des onglets mobile */}
                    {!isWeb &&
                        ongletsMobile.map((onglet) => {
                            const OngletComponent = onglet.component;
                            return (
                                <OngletComponent
                                    key={onglet.id}
                                    isActive={onglet.id === ongletActifId}
                                />
                            );
                        })}
                </ScrollView>
            </View>
        </View>
    );
}
