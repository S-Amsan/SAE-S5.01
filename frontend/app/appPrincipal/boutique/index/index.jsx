import React, { useState, useEffect } from "react";
import { Platform, ScrollView, View } from "react-native";
import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import BlocInfos from "../../../../components/boutique/blocInfos";
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

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#F4F4F4" }}>
            {Platform.OS === "web" && (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            )}

            <View style={{ flex: 1 }}>
                <Header
                    recherche={recherche}
                    setRecherche={setRecherche}
                    filtres={filtres}
                    setFiltres={setFiltres}
                />

                <HeaderBoutique
                    filtreActif={filtreActif}
                    setFiltreActif={setFiltreActif}
                />

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
                    <View style={styles.page}>
                        {filtreActif === null && <BlocInfos />}
                        <SectionProduits key={filtreActif ?? "all"} selected={filtreActif} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
