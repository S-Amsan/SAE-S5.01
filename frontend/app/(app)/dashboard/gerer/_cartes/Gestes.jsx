import React, {useMemo, useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import Carte from "../../_component/Carte";
import {formatNombreEspace} from "../../../../../utils/format";
import Toast from "react-native-toast-message";

import {Picker} from "@react-native-picker/picker";
import {deleteCard, publishCard} from "../../../../../services/admin.api";



export default function Gestes({carte, allData}) {
    // Ajouter //
    const [ajouter, setAjouter] = useState(false);

    // Barre de recherche & Filtre //
    const [recherche, setRecherche] = useState("");

    const filtres = [
        ["De A à Z", "De Z à A"],
        ["Points ↑", "Points ↓"],
    ];

    const valeurDefaut = ["De A à Z", "Points ↑"];
    const [selected, setSelected] = useState(valeurDefaut);
    const [triTitre, triPoints] = selected;


    const [partenaireId, setPartenaireId] = useState(""); // string
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(""); // string, converti en int

    const partenaires = useMemo(() => {
        const list = allData?.partenaires ?? [];
        return Array.isArray(list) ? list : [];
    }, [allData?.partenaires]);

    const dataFiltree = (carte?.data ?? [])
        .filter((c) => {
            const q = recherche.trim().toLowerCase();
            if (!q) return true;

            const title = (c.title ?? "").toLowerCase();
            const desc = (c.description ?? "").toLowerCase();
            return title.includes(q) || desc.includes(q);
        })
        .sort((a, b) => {
            const A = (a.title ?? "").toLowerCase();
            const B = (b.title ?? "").toLowerCase();
            const titreCompare = triTitre === "De Z à A" ? B.localeCompare(A) : A.localeCompare(B);

            const pa = Number(a.points ?? 0);
            const pb = Number(b.points ?? 0);
            const pointsCompare = triPoints === "Points ↓" ? pb - pa : pa - pb;

            return titreCompare !== 0 ? titreCompare : pointsCompare;
        });

    const resetFiltres = () => {
        setRecherche("");
        setSelected(valeurDefaut);
    };

    const onChangePoints = (v) => {
        // garde uniquement les chiffres
        const cleaned = (v ?? "").replace(/[^0-9]/g, "");
        setPoints(cleaned);
    };

    const resetForm = () => {
        setPartenaireId("");
        setDescription("");
        setPoints("");
    };

    const handleAjouter = () => {
        const descOk = description.trim().length > 0;
        const partenaireOk = String(partenaireId).trim().length > 0;
        const pointsInt = parseInt(points, 10);
        const pointsOk = Number.isInteger(pointsInt) && pointsInt > 0;

        if (!partenaireOk || !descOk || !pointsOk) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "Veuillez remplir tous les champs.",
            });
            return;
        }

        const partenaireObj = partenaires.find((p) => String(p.id) === String(partenaireId)) ?? null;

        const payload = {
            partenaireId: pointsInt ? String(partenaireId) : partenaireId,
            partenaire: partenaireObj,
            description: description.trim(),
            points: pointsInt,
        };

        console.log("AJOUT GESTE =", payload);


        publishCard( payload.partenaire.name,
            payload.description,
            payload.partenaire.imageUrl,
            payload.points,
            payload.partenaireId  )
            .then(() => {
                carte.reloadData("gestes");
                Toast.show({
                    type: "success",
                    text1: "Confirmation d'ajout",
                    text2: "Le Geste a été ajouté avec succès!",
                });

                resetForm();
                setAjouter(false);
            })
            .catch((err) => {
                console.error(err);
                Toast.show({
                    type: "error",
                    text1: "Erreur",
                    text2: err.message,
                });
            });



        resetForm();
        setAjouter(false);
    };

    const handleDelete = (geste) => {
        Toast.show({
            type: "success",
            text1: "Confirmation de suppression",
            text2: `Le geste à été supprimer avec succès!`,
        });

        console.log(geste)

        deleteCard(geste.id)
            .then(() => {
                carte.reloadData("gestes");
                Toast.show({
                    type: "success",
                    text1: "Confirmation de suppression",
                    text2: "Le geste à été supprimer avec succès!",
                });

                resetForm();
                setAjouter(false);
            })
            .catch((err) => {
                console.error(err);
                Toast.show({
                    type: "error",
                    text1: "Erreur",
                    text2: err.message,
                });
            });
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
                <View style={{flexDirection: "row", marginVertical: 5, paddingHorizontal: 7.5, paddingVertical: 4, backgroundColor: "#F7F7F7"}}>
                    <Text style={[styles.colonneText, {width: "10%"}]}>Photo</Text>
                    <Text style={[styles.colonneText, {width: "15%"}]}>Partenaire</Text>
                    <Text style={[styles.colonneText, {width: "43%"}]}>Description</Text>
                    <Text style={[styles.colonneText, {width: "10%"}]}>Point</Text>
                    <Text style={[styles.colonneText, {width: "22%"}]}>Action</Text>
                </View>
            }
            footer={
                <View style={{flex: 1, justifyContent: "flex-end", paddingHorizontal: 30, alignItems: "center", flexDirection: "row", gap: 30}}>
                    <TouchableOpacity style={[styles.boutonAnnuler]} onPress={() => { resetForm(); setAjouter(false); }}>
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
                    {dataFiltree.map((c) => {
                        return (
                            <View
                                key={c.id}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: 5,
                                    borderColor: "#bebebe",
                                    borderBottomWidth: 1,
                                }}
                            >
                                <View style={{width: "10%", alignItems: "center"}}>
                                    <Image style={[styles.partenairePhoto]} source={{uri: c.photoUrl}} />
                                </View>

                                <Text style={[styles.colonneText, {width: "15%"}]}>{c.title}</Text>
                                <Text style={[styles.colonneText, {width: "46%"}]}>{c.description}</Text>
                                <Text style={[styles.colonneText, {width: "10%"}]}>{formatNombreEspace(c?.points || 0)}</Text>

                                <TouchableOpacity style={[styles.bouton, {backgroundColor: "#ef4745"}]} onPress={() => handleDelete(c)}>
                                    <Text style={styles.boutonText}>Supprimer</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}

                    {!carte?.data ? (
                        <Text>Aucun geste</Text>
                    ) : (
                        dataFiltree.length === 0 && (
                            <Text>
                                Aucun résultat,{" "}
                                <Text style={styles.resetText} onPress={() => resetFiltres()}>
                                    Réinitialiser les filtres.
                                </Text>
                            </Text>
                        )
                    )}
                </>
            ) : (

                <View style={{flex: 1, alignItems: "flex-start", flexDirection: "row", gap: 25, marginTop: 20}}>
                    <View style={{flex: 1, gap: 20}}>
                        {/* Partenaire dropdown */}
                        <View style={{flex: 1, alignItems: "center", flexDirection: "row", gap: 10}}>
                            <Text style={{width: "15%"}}>Partenaire :</Text>

                            <Picker selectedValue={partenaireId} onValueChange={(v) => setPartenaireId(v)} style={styles.pickerWrapper}>
                                <Picker.Item label="Sélectionner un partenaire" value="" />
                                {partenaires.map((p) => (
                                    <Picker.Item key={p.id} label={p.name ?? `Partenaire #${p.id}`} value={String(p.id)} />
                                ))}
                            </Picker>
                        </View>

                        {/* Description */}
                        <View style={{flex: 1, alignItems: "center", flexDirection: "row", gap: 10}}>
                            <Text style={{width: "15%"}}>Description :</Text>
                            <TextInput
                                placeholder="Description, exemple : Associer votre abonnement exemple à Ecoception"
                                placeholderTextColor="#777"
                                style={styles.rechercheInput}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        {/* Points int only */}
                        <View style={{flex: 1, alignItems: "center", flexDirection: "row", gap: 10}}>
                            <Text style={{width: "15%"}}>Points :</Text>
                            <TextInput
                                placeholder="Points (> 0)"
                                placeholderTextColor="#777"
                                style={styles.rechercheInput}
                                value={points}
                                onChangeText={onChangePoints}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>
            )}
        </Carte>
    );
}

const styles = StyleSheet.create({
    resetText: {
        color: "#4192e3",
        textDecorationLine: "underline",
    },
    colonneText: {
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
    },
    partenairePhoto: {
        height: 35,
        width: 35,
        borderRadius: 35,
    },
    bouton: {
        marginHorizontal: 25,
        paddingVertical: 2.5,
        borderRadius: 5,
        width: 90,
    },
    boutonText: {
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "400",
    },
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
    rechercheInput: {
        flex: 1,
        marginLeft: 6,
        outlineStyle: "none",
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 7.5,
        backgroundColor: "#eaeaea",
    },
    pickerWrapper: {
        flex: 1,
        marginLeft: 6,
        outlineStyle: "none",
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 7.5,
        backgroundColor: "#ffffff",
        overflow: "hidden",
    },
});
