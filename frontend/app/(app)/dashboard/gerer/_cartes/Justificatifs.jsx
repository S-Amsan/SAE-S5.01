import React, { useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Carte from "../../_component/Carte";
import Br from "../../_component/Br";
import PopUp from "../../../../../components/PopUp";
import Toast from "react-native-toast-message";
import { tempsEcoule } from "../../../../../utils/temps";
import {invalidateDocument, validateDocument} from "../../../../../services/admin.api";

const STATE_LABELS = {
    WAITING: "En attente",
    VALIDATED: "Accepté",
    REJECTED: "Refusé",
};

const getStateLabel = (state) => STATE_LABELS[state] ?? state ?? "Inconnu";

const safeLower = (v) => (v ?? "").toString().toLowerCase();

const JustificatifPreview = ({ justificatif }) => {
    if (!justificatif) return null;

    const { user, card, fileUrl, state, date } = justificatif;

    const openFile = () => {
        if (!fileUrl) return;
        window.open(fileUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <View style={styles.previewCard}>
            {(user?.photoProfileUrl || user?.pseudo || user?.name || date) && (
                <View style={styles.previewHeader}>
                    {!!user?.photoProfileUrl && (
                        <Image source={{ uri: user.photoProfileUrl }} style={styles.previewAvatar} />
                    )}

                    <View style={{ flex: 1 }}>
                        <View style={styles.previewNameRow}>
                            {!!(user?.pseudo || user?.name) && (
                                <Text style={styles.previewName}>@{user?.pseudo ?? user?.name}</Text>
                            )}

                            {!!date && (
                                <Text style={styles.previewTime}>
                                    {" · il y a "}{tempsEcoule(date)}
                                </Text>
                            )}
                        </View>

                        {!!user?.name && user?.pseudo && (
                            <Text style={styles.previewSubName}>{user.name}</Text>
                        )}
                    </View>

                    <View style={[styles.statePill, styles[`pill_${state}`]]}>
                        <Text style={styles.statePillText}>{getStateLabel(state)}</Text>
                    </View>
                </View>
            )}

            <Br />

            <View style={{flexDirection: "row", gap : 10, alignItems: "center"}}>
                {!!card?.photoUrl && (
                    <Image source={{ uri: card.photoUrl }} style={styles.previewCardImage} />
                )}
                <View>
                    {!!card?.title && <Text style={styles.previewTitle}>{card.title}</Text>}
                    {!!card?.description && <Text style={styles.previewText}>{card.description}</Text>}
                </View>
            </View>

            <TouchableOpacity
                style={[styles.previewBtn, !fileUrl && { opacity: 0.5 }]}
                onPress={openFile}
                disabled={!fileUrl}
            >
                <Text style={styles.previewBtnText}>Ouvrir le justificatif (Redirection)</Text>
            </TouchableOpacity>
        </View>
    );
};


export default function Justificatifs({ carte }) {
    const [recherche, setRecherche] = useState("");
    const [justifToPreview, setJustifToPreview] = useState(null);

    const filtres = [
        ["récent", "ancien"],
        ["tous", "en attente", "accepté", "refusé"],
    ];

    const valeurDefaut = ["récent", "en attente"];
    const [selected, setSelected] = useState(valeurDefaut);

    const [triDate, etat] = selected;

    const dataFiltree = useMemo(() => {
        const base = carte?.data ?? [];
        const q = recherche.trim().toLowerCase();

        return base
            // Recherche: user + card
            .filter((c) => {
                if (!q) return true;

                const userPseudo = safeLower(c?.user?.pseudo);
                const userName = safeLower(c?.user?.name);
                const cardTitle = safeLower(c?.card?.title);
                const cardDesc = safeLower(c?.card?.description);

                return (
                    userPseudo.includes(q) ||
                    userName.includes(q) ||
                    cardTitle.includes(q) ||
                    cardDesc.includes(q)
                );
            })
            // Filtre état
            .filter((c) => {
                if (etat === "tous") return true;
                return (STATE_LABELS[c?.state ?? ""]?.toLowerCase()) === etat;
            })
            // Tri date
            .sort((a, b) => {
                const da = new Date(a?.date ?? 0).getTime();
                const db = new Date(b?.date ?? 0).getTime();

                if (triDate === "ancien") return da - db;
                return db - da; // récent
            });
    }, [carte?.data, recherche, triDate, etat]);

    const resetFiltres = () => {
        setRecherche("");
        setSelected(valeurDefaut);
    };

    const handleAccepter = async (justif) => {
        if (!justif?.id) return;

        if (justif.state === "VALIDATED") {
            Toast.show({
                type: "info",
                text1: "Déjà accepté",
                text2: "Ce justificatif est déjà accepté.",
            });
            return;
        }

        try {
            validateDocument(justif.id).then(()=> {
                carte.reloadData("justificatifs");

                Toast.show({
                    type: "success",
                    text1: "Justificatif accepté",
                    text2: `Le justificatif de ${justif.user.name} a été accepté avec succès!`,
                });
            })

        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "Impossible d’accepter le justificatif.",
            });
        }
    };

    const handleRefuser = async (justif) => {
        if (!justif?.id) return;

        if (justif.state === "REJECTED") {
            Toast.show({
                type: "info",
                text1: "Déjà refusé",
                text2: "Ce justificatif est déjà refusé.",
            });
            return;
        }

        try {
            invalidateDocument(justif.id).then(()=> {
                carte.reloadData("justificatifs");

                Toast.show({
                    type: "success",
                    text1: "Justificatif refusé",
                    text2: `Le justificatif de ${justif.user.name} a été refusé avec succès!`,
                });
            })

        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Erreur",
                text2: "Impossible de refuser le justificatif.",
            });
        }
    };

    const infoSupplementaire_DATA = carte?.data?.filter((c) => {
        return STATE_LABELS[c?.state ?? ""] === STATE_LABELS.WAITING;
    }).length

    return (
        <Carte
            carte={carte}
            infoSupplementaire_DATA = {infoSupplementaire_DATA}
            recherche={recherche}
            setRecherche={setRecherche}
            filtres={filtres}
            selected={selected}
            setSelected={setSelected}
            styleScrollView={{ gap: 10 }}
        >
            <PopUp visible={justifToPreview} setVisible={() => setJustifToPreview(null)}>
                <JustificatifPreview justificatif={justifToPreview} />
            </PopUp>

            {dataFiltree.map((c) => {
                const stateLabel = getStateLabel(c?.state);
                const accepte = stateLabel === STATE_LABELS.VALIDATED;
                const refuse = stateLabel === STATE_LABELS.REJECTED;


                return (
                    <View key={c.id} style={styles.item}>
                        {/* Haut */}
                        <View style={styles.top}>
                            {!!c?.user?.photoProfileUrl && (
                                <Image source={{ uri: c.user.photoProfileUrl }} style={styles.userPhoto} />
                            )}

                            <View style={{ flex: 1, gap: 2 }}>
                                <Text style={styles.userText}>
                                    @{c?.user?.pseudo ?? c?.user?.name ?? "utilisateur"}
                                </Text>

                                {!!c?.card?.title && (
                                    <Text style={styles.cardTitle}>{c.card.title}</Text>
                                )}

                            </View>

                            <View style={[styles.stateBadge, styles[`badge_${c?.state}`]]}>
                                <Text style={styles.stateBadgeText}>{stateLabel}</Text>
                            </View>
                        </View>

                        <Br />

                        {/* Card info */}
                        <View style={styles.body}>
                            {!!c?.card?.photoUrl && (
                                <Image source={{ uri: c.card.photoUrl }} style={styles.cardPhoto} />
                            )}

                            <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                                {!!c?.card?.description && (
                                    <Text style={styles.desc} numberOfLines={3}>
                                        {c.card.description}
                                    </Text>
                                )}
                                {!!c?.date && (
                                    <Text style={styles.meta}>
                                        Déposé : {c.date.slice(0, 10).split("-").join("/")}
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* Boutons */}
                        <View style={styles.btnRow}>
                            <TouchableOpacity
                                style={[styles.btn, styles.btnLight]}
                                onPress={() => setJustifToPreview(c)}
                            >
                                <Text style={[styles.btnText, styles.btnLightText]}>Voir</Text>
                            </TouchableOpacity>

                            {!accepte &&
                                <TouchableOpacity
                                style={[styles.btn, styles.btnAccept]}
                                onPress={() => handleAccepter(c)}
                                >
                                    <Text style={styles.btnText}>Accepter</Text>
                                </TouchableOpacity>
                            }

                            {!refuse &&
                                <TouchableOpacity
                                style={[styles.btn, styles.btnReject]}
                                onPress={() => handleRefuser(c)}
                                >
                                    <Text style={styles.btnText}>Refuser</Text>
                                </TouchableOpacity>
                            }

                        </View>
                    </View>
                );
            })}

            {!carte?.data ? (
                <Text>Aucun justificatif</Text>
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
    resetText: {
        color: "#4192e3",
        textDecorationLine: "underline",
    },

    item: {
        boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    top: {
        padding: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    userPhoto: {
        height: 40,
        width: 40,
        borderRadius: 40,
    },
    userText: {
        fontSize: 15,
        fontWeight: "bold",
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#ffffff",
        backgroundColor : "#05DA91",
        paddingHorizontal: 12,
        paddingVertical : 3,
        borderRadius: 5,
        textAlign: "center",
        alignSelf: "flex-start",
    },
    meta: {
        fontSize: 12,
        color: "#777",
    },

    stateBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    stateBadgeText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#fff",
    },
    badge_WAITING: { backgroundColor: "#777" },
    badge_VALIDATED: { backgroundColor: "#05DA91" },
    badge_REJECTED: { backgroundColor: "#E14F4D" },

    body: {
        padding: 10,
        flexDirection: "row",
        gap: 12,
    },
    cardPhoto: {
        width: 55,
        height: 55,
        borderRadius: 55,
        resizeMode: "cover",
    },
    desc: {
        fontSize: 12,
        fontWeight: "600",
        color: "#222",
    },
    link: {
        fontSize: 11,
        color: "#4192e3",
    },

    btnRow: {
        padding: 10,
        flexDirection: "row",
        gap: 10,
    },
    btn: {
        width: "20%",
        borderRadius: 5,
        paddingVertical: 6,
    },
    btnText: {
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
        color: "#fff",
    },

    btnLight: {
        borderWidth: 1,
        borderColor: "#F2F2F2",
        backgroundColor: "#f8f8f8",
    },
    btnLightText: {
        color: "#909090",
    },
    btnAccept: {
        backgroundColor: "#05DA91",
    },
    btnReject: {
        backgroundColor: "#E14F4D",
    },

    /* Preview popup */
    previewCard: {
        width: 560,
        maxWidth: "92%",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
        zIndex: 200,
    },
    previewHeader: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    previewAvatar: {
        width: 44,
        height: 44,
        borderRadius: 44,
    },
    previewNameRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    previewName: {
        fontWeight: "700",
        fontSize: 14,
    },
    previewSubName: {
        fontSize: 12,
        color: "#666",
        marginTop: 2,
    },
    previewTime: {
        fontSize: 12,
        color: "#777",
    },
    statePill: {
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    statePillText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 12,
    },
    pill_WAITING: { backgroundColor: "#777" },
    pill_VALIDATED: { backgroundColor: "#05DA91" },
    pill_REJECTED: { backgroundColor: "#E14F4D" },

    previewCardImage: {
        marginTop: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: "contain",
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: "800",
        marginTop: 10,
    },
    previewText: {
        marginTop: 6,
        fontSize: 13,
        color: "#222",
    },
    previewBtn: {
        marginTop: 12,
        borderRadius: 10,
        paddingVertical: 10,
        backgroundColor: "#4192e3",
    },
    previewBtnText: {
        color: "#fff",
        fontWeight: "800",
        textAlign: "center",
    },
});
