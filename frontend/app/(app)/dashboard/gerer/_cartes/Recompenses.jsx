import React, {useMemo, useState} from "react";
import {Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import Carte from "../../_component/Carte";
import PopUp from "../../../../../components/PopUp";

import point from "../../../../../assets/icones/point.png";
import Toast from "react-native-toast-message";

import {Picker} from "@react-native-picker/picker";
import {publishDonation} from "../../../../../services/admin.api";

const normalizeLabel = (t) => {
    const s = String(t ?? "").trim();
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

const CATEGORIES = ["Tous", "Dons", "Bons de réduction", "Cartes cadeaux"];
const POINT_RANGES = ["Tous", "0–999", "1 000–4 999", "5 000–9 999", "10 000+"];

const getCategorie = (c) => {
    const raw = c?.categorie ?? c?.category ?? "Dons";
    const normalized = normalizeLabel(raw);

    const match = CATEGORIES.find(
        (x) => x !== "Tous" && x.toLowerCase() === normalized.toLowerCase()
    );
    return match ?? "Dons";
};

const getPartenaire = (c) => c?.partner?.name ?? "—";

const inPointRange = (points, rangeLabel) => {
    const p = Number(points ?? 0);

    switch (rangeLabel) {
        case "0–999":
            return p >= 0 && p <= 999;
        case "1 000–4 999":
            return p >= 1000 && p <= 4999;
        case "5 000–9 999":
            return p >= 5000 && p <= 9999;
        case "10 000+":
            return p >= 10000;
        case "Tous":
        default:
            return true;
    }
};

const RecompensePreview = ({recompense}) => {
    if (!recompense) return null;

    const partenaire = getPartenaire(recompense);
    const categorie = getCategorie(recompense);
    const pointsValue = Number(recompense?.points ?? 0);

    const imageBanniere = recompense?.bannerImageUrl || recompense?.banner || "";
    const imageCarte = recompense?.cardImageUrl || recompense?.image || "";

    const titreCourt = recompense?.title ?? partenaire ?? "Récompense";
    const titreComplet =
        recompense?.fullTitle ??
        recompense?.description ??
        recompense?.title ??
        "Récompense";

    const description =
        recompense?.fullDescription ??
        recompense?.descriptionLongue ??
        recompense?.description ??
        "Aucune description disponible.";

    return (
        <View style={styles.ecran}>
            <View style={styles.banniere}>
                <ImageBackground
                    source={{uri: imageBanniere}}
                    style={styles.banniereImage}
                    blurRadius={8}
                >
                    <View style={styles.banniereFiltre} />
                    <View style={styles.carteAuCentre}>
                        <View style={[styles.imageCarteContainer, {boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.25)"}]}>
                            <Image source={{uri: imageCarte}} style={styles.imageCarte} />
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.contenu}>
                <Text style={styles.badgeType}>{categorie}</Text>

                <Text style={styles.titreProduitCourt} numberOfLines={2}>
                    {titreCourt}
                </Text>

                <Text style={styles.titreProduitComplet} numberOfLines={3}>
                    {titreComplet}
                </Text>

                <View style={styles.lignePrix}>
                    <Text style={styles.prixLabel}>Dès</Text>
                    <Text style={styles.prixValeur}>{pointsValue.toLocaleString("fr-FR")}</Text>
                    <Image source={point} style={styles.iconePoints} />
                </View>

                <Text style={styles.label}>Description :</Text>
                <Text style={styles.texteDescription}>{description}</Text>

                <View style={{height: 20}} />
            </View>
        </View>
    );
};

const pickImageWeb = () => {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => resolve(input.files?.[0] ?? null);
        input.click();
    });
};

export default function Recompenses({carte, allData}) {
    const [ajouter, setAjouter] = useState(false);
    const [recherche, setRecherche] = useState("");
    const [recompenseToPreview, setRecompenseToPreview] = useState(null);

    const partenaires = useMemo(() => {
        const list = allData?.partenaires ?? [];
        return Array.isArray(list) ? list : [];
    }, [allData?.partenaires]);

    const filtres = [
        ["De A à Z", "De Z à A"],
        CATEGORIES,
        POINT_RANGES,
    ];

    const valeurDefaut = ["De A à Z", "Tous", "Tous"];
    const [selected, setSelected] = useState(valeurDefaut);
    const select = Array.isArray(selected) ? selected : valeurDefaut;
    const [tri, categorieFiltre, pointFiltre] = select;

    const dataFiltree = useMemo(() => {
        return (carte?.data ?? [])
            .filter((c) => {
                const q = recherche.trim().toLowerCase();
                if (!q) return true;

                const fullTitle = (c?.fullTitle ?? c?.title ?? "").toLowerCase();
                const partenaire = getPartenaire(c).toLowerCase();

                return fullTitle.includes(q) || partenaire.includes(q);
            })
            .filter((c) => {
                if (categorieFiltre === "Tous") return true;
                return getCategorie(c) === categorieFiltre;
            })
            .filter((c) => inPointRange(c?.points, pointFiltre))
            .slice()
            .sort((a, b) => {
                const A = (a?.fullTitle ?? a?.title ?? "").toLowerCase();
                const B = (b?.fullTitle ?? b?.title ?? "").toLowerCase();

                if (tri === "De Z à A") return B.localeCompare(A, "fr", {sensitivity: "base"});
                return A.localeCompare(B, "fr", {sensitivity: "base"});
            });
    }, [carte?.data, recherche, tri, categorieFiltre, pointFiltre]);

    const resetFiltres = () => {
        setRecherche("");
        setSelected(valeurDefaut);
    };

    const [partnerId, setPartnerId] = useState("");
    const [categorie, setCategorie] = useState("DON");
    const [points, setPoints] = useState("");

    const [slug, setSlug] = useState("");
    const [title, setTitle] = useState("");



    const [fullTitle, setFullTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");

    const [image, setImage] = useState(null);
    const [cardImage, setCardImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);

    const [imagePreview, setImagePreview] = useState("");
    const [cardPreview, setCardPreview] = useState("");
    const [bannerPreview, setBannerPreview] = useState("");

    const onChangePoints = (v) => {
        const cleaned = (v ?? "").replace(/[^0-9]/g, "");
        setPoints(cleaned);
    };

    const resetForm = () => {
        setPartnerId("");
        setCategorie("Dons");
        setPoints("");
        setSlug("");
        setTitle("");
        setFullTitle("");
        setDescription("");
        setFullDescription("");
        setImage(null);
        setCardImage(null);
        setBannerImage(null);
        setImagePreview("");
        setCardPreview("");
        setBannerPreview("");
    };

    const handlePick = async (setterFile, setterPreview) => {
        const file = await pickImageWeb();
        if (!file) return;
        setterFile(file);
        setterPreview(URL.createObjectURL(file));
    };

    const buildDraftPreview = () => {
        const partnerObj = partenaires.find((p) => String(p.id) === String(partnerId)) ?? null;

        return {
            category: categorie,
            categorie: categorie,
            points: Number(points || 0),
            partner: partnerObj ? {name: partnerObj.name} : {name: "—"},
            title: title || (partnerObj?.name ?? "Récompense"),
            fullTitle: fullTitle || title || "",
            description: description || "",
            fullDescription: fullDescription || description || "",
            bannerImageUrl: bannerPreview || "",
            cardImageUrl: cardPreview || "",
        };
    };

    const handlePreviewDraft = () => {
        setRecompenseToPreview(buildDraftPreview());
    };

    const handleAjouter = async () => {
        const partnerOk = String(partnerId).trim().length > 0;
        const slugOk = slug.trim().length > 0;
        const titleOk = title.trim().length > 0;
        const descOk = description.trim().length > 0;
        const fullDescOk = fullDescription.trim().length > 0;

        const pointsInt = parseInt(points, 10);
        const pointsOk = Number.isInteger(pointsInt) && pointsInt > 0;

        console.log(categorie)
        const imgOk = !!image && !!cardImage && !!bannerImage;

        if (!partnerOk || !slugOk || !titleOk || !descOk || !fullDescOk || !pointsOk || !imgOk) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "Veuillez remplir tous les champs et importer les 3 images.",
            });
            return;
        }

        try {
            await publishDonation(
                slug.trim(),
                title.trim(),
                (fullTitle || title).trim(),
                description.trim(),
                fullDescription.trim(),
                pointsInt,
                image,
                cardImage,
                bannerImage,
                partnerId
            );

            carte.reloadData("recompenses");

            Toast.show({
                type: "success",
                text1: "Confirmation d'ajout",
                text2: "La récompense a été ajoutée avec succès!",
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
                    <Text style={[styles.colonneText, {width: "38%"}]}>Récompense</Text>
                    <Text style={[styles.colonneText, {width: "17%"}]}>Partenaire</Text>
                    <Text style={[styles.colonneText, {width: "15%"}]}>Catégorie</Text>
                    <Text style={[styles.colonneText, {width: "15%"}]}>Prix</Text>
                    <Text style={[styles.colonneText, {width: "15%"}]}>Action</Text>
                    <View style={[styles.colonneText, {width: "2.5%"}]} />
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
                        style={[styles.boutonApercu]}
                        onPress={handlePreviewDraft}
                    >
                        <Text style={[styles.boutonAnnulerText]}>Voir un aperçu</Text>
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
            <PopUp visible={recompenseToPreview} setVisible={() => setRecompenseToPreview(null)}>
                <RecompensePreview recompense={recompenseToPreview} />
            </PopUp>

            {!ajouter ? (
                <>
                    {dataFiltree.map((c, idx) => {
                        const fullTitleRow = c?.fullTitle ?? c?.title ?? "";
                        const partenaireRow = getPartenaire(c);
                        const categorieRow = getCategorie(c);
                        const pointsRow = Number(c?.points ?? 0);

                        return (
                            <View key={c?.id ?? `${c?.slug ?? "recompense"}-${idx}`} style={styles.row}>
                                <Text style={[styles.cellLeft, {width: "38%"}]} numberOfLines={2}>
                                    {fullTitleRow}
                                </Text>

                                <Text style={[styles.colonneText, {width: "17%"}]} numberOfLines={1}>
                                    {partenaireRow}
                                </Text>

                                <Text style={[styles.colonneText, {width: "15%"}]} numberOfLines={1}>
                                    {categorieRow}
                                </Text>

                                <Text style={[styles.colonneText, {width: "15%"}]} numberOfLines={1}>
                                    {pointsRow.toLocaleString("fr-FR")}
                                </Text>

                                <View style={{width: "15%", alignItems: "center"}}>
                                    <TouchableOpacity
                                        style={[styles.bouton, styles.boutonVoir]}
                                        onPress={() => setRecompenseToPreview(c)}
                                    >
                                        <Text style={[styles.boutonText, {color: "#909090"}]}>Voir</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.bouton, styles.boutonRouge, {marginTop: 6}]}
                                        onPress={() => {null}}
                                    >
                                        <Text style={styles.boutonText}>Supprimer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}

                    {!carte?.data ? (
                        <Text>Aucune récompense</Text>
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
                    <View style={{flex: 1, gap: 16}}>
                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Partenaire :</Text>
                            <Picker selectedValue={partnerId} onValueChange={setPartnerId} style={styles.pickerWrapper}>
                                <Picker.Item label="Sélectionner un partenaire" value="" />
                                {partenaires.map((p) => (
                                    <Picker.Item key={p.id} label={p.name ?? `Partenaire #${p.id}`} value={String(p.id)} />
                                ))}
                            </Picker>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Catégorie :</Text>
                            <Picker selectedValue={categorie} onValueChange={setCategorie} style={styles.pickerWrapper}>
                                <Picker.Item label="Dons" value="DON" />
                                <Picker.Item label="Bons de réduction" value="COUPON" />
                                <Picker.Item label="Cartes cadeaux" value="CARD" />
                            </Picker>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Slug :</Text>
                            <TextInput
                                placeholder="ex: don-croix-rouge"
                                placeholderTextColor="#777"
                                style={styles.input}
                                value={slug}
                                onChangeText={setSlug}
                            />
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Titre :</Text>
                            <TextInput
                                placeholder="Titre"
                                placeholderTextColor="#777"
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Titre long :</Text>
                            <TextInput
                                placeholder="Titre complet"
                                placeholderTextColor="#777"
                                style={styles.input}
                                value={fullTitle}
                                onChangeText={setFullTitle}
                            />
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Desc :</Text>
                            <TextInput
                                placeholder="Description"
                                placeholderTextColor="#777"
                                style={styles.input}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Desc long :</Text>
                            <TextInput
                                placeholder="Description complète"
                                placeholderTextColor="#777"
                                style={styles.input}
                                value={fullDescription}
                                onChangeText={setFullDescription}
                            />
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Points :</Text>
                            <TextInput
                                placeholder="Points (> 0)"
                                placeholderTextColor="#777"
                                style={styles.input}
                                value={points}
                                onChangeText={onChangePoints}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Image :</Text>
                            <TouchableOpacity style={styles.uploadBtn} onPress={() => handlePick(setImage, setImagePreview)}>
                                <Text style={styles.uploadBtnText}>{image ? "Changer" : "Importer"}</Text>
                            </TouchableOpacity>
                            {!!imagePreview && <Image source={{uri: imagePreview}} style={styles.preview} />}
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Card :</Text>
                            <TouchableOpacity style={styles.uploadBtn} onPress={() => handlePick(setCardImage, setCardPreview)}>
                                <Text style={styles.uploadBtnText}>{cardImage ? "Changer" : "Importer"}</Text>
                            </TouchableOpacity>
                            {!!cardPreview && <Image source={{uri: cardPreview}} style={styles.preview} />}
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Text style={{width: "15%"}}>Bannière :</Text>
                            <TouchableOpacity style={styles.uploadBtn} onPress={() => handlePick(setBannerImage, setBannerPreview)}>
                                <Text style={styles.uploadBtnText}>{bannerImage ? "Changer" : "Importer"}</Text>
                            </TouchableOpacity>
                            {!!bannerPreview && <Image source={{uri: bannerPreview}} style={styles.preview} />}
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
        fontWeight: "700",
        fontSize: 12,
    },
    boutonRouge: {
        backgroundColor: "#ef4745",
    },
    boutonVoir: {
        borderWidth : 1,
        borderColor : "#F2F2F2",
        backgroundColor : "#f8f8f8",
    },

    /* Preview popup */

    ecran: {
        width: 440,
        height: 500,
        maxWidth: "92%",
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        overflow: "hidden",
        zIndex : 200,
    },

    defilement: {
        flex: 1,
    },

    banniere: {
        height: 150,
        backgroundColor: "#F2F2F2",
    },

    banniereImage: {
        flex: 1,
        justifyContent: "flex-end",
    },

    banniereFiltre: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    actionsHaut: {
        position: "absolute",
        top: 14,
        left: 14,
        right: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 50,
    },

    actionsDroite: {
        flexDirection: "row",
        gap: 10,
    },

    boutonRetour: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.95)",
        alignItems: "center",
        justifyContent: "center",
    },

    iconeRetour: {
        fontSize: 26,
        lineHeight: 26,
        marginTop: -2,
    },

    boutonIcone: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.85)",
        alignItems: "center",
        justifyContent: "center",
    },

    carteAuCentre: {
        position: "absolute",
        bottom: -75,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 30,
        resizeMode: "stretch",
    },
    imageCarteContainer : {
        width: "70%",
        height: 185,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    imageCarte: {
        flex : 1,
        resizeMode: "cover",
    },

    imageCartePlaceholder: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#DDD",
    },

    contenu: {
        paddingTop: 85,
        paddingHorizontal: 22,
        paddingBottom: 16,
    },

    badgeType: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 2,
        backgroundColor: "#F0F0F0",
        color: "#000000",
        fontSize: 13,
        fontWeight: "500",
        marginBottom: 2,
        marginTop: 8,
    },

    titreProduitCourt: {
        fontSize: 26,
        fontWeight: "700",
        color: "#000000",
    },

    titreProduitComplet: {
        fontSize: 16,
        color: "#000000",
        marginBottom: 14,
    },

    lignePrix: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 15,
    },

    prixLabel: {
        fontSize: 20,
        color: "#111",
    },

    prixValeur: {
        fontSize: 20,
        fontWeight: "600",
        color: "#97D7B8",
    },

    pointsTexte: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111",
        marginTop: 2,
    },

    infosCourtes: {
        marginTop: 6,
        marginBottom: 14,
        marginLeft: 31,
    },

    infosCourtesLigne: {
        fontSize: 14,
        color: "#000000",
        marginBottom: 2,
    },

    infosCourtesSousTexte: {
        fontSize: 12,
        color: "#151515",
    },

    separateur: {
        height: 0.8,
        backgroundColor: "#C8C7C7",
        marginVertical: 14,
        width: "100%",
    },

    titreSection: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },

    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 6,
    },

    texteDescription: {
        fontSize: 13,
        lineHeight: 20,
        color: "#333",
    },
    iconePoints : {
        height : 21,
        width : 21,
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
    boutonApercu: {
        paddingVertical: 7.5,
        paddingHorizontal: 12.5,
        borderRadius: 5,
        backgroundColor: "#F4F3F6",
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
