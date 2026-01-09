import React, { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { Platform, View, Text, Image, ScrollView, Pressable, Modal } from "react-native";

import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";
import HeaderBoutique from "../../../../components/boutique/headerBoutique/headerBoutique";

import point from "../../../../assets/icones/point.png";
import { usePanier } from "../../../../context/PanierContext";
import styles from "./styles/styles";

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
    return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
    );
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
    const router = useRouter();
    const estMobile = Platform.OS !== "web";

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
            {!estMobile && (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            )}

            <View style={{ flex: 1 }}>
                <Header
                    boutonNotification={true}
                    userDetails={true}
                    userProfil={true}
                />

                {estMobile ? (
                    <View style={styles.headerMobileZone}>

                        <View style={styles.headerBoutiqueWrap}>
                            <HeaderBoutique mode="mobile" />
                        </View>
                    </View>
                ) : (
                    <TabNavbarWeb onglets={onglets} pageBack={"boutique"} />
                )}

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
                                                key={it.idLigneAchat || `${it.id}-${it.dateAchatISO}`}
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
                                    <Text style={styles.modalTitre}>
                                        {achatSelectionne.titreComplet || achatSelectionne.titre}
                                    </Text>
                                    <Text style={styles.modalSousTitre}>{achatSelectionne.titre}</Text>

                                    <View style={styles.blocCode}>
                                        <Text style={styles.codeTexte} selectable={false}>
                                            {String(achatSelectionne.code || "")}
                                        </Text>
                                    </View>

                                    <Pressable>
                                        <Text style={styles.modalAide}>Comment activer ?</Text>
                                    </Pressable>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
