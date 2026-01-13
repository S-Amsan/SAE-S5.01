import React, {useMemo, useState} from "react";
import {Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import Carte from "../../_component/Carte";
import Toast from "react-native-toast-message";

import {Picker} from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

import {addPartner, deletePartner} from "../../../../../services/admin.api";

const normalizeTypeLabel = (t) => {
    const s = String(t ?? "").trim();
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};



const pickImageWeb = () => {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => {
            const file = input.files?.[0] ?? null;
            resolve(file);
        };
        input.click();
    });
};

export default function Partenaires({carte}) {
    const [ajouter, setAjouter] = useState(false);

    const [recherche, setRecherche] = useState("");

    const types = useMemo(() => {
        const set = new Set();
        (carte?.data ?? []).forEach((p) => {
            if (p?.type) set.add(normalizeTypeLabel(p.type));
        });
        return ["Tous", ...Array.from(set).sort((a, b) => a.localeCompare(b, "fr", {sensitivity: "base"}))];
    }, [carte?.data]);

    const filtres = [
        ["De A à Z", "De Z à A"],
        types,
    ];

    const valeurDefaut = ["De A à Z", "Tous"];
    const [selected, setSelected] = useState(valeurDefaut);

    const [tri, typeFiltre] = selected;

    const dataFiltree = (carte?.data ?? [])
        .filter((c) => {
            const q = recherche.trim().toLowerCase();
            if (!q) return true;
            return (c?.name ?? "").toLowerCase().includes(q);
        })
        .filter((c) => {
            if (typeFiltre === "Tous") return true;
            return normalizeTypeLabel(c?.type) === typeFiltre;
        })
        .sort((a, b) => {
            const A = (a?.name ?? "").toLowerCase();
            const B = (b?.name ?? "").toLowerCase();
            if (tri === "De Z à A") return B.localeCompare(A, "fr", {sensitivity: "base"});
            return A.localeCompare(B, "fr", {sensitivity: "base"});
        });

    const resetFiltres = () => {
        setRecherche("");
        setSelected(valeurDefaut);
    };

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const resetForm = () => {
        setName("");
        setType("");
        setImage(null);
        setImagePreview("");
    };

    const handlePickImage = async () => {
        try {
            if (Platform.OS === "web") {
                const file = await pickImageWeb();
                if (!file) return;

                setImage(file);
                setImagePreview(URL.createObjectURL(file));
                return;
            }

            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Toast.show({
                    type: "error",
                    text1: "Permission requise",
                    text2: "Accès à la galerie refusé",
                });
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            });

            if (result.canceled) return;

            const asset = result.assets?.[0];
            if (!asset?.uri) return;

            setImage({
                uri: asset.uri,
                name: asset.fileName ?? "photo.jpg",
                type: asset.mimeType ?? "image/jpeg",
            });
            setImagePreview(asset.uri);
        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "Impossible de sélectionner l'image",
            });
        }
    };

    const handleAjouter = async () => {
        const nameOk = name.trim().length > 0;
        const typeOk = type.trim().length > 0;
        const imageOk = !!image;

        if (!nameOk || !typeOk || !imageOk) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "Veuillez remplir tous les champs.",
            });
            return;
        }

        try {
            await addPartner(name.trim(), type.trim(), image);

            carte.reloadData("partenaires");

            Toast.show({
                type: "success",
                text1: "Confirmation d'ajout",
                text2: "Le partenaire a été ajouté avec succès!",
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

    const handleDelete = (partenaire) => {
        try {
            deletePartner(partenaire.id).then(() => {
                carte.reloadData("partenaires");

                Toast.show({
                    type: "success",
                    text1: "Confirmation de suppression",
                    text2: `Le partenaire ${partenaire.name} a été supprimé avec succès!`,
                });
            })
        }catch (err) {
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
                    <Text style={[styles.colonneText, {width: "10%"}]}>Photo</Text>
                    <Text style={[styles.colonneText, {width: "15%"}]}>Partenaire</Text>
                    <Text style={[styles.colonneText, {width: "45%"}]}>Type</Text>
                    <Text style={[styles.colonneText, {width: "30%"}]}>Action</Text>
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
                    {dataFiltree.map((c) => {
                        console.log(c)
                        const typeLabel = normalizeTypeLabel(c?.type);

                        return (
                            <View key={c.id} style={styles.row}>
                                <View style={{width: "10%", alignItems: "center"}}>
                                    {!!c?.imageUrl && <Image style={styles.partenairePhoto} source={{uri: c.imageUrl}} />}
                                </View>

                                <Text style={[styles.colonneText, {width: "15%"}]}>{c?.name ?? ""}</Text>
                                <Text style={[styles.colonneText, {width: "50%"}]}>{typeLabel}</Text>

                                <TouchableOpacity style={[styles.bouton, {backgroundColor: "#ef4745"}]} onPress={() => handleDelete(c)}>
                                    <Text style={styles.boutonText}>Supprimer</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}

                    {!carte?.data ? (
                        <Text>Aucun partenaire</Text>
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
                <View style={{flex: 1, alignItems: "flex-start", flexDirection: "row", gap: 25, marginTop: 20}}>
                    <View style={{flex: 1, gap: 20}}>
                        <View style={{flex: 1, alignItems: "center", flexDirection: "row", gap: 10}}>
                            <Text style={{width: "15%"}}>Nom :</Text>
                            <TextInput
                                placeholder="Nom du partenaire"
                                placeholderTextColor="#777"
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={{flex: 1, alignItems: "center", flexDirection: "row", gap: 10}}>
                            <Text style={{width: "15%"}}>Type :</Text>
                            <Picker selectedValue={type} onValueChange={(v) => setType(v)} style={styles.pickerWrapper}>
                                <Picker.Item label="Sélectionner un type" value="" />
                                <Picker.Item label="Sponsor" value="SPONSOR" />
                                <Picker.Item label="Association" value="ASSOCIATION" />
                            </Picker>
                        </View>

                        <View style={{flex: 1, alignItems: "center", flexDirection: "row", gap: 10}}>
                            <Text style={{width: "15%"}}>Image :</Text>

                            <TouchableOpacity style={styles.uploadBtn} onPress={handlePickImage}>
                                <Text style={styles.uploadBtnText}>{image ? "Changer l'image" : "Importer une image"}</Text>
                            </TouchableOpacity>

                            {!!imagePreview && (
                                <Image
                                    source={{uri: imagePreview}}
                                    style={styles.preview}
                                />
                            )}
                        </View>
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
    },
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
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        borderColor: "#bebebe",
        borderBottomWidth: 1,
    },
    bouton: {
        marginHorizontal: 25,
        paddingVertical: 2.5,
        borderRadius: 5,
        width: 100,
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
    input: {
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
    uploadBtn: {
        paddingVertical: 7.5,
        paddingHorizontal: 12.5,
        borderRadius: 7,
        backgroundColor: "#eaeaea",
    },
    uploadBtnText: {
        fontSize: 12,
        fontWeight: "500",
    },
    preview: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginLeft: 10,
    },
});
