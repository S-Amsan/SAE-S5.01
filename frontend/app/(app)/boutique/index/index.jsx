import React, { useEffect, useState } from "react";
import {Platform, Pressable, ScrollView, Text, View} from "react-native";

import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import BlocInfos from "../../../../components/boutique/blocInfos/blocInfos";
import SectionProduits from "../../../../components/boutique/sectionProduits/sectionProduits";
import HeaderBoutique from "../../../../components/boutique/headerBoutique/headerBoutique";

import styles from "./styles/styles";

import {loadUser} from "../../../../services/RegisterStorage";
import {usePanier} from "../../../../context/PanierContext";

export default function Boutique() {
    const [recherche, setRecherche] = useState("");
    const [filtres, setFiltres] = useState([
        { id: "tri", options: ["Récent", "Ancien"], select: "Récent" },
        { id: "lieu", options: ["France", "Autre"], select: "France" },
    ]);

    const [filtreActif, setFiltreActif] = useState(null);
    const { ajouterPointsDebug } = usePanier();

    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("Recherche :", recherche);
        console.log("Filtres :", filtres);
    }, [recherche, filtres]);

    useEffect(() => {
        setRecherche("");
    }, [filtreActif]);

    useEffect(() => {
        loadUser().then(setUser)
    }, []);

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
                    user={user}
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
                        <SectionProduits
                            key={filtreActif ?? "all"}
                            selected={filtreActif}
                            filtreActif={filtreActif}
                            setFiltreActif={setFiltreActif}
                            recherche={recherche}
                            setRecherche={setRecherche}
                        />

                        {/*<Pressable onPress={() => ajouterPointsDebug(50000)} style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8, alignSelf: "flex-start", marginBottom: 12 }}>
                            <Text selectable={false}>+50 000 points (DEV)</Text>
                        </Pressable>*/}

                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
