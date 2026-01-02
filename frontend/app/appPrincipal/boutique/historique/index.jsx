import React, { useMemo, useState } from "react";
import { Platform, View, Text, Image, StyleSheet, ScrollView, Pressable, Modal } from "react-native";

import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";

import point from "../../../../assets/icones/point.png";
import { usePanier } from "../../../../context/PanierContext";

const estUnDon = (item) => {
    const t = String(item?.type ?? "").toLowerCase();
    return t === "dons" || t === "don" || t === "donation" || t === "association";
};

const labelMois = (dateISO) => {
    const d = new Date(dateISO);
    const mois = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ];
    return `${mois[d.getMonth()]} ${d.getFullYear()}`;
};

const estAujourdHui = (dateISO) => {
    const d = new Date(dateISO);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
};

function CarteAchat({ item, onVoirCode }) {
    return (
        <View style={styles.carteAchat}>
            <Image source={{ uri: item.imageCarte }} style={styles.imageAchat} />

            <View style={styles.contenuAchat}>
                <Text style={styles.titreAchat} numberOfLines={1}>
                    {item.titreComplet || item.titre}
                </Text>
                <Text style={styles.sousTitreAchat} numberOfLines={1}>
                    {item.titre}
                </Text>

                <View style={styles.ligneInfosAchat}>
                    <View style={styles.pointsWrapper}>
                        <Text style={styles.points}>{item.points}</Text>
                        <Image source={point} style={styles.pointIcon} />
                    </View>

                    {!estUnDon(item) && (
                        <Pressable style={styles.boutonVoirCode} onPress={() => onVoirCode(item)}>
                            <Text style={styles.texteVoirCode}>Voir le code</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    );
}

export default function Index() {
    const onglets = [
        { id: "panier", label: "Mon panier", page: "boutique/panier" },
        { id: "historique", label: "Mes achats", page: "boutique/historique" },
    ];

    const { achats } = usePanier();
    const [modalVisible, setModalVisible] = useState(false);
    const [achatSelectionne, setAchatSelectionne] = useState(null);

    const groupes = useMemo(() => {
        const map = new Map();

        achats.forEach((a) => {
            const groupe = estAujourdHui(a.dateAchatISO) ? "Aujourd'hui" : labelMois(a.dateAchatISO);
            if (!map.has(groupe)) map.set(groupe, []);
            map.get(groupe).push(a);
        });

        return Array.from(map.entries());
    }, [achats]);

    const ouvrirModal = (item) => {
        setAchatSelectionne(item);
        setModalVisible(true);
    };

    const fermerModal = () => {
        setModalVisible(false);
        setAchatSelectionne(null);
    };

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FFFFFF" }}>
            {Platform.OS === "web" && (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            )}

            <View style={{ flex: 1 }}>
                <Header />
                {Platform.OS === "web" && <TabNavbarWeb onglets={onglets} pageBack={"boutique"} />}

                <ScrollView contentContainerStyle={styles.page}>
                    {achats.length === 0 ? (
                        <Text style={styles.vide}>Aucun achat pour l’instant.</Text>
                    ) : (
                        <View style={styles.zoneGroupes}>
                            {groupes.map(([titreGroupe, items]) => (
                                <View key={titreGroupe} style={styles.groupe}>
                                    <Text style={styles.titreGroupe}>{titreGroupe}</Text>

                                    <View style={styles.grille}>
                                        {items.map((it) => (
                                            <CarteAchat
                                                key={it.idLigneAchat || `${it.id}-${it.dateAchatISO}-${Math.random()}`}
                                                item={it}
                                                onVoirCode={ouvrirModal}
                                            />
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>

                <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={fermerModal}>
                    <View style={styles.modalFond}>
                        <View style={styles.modalCarte}>
                            <Pressable style={styles.modalFermer} onPress={fermerModal}>
                                <Text style={styles.modalFermerTexte}>✕</Text>
                            </Pressable>

                            {achatSelectionne && (
                                <>
                                    <Image source={{ uri: achatSelectionne.imageCarte }} style={styles.modalImage} />
                                    <Text style={styles.modalTitre}>{achatSelectionne.titreComplet || achatSelectionne.titre}</Text>
                                    <Text style={styles.modalSousTitre}>{achatSelectionne.titre}</Text>

                                    <View style={styles.blocCode}>
                                        <Text style={styles.codeTexte} selectable={false}>
                                            {String(achatSelectionne.code || "")}
                                        </Text>
                                    </View>

                                    <Text style={styles.modalAide}>Comment activer ?</Text>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 40,
        paddingVertical: 24,
    },

    vide: {
        fontSize: 16,
        color: "#666",
        marginTop: 12,
    },

    zoneGroupes: {
        gap: 26,
    },

    groupe: {
        gap: 14,
    },

    titreGroupe: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    grille: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 22,
    },

    carteAchat: {
        width: 520,
        height: 130,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#EDEDED",
        overflow: "hidden",
    },

    imageAchat: {
        width: 180,
        height: "100%",
        resizeMode: "cover",
    },

    contenuAchat: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },

    titreAchat: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
    },

    sousTitreAchat: {
        fontSize: 13,
        color: "#666",
        fontWeight: "600",
    },

    ligneInfosAchat: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginTop: 6,
    },

    pointsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    points: {
        fontSize: 16,
        fontWeight: "700",
        color: "#97D7B8",
    },

    pointIcon: {
        width: 18,
        height: 18,
        resizeMode: "contain",
    },

    boutonVoirCode: {
        marginLeft: "auto",
        height: 34,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: "#07D999",
        alignItems: "center",
        justifyContent: "center",
    },

    texteVoirCode: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 14,
    },

    modalFond: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
    },

    modalCarte: {
        width: 380,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        alignItems: "center",
        position: "relative",
    },

    modalFermer: {
        position: "absolute",
        top: 10,
        right: 12,
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },

    modalFermerTexte: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111",
    },

    modalImage: {
        width: 280,
        height: 140,
        borderRadius: 12,
        resizeMode: "cover",
        marginBottom: 14,
    },

    modalTitre: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111",
        textAlign: "center",
    },

    modalSousTitre: {
        fontSize: 14,
        fontWeight: "600",
        color: "#666",
        marginTop: 6,
        marginBottom: 14,
    },

    blocCode: {
        width: "100%",
        height: 44,
        borderRadius: 10,
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },

    codeTexte: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 16,
        letterSpacing: 0.5,
    },

    modalAide: {
        color: "#2B6CFF",
        textDecorationLine: "underline",
        fontSize: 14,
        fontWeight: "700",
    },
});
