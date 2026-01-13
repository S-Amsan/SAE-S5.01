import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Carte from "../../_component/Carte";
import Toast from "react-native-toast-message";

const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("fr-FR");
};

const parseTime = (iso) => {
    const t = new Date(iso).getTime();
    return Number.isNaN(t) ? null : t;
};

const getEtat = (c) => {
    const now = new Date();
    const end = new Date(c?.deadline);
    if (Number.isNaN(end.getTime())) return "—";
    return now > end ? "Terminé" : "En cours";
};

const compareEvenements = (a, b, tri) => {
    switch (tri) {
        case "A à Z": {
            const A = (a?.name ?? "").toLowerCase();
            const B = (b?.name ?? "").toLowerCase();
            return A.localeCompare(B, "fr", { sensitivity: "base" });
        }

        case "Z à A": {
            const A = (a?.name ?? "").toLowerCase();
            const B = (b?.name ?? "").toLowerCase();
            return B.localeCompare(A, "fr", { sensitivity: "base" });
        }

        case "Ancien": {
            const A = parseTime(a?.deadline);
            const B = parseTime(b?.deadline);
            if (A === null && B === null) return 0;
            if (A === null) return 1;
            if (B === null) return -1;
            return A - B;
        }

        case "Récent":
        default: {
            const A = parseTime(a?.deadline);
            const B = parseTime(b?.deadline);
            if (A === null && B === null) return 0;
            if (A === null) return 1;
            if (B === null) return -1;
            return B - A;
        }
    }
};

const handleDelete = (challenge, type) => {
    //.then(() => // TODO
    Toast.show({
        type: "success",
        text1: "Confirmation de suppression",
        text2: `L${type === "ÉVÉNEMENTS" ? "'événement" : "e concours"} à été supprimer avec succès!`
    })
    //)
}

// Evenements et Concours
export default function Challenges({ carte }) {
    const [recherche, setRecherche] = useState("");

    // 1 seul filtre "Tri" (A/Z + Récent/Ancien) + 1 filtre état
    const filtres = [
        ["A à Z", "Z à A", "Récent", "Ancien"],
        ["Tous", "En cours", "Terminé"],
    ];

    const valeurDefaut = ["Récent", "Tous"];
    const [selected, setSelected] = useState(valeurDefaut);

    const [tri, etatFiltre] = selected;

    const dataFiltree = useMemo(() => {
        return (carte?.data ?? [])
            // Recherche sur name
            .filter((c) => {
                const q = recherche.trim().toLowerCase();
                if (!q) return true;
                return (c?.name ?? "").toLowerCase().includes(q);
            })
            // Filtre état (basé sur deadline)
            .filter((c) => {
                if (etatFiltre === "Tous") return true;
                return getEtat(c) === etatFiltre;
            })
            .slice() // évite de muter carte.data
            .sort((a, b) => compareEvenements(a, b, tri));
    }, [carte?.data, recherche, tri, etatFiltre]);

    const resetFiltres = () => {
        setRecherche("");
        setSelected(valeurDefaut);
    };


    return (
        <Carte
            carte={carte}
            recherche={recherche}
            setRecherche={setRecherche}
            filtres={filtres}
            selected={selected}
            setSelected={setSelected}
            styleScrollView={{ paddingTop: 0 }}
            header={
                <View style={styles.headerRow}>
                    <Text style={[styles.colonneText, { width: "22%" }]}>Événement</Text>
                    <Text style={[styles.colonneText, { width: "13%" }]}>Objectif</Text>
                    <Text style={[styles.colonneText, { width: "13%" }]}>Inscription</Text>
                    <Text style={[styles.colonneText, { width: "12%" }]}>Début</Text>
                    <Text style={[styles.colonneText, { width: "12%" }]}>Fin</Text>
                    <Text style={[styles.colonneText, { width: "13%" }]}>État</Text>
                    <Text style={[styles.colonneText, { width: "15%" }]}>Action</Text>
                </View>
            }
        >
            {dataFiltree.map((c, idx) => {
                const goal = Number(c?.goalPoints ?? 0);
                const cost = Number(c?.inscriptionCost ?? 0);
                const etat = getEtat(c);

                return (
                    <View key={c?.id ?? `event-${idx}`} style={styles.row}>
                        <Text style={[styles.cellLeft, { width: "22%" }]} numberOfLines={2}>
                            {c?.name ?? ""}
                        </Text>

                        <Text style={[styles.colonneText, { width: "13%" }]} numberOfLines={1}>
                            {goal.toLocaleString("fr-FR")}
                        </Text>

                        <Text style={[styles.colonneText, { width: "13%" }]} numberOfLines={1}>
                            {cost.toLocaleString("fr-FR")}
                        </Text>

                        <Text style={[styles.colonneText, { width: "12%" }]} numberOfLines={1}>
                            {formatDate(c?.creationDate)}
                        </Text>

                        <Text style={[styles.colonneText, { width: "12%" }]} numberOfLines={1}>
                            {formatDate(c?.deadline)}
                        </Text>

                        <Text
                            style={[
                                styles.colonneText,
                                { width: "13%" },
                                etat === "Terminé" ? styles.etatTermine : styles.etatEnCours,
                            ]}
                            numberOfLines={1}
                        >
                            {etat}
                        </Text>

                        <View style={{ width: "15%", alignItems: "center" }}>
                            <TouchableOpacity
                                style={[styles.bouton, { backgroundColor: "#ef4745" }]}
                                onPress={() => handleDelete(c, carte.titre)}
                            >
                                <Text style={styles.boutonText}>Supprimer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}

            {!carte?.data ? (
                <Text>Aucun événement</Text>
            ) : (
                dataFiltree.length === 0 && (
                    <Text>
                        Aucun résultat,{" "}
                        <Text style={styles.resetText} onPress={resetFiltres}>
                            Réinitialiser les filtres.
                        </Text>
                    </Text>
                )
            )}
        </Carte>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        marginVertical: 5,
        paddingHorizontal: 7.5,
        paddingVertical: 4,
        backgroundColor: "#F7F7F7",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderColor: "#bebebe",
        borderBottomWidth: 1,
    },
    colonneText: {
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },
    cellLeft: {
        fontSize: 13,
        fontWeight: "600",
        textAlign: "left",
        paddingRight: 6,
    },
    resetText: {
        color: "#4192e3",
        textDecorationLine: "underline",
    },
    bouton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
        minWidth: 90,
    },
    boutonText: {
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "400",
        fontSize: 12,
    },
    etatEnCours: {
        color: "#2e8b57",
    },
    etatTermine: {
        color: "#dc4b4b",
    },
});
