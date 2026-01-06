import React, { useEffect, useState } from "react";
import { Platform, ScrollView, View } from "react-native";

import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import BlocInfos from "../../../../components/boutique/blocInfos/blocInfos";
import SectionProduits from "../../../../components/boutique/sectionProduits";
import HeaderBoutique from "../../../../components/boutique/headerBoutique";

import styles from "./styles/styles";

export default function Boutique() {
    const [recherche, setRecherche] = useState("");
    const [filtres, setFiltres] = useState([
        { id: "tri", options: ["Récent", "Ancien"], select: "Récent" },
        { id: "lieu", options: ["France", "Autre"], select: "France" },
    ]);

    const [filtreActif, setFiltreActif] = useState(null);

    useEffect(() => {
        console.log("Recherche :", recherche);
        console.log("Filtres :", filtres);
    }, [recherche, filtres]);

    const isWeb = Platform.OS === "web";

    return (
        <View style={styles.container}>
            {isWeb ? (
                <View style={styles.sidebar}>
                    <Navbar />
                </View>
            ) : (
                <Navbar />
            )}

            <View style={styles.content}>
                <Header
                    boutonNotification={true}
                    userDetails={true}
                    userProfil={true}
                />

                <HeaderBoutique
                    filtreActif={filtreActif}
                    setFiltreActif={setFiltreActif}
                />

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator
                >
                    <View style={styles.page}>
                        {filtreActif === null && <BlocInfos />}
                        <SectionProduits key={filtreActif ?? "all"} selected={filtreActif} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}