import React, {useMemo, useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import Carte from "../../_component/Carte";
import Toast from "react-native-toast-message";

import {publishCompetition, deleteCompetition} from "../../../../../services/admin.api";

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
            return A.localeCompare(B, "fr", {sensitivity: "base"});
        }
        case "Z à A": {
            const A = (a?.name ?? "").toLowerCase();
            const B = (b?.name ?? "").toLowerCase();
            return B.localeCompare(A, "fr", {sensitivity: "base"});
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

const isConcours = (titre) => String(titre ?? "").toUpperCase().includes("CONCOURS");

const toIsoEndOfDay = (frDate) => {
    // frDate attendu: "YYYY-MM-DD"
    if (!frDate) return "";
    return `${frDate}T23:59:59.000Z`;
};

export default function Challenges({carte}) {
    const [ajouter, setAjouter] = useState(false);

    const [recherche, setRecherche] = useState("");

    const filtres = [
        ["A à Z", "Z à A", "Récent", "Ancien"],
        ["Tous", "En cours", "Terminé"],
    ];

    const valeurDefaut = ["Récent", "Tous"];
    const [selected, setSelected] = useState(valeurDefaut);
    const [tri, etatFiltre] = selected;

    const dataFiltree = useMemo(() => {
        return (carte?.data ?? [])
            .filter((c) => {
                const q = recherche.trim().toLowerCase();
                if (!q) return true;
                return (c?.name ?? "").toLowerCase().includes(q);
            })
            .filter((c) => {
                if (etatFiltre === "Tous") return true;
                return getEtat(c) === etatFiltre;
            })
            .slice()
            .sort((a, b) => compareEvenements(a, b, tri));
    }, [carte?.data, recherche, tri, etatFiltre]);

    const resetFiltres = () => {
        setRecherche("");
        setSelected(valeurDefaut);
    };

    // Form ajout
    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState(""); // "YYYY-MM-DD"
    const [goalPoints, setGoalPoints] = useState("");
    const [inscriptionCost, setInscriptionCost] = useState("");

    const onChangeInt = (setter) => (v) => {
        const cleaned = (v ?? "").replace(/[^0-9]/g, "");
        setter(cleaned);
    };

    const resetForm = () => {
        setName("");
        setDeadline("");
        setGoalPoints("");
        setInscriptionCost("");
    };

    const handleAjouter = async () => {
        const nameOk = name.trim().length > 0;
        const deadlineOk = /^\d{4}-\d{2}-\d{2}$/.test(deadline.trim());
        const goalInt = parseInt(goalPoints, 10);
        const costInt = parseInt(inscriptionCost, 10);

        const goalOk = Number.isInteger(goalInt) && goalInt > 0;
        const costOk = Number.isInteger(costInt) && costInt >= 0;

        if (!nameOk || !deadlineOk || !goalOk || !costOk) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "Veuillez remplir tous les champs.",
            });
            return;
        }

        if (!isConcours(carte?.titre)) {
            Toast.show({
                type: "success",
                text1: "Ajout",
                text2: "Ajout simulé (pas d'API pour ÉVÉNEMENTS).",
            });
            resetForm();
            setAjouter(false);
            return;
        }

        try {
            await publishCompetition(
                name.trim(),
                toIsoEndOfDay(deadline.trim()),
                goalInt,
                costInt
            );

            carte.reloadData("concours");

            Toast.show({
                type: "success",
                text1: "Confirmation d'ajout",
                text2: "Le concours a été ajouté avec succès!",
            });

            resetForm();
            setAjouter(false);
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: err?.message ?? "Erreur API",
            });
        }
    };

    const handleDelete = async (challenge) => {
        if (!isConcours(carte?.titre)) {
            Toast.show({
                type: "success",
                text1: "Suppression",
                text2: "Suppression simulée (pas d'API pour ÉVÉNEMENTS).",
            });
            return;
        }

        try {
            await deleteCompetition(challenge.id);

            carte.reloadData("concours");

            Toast.show({
                type: "success",
                text1: "Confirmation de suppression",
                text2: "Le concours a été supprimé avec succès!",
            });
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: err?.message ?? "Erreur API",
            });
        }
    };

    return (
        <Carte
            carte={carte}
            recherche={recherche}
            setRecherche={setRecherche}
            filtres={filtres}
            selected={selected}
            setSelected={setSelected}
            setAjouter={setAjouter}
            ajouter={ajouter}
            styleScrollView={{paddingTop: 0}}
            header={
                <View style={styles.headerRow}>
                    <Text style={[styles.colonneText, {width: "22%"}]}>Événement</Text>
                    <Text style={[styles.colonneText, {width: "13%"}]}>Objectif</Text>
                    <Text style={[styles.colonneText, {width: "13%"}]}>Inscription</Text>
                    <Text style={[styles.colonneText, {width: "12%"}]}>Début</Text>
                    <Text style={[styles.colonneText, {width: "12%"}]}>Fin</Text>
                    <Text style={[styles.colonneText, {width: "13%"}]}>État</Text>
                    <Text style={[styles.colonneText, {width: "15%"}]}>Action</Text>
                </View>
            }
            footer={
                <View style={{flex: 1, justifyContent: "flex-end", paddingHorizontal: 30, alignItems: "center", flexDirection: "row", gap: 30}}>
                    <TouchableOpacity
                        style={[styles.boutonAnnuler]}
                        onPress={() => {
                            resetForm();
                            setAjouter(false);
                        }}
                    >
                        <Text style={styles.boutonAnnulerText}>Annuler</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{backgroundColor: carte.couleur, paddingVertical: 7.5, paddingHorizontal: 12.5, borderRadius: 5}}
                        onPress={handleAjouter}
                    >
                        <Text style={{color: "#FFFFFF"}}>Ajouter</Text>
                    </TouchableOpacity>
                </View>
            }
        >
            {!ajouter ? (
                <>
                    {dataFiltree.map((c, idx) => {
                        const goal = Number(c?.goalPoints ?? 0);
                        const cost = Number(c?.inscriptionCost ?? 0);
                        const etat = getEtat(c);

                        return (
                            <View key={c?.id ?? `event-${idx}`} style={styles.row}>
                                <Text style={[styles.cellLeft, {width: "22%"}]} numberOfLines={2}>
                                    {c?.name ?? ""}
                                </Text>

                                <Text style={[styles.colonneText, {width: "13%"}]} numberOfLines={1}>
                                    {goal.toLocaleString("fr-FR")}
                                </Text>

                                <Text style={[styles.colonneText, {width: "13%"}]} numberOfLines={1}>
                                    {cost.toLocaleString("fr-FR")}
                                </Text>

                                <Text style={[styles.colonneText, {width: "12%"}]} numberOfLines={1}>
                                    {formatDate(c?.creationDate)}
                                </Text>

                                <Text style={[styles.colonneText, {width: "12%"}]} numberOfLines={1}>
                                    {formatDate(c?.deadline)}
                                </Text>

                                <Text
                                    style={[
                                        styles.colonneText,
                                        {width: "13%"},
                                        etat === "Terminé" ? styles.etatTermine : styles.etatEnCours,
                                    ]}
                                    numberOfLines={1}
                                >
                                    {etat}
                                </Text>

                                <View style={{width: "15%", alignItems: "center"}}>
                                    <TouchableOpacity
                                        style={[styles.bouton, {backgroundColor: "#ef4745"}]}
                                        onPress={() => handleDelete(c)}
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
                </>
            ) : (
                <View style={{flex: 1, gap: 14, marginTop: 16, paddingHorizontal: 10}}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Nom :</Text>
                        <TextInput
                            placeholder="Nom"
                            placeholderTextColor="#777"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Fin <Text style={{color : "#c3c3c3", fontSize : 11}}>(YYYY-MM-DD)</Text> :</Text>
                        <TextInput
                            placeholder="2026-01-31"
                            placeholderTextColor="#777"
                            style={styles.input}
                            value={deadline}
                            onChangeText={setDeadline}
                        />
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Objectif :</Text>
                        <TextInput
                            placeholder="Points objectif"
                            placeholderTextColor="#777"
                            style={styles.input}
                            value={goalPoints}
                            onChangeText={onChangeInt(setGoalPoints)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Inscription :</Text>
                        <TextInput
                            placeholder="Coût"
                            placeholderTextColor="#777"
                            style={styles.input}
                            value={inscriptionCost}
                            onChangeText={onChangeInt(setInscriptionCost)}
                            keyboardType="numeric"
                        />
                    </View>

                </View>
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
    etatEnCours: {color: "#2e8b57"},
    etatTermine: {color: "#dc4b4b"},

    boutonAnnuler: {
        paddingVertical: 7.5,
        paddingHorizontal: 12.5,
        borderRadius: 5,
        backgroundColor: "#F4F3F6",
    },
    boutonAnnulerText: {
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
    },
    formRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    formLabel: {
        width: "20%",
    },
    input: {
        flex: 1,
        outlineStyle: "none",
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 7.5,
        backgroundColor: "#eaeaea",
    },
});
