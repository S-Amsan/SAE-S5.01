import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import dayjs from "dayjs";
import {Ionicons} from "@expo/vector-icons";

const JOURS = ["LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM.", "DIM."];

export default function Calendrier({dernierAction, flammes, periodeEnCours}) {
    const [moisCourant, setMoisCourant] = useState(dayjs());

    const debutMois = moisCourant.startOf("month");
    const finMois = moisCourant.endOf("month");

    // Lundi comme premier jour
    const debutCalendrier = debutMois.startOf("week").add(1, "day");
    const finCalendrier = finMois.endOf("week").add(1, "day");

    const jours = [];
    let jour = debutCalendrier;

    while (jour.isBefore(finCalendrier)) {
        jours.push(jour);
        jour = jour.add(1, "day");
    }

    const semaines = [];
    for (let i = 0; i < jours.length; i += 7) {
        semaines.push(jours.slice(i, i + 7));
    }


    const estDansPeriode = (date) => { // flamme
        if (!dernierAction || !flammes) return null;

        const finPeriode = dayjs(dernierAction);

        if (!periodeEnCours) {
            return null;
        }

        const debutPeriode = finPeriode.subtract(flammes - 1, 'day');
        const apresOuEgaleDebut = date.isAfter(debutPeriode) || date.isSame(debutPeriode, 'day');
        const avantOuEgaleFin = date.isBefore(finPeriode) || date.isSame(finPeriode, 'day');
        return apresOuEgaleDebut && avantOuEgaleFin;
    };

    const flammesPerdue = (jour) => {
        if (!dernierAction || !periodeEnCours) return false;

        // 1. Si le jour est hier
        const estHier = jour.isSame(dayjs().subtract(1, 'day'), 'day');
        if (!estHier) return false;

        // 2. Si dernierAction était avant hier
        const dateDernierAction = dayjs(dernierAction);
        const hier = dayjs().subtract(1, 'day');
        const dernierActionAvantHier = dateDernierAction.isBefore(hier, 'day');

        return dernierActionAvantHier;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.titre}>
                    {moisCourant.format("MMMM YYYY")}
                </Text>

                <View style={styles.navigation}>
                    <TouchableOpacity
                        onPress={() => setMoisCourant(moisCourant.subtract(1, "month"))}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={25}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setMoisCourant(moisCourant.add(1, "month"))}
                    >
                        <Ionicons
                            name="chevron-forward"
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Jours */}
            <View style={styles.joursSemaine}>
                {JOURS.map(j => (
                    <Text key={j} style={styles.jourSemaine}>
                        {j}
                    </Text>
                ))}
            </View>

            {/* Calendrier */}
            {semaines.map((semaine, i) => (
                <View key={i} style={styles.semaine}>
                    {semaine.map((jour, index) => {
                        const horsMois = !jour.isSame(moisCourant, "month");
                        const seriePerdue = flammesPerdue(jour)
                        const dansPeriode = estDansPeriode(jour)
                        const aujourdhui = jour.isSame(dayjs(), 'day')



                        return (
                            <View
                                key = {index}
                                style={[
                                    styles.jour,
                                    seriePerdue && styles.jourFlammePerdu,
                                    dansPeriode && styles.jourFlamme,
                                    horsMois && styles.jourHorsMois,
                                ]}
                            >
                                {!horsMois ? (
                                    <View style={{alignItems : "center", justifyContent : "center"}}>
                                        <Text style={[
                                            styles.jourText,
                                            (dansPeriode || seriePerdue) && styles.jourFlammeText,
                                        ]}>{jour.date()}</Text>
                                        {aujourdhui && <View style={styles.aujourdhui} />}
                                    </View>
                                ) : (
                                    <View style={styles.jourVide} />
                                )}
                            </View>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

const ORANGE = "#ff7a00";

const styles = StyleSheet.create({
    container: {
        width: 360,
        height : 400,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical : 10,
    },

    titre: {
        fontSize: 18,
        fontWeight: "600",
        textTransform: "capitalize",
    },

    navigation: {
        flexDirection: "row",
        gap: 10,
    },
    navBtn: {
        fontSize: 30,
        fontWeight: "600",
    },

    joursSemaine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    jourSemaine: {
        width: 44,
        textAlign: "center",
        fontSize: 12,
        fontWeight: "600",
        color: ORANGE,
    },
    semaine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    jour: {
        width: 37,
        height: 37,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor : ORANGE,
        zIndex : 1,
    },
    jourFlamme: {
        backgroundColor: ORANGE,
    },
    jourFlammePerdu: {
        backgroundColor: "#969696",
        borderColor : "#969696",

    },
    jourText: {
        color: ORANGE,
        fontWeight: "600",
    },
    jourFlammeText:{
        color: "#fff",
        fontWeight: "600",
    },
    aujourdhui : {
        position: "absolute",
        bottom: -17,
        width: 4,
        height: 4,
        borderRadius: 3,
        backgroundColor: ORANGE,
    },
    jourHorsMois: {
        backgroundColor: "transparent",
        borderWidth: 0,
    },

    jourVide: {
        width: "100%",
        height: "100%",
    },
});
