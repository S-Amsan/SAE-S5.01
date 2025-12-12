import React from "react";
import { Platform, ScrollView, View, StyleSheet } from "react-native";
import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import BlocInfos from "../../../components/boutique/blocInfos";
import SectionProduits from "../../../components/boutique/sectionProduits";

export default function Boutique() {
    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" }}>
            {Platform.OS === "web" && (
                <View style={{ width: "15%" }}>
                    <Navbar />
                </View>
            )}

            <View style={{ flex: 1 }}>
                <Header title={"Boutique"} />

                <ScrollView contentContainerStyle={styles.conteneur}>
                    <BlocInfos />
                    <SectionProduits />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    conteneur: {
        padding: 16,
    },
});
