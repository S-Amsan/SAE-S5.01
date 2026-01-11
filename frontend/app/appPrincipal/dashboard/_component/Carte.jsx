import React from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import {Ionicons} from "@expo/vector-icons";
import Filtres from "./Filtres";
import Br from "./Br";

export default function Carte ({carte,recherche, setRecherche,filtres, selected, setSelected, children}) {
    const infoSupplementaire_DATA = carte.infoSupplementaire && carte?.data?.filter(c => !c.checked)?.length || 0;

    return (
        <View style={styles.carte}>
            <View style={styles.cartePartieHaute}>
                <Text style={styles.carteTitre}>{carte.titre}</Text>
                {
                    carte.infoSupplementaire &&
                    <View style={styles.infoSupplementaire}>
                        <View style={[styles.pastille, {backgroundColor : carte.couleur}]}>
                            <Text style={styles.infoSupplementaireDataText}>{infoSupplementaire_DATA}</Text>
                        </View>
                        <Text style={styles.infoSupplementaireText}>{carte.infoSupplementaire.text}</Text>
                    </View>
                }
                {
                    carte.boutonAjouter &&
                    <TouchableOpacity>
                        <View style={[styles.boutonAjouter,{backgroundColor : carte.couleur}]}>
                            <Text style={styles.boutonAjouterText}>Ajouter</Text>
                        </View>
                    </TouchableOpacity>
                }
                <View style={styles.barreDeRecherche}>
                    <Ionicons name="search" size={18} color="#777" />
                    <TextInput
                        placeholder="Rechercher"
                        placeholderTextColor="#777"
                        style={styles.rechercheInput}
                        value={recherche}
                        onChangeText={setRecherche}
                    />
                </View>
            </View>
            <Br/>
            <View style={styles.carteFiltreSection}>
                <Text> Filtre(s) :</Text>

                <Filtres
                    filtres={filtres}
                    values={selected}
                    onChange={setSelected}
                />
            </View>
            <Br/>
            <View style={styles.carteContenu}>
                <ScrollView
                    showsVerticalScrollIndicator
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 15, paddingHorizontal : 5, gap : 10}}
                >
                    {children}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    carte : {
        width : "45%",
        height: 350,
        boxShadow : "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius : 15,
    },
    cartePartieHaute : {
        flexDirection : "row",
        padding : 15,
        alignItems : "center",
        gap : 10,
    },
    carteFiltreSection : {
        padding : 15,
        flexDirection : "row",
        gap : 10,
        alignItems : "center",
    },
    carteContenu : {
        paddingHorizontal : 15,
        flex : 1,
    },
    carteTitre : {
        fontSize : 20,
        fonWeight : "900",
    },
    pastille : {
        width : 20,
        height : 20,
        borderRadius : 20,
        alignItems: "center",
        justifyContent : "center",
    },
    infoSupplementaire : {
        flexDirection : "row",
        alignItems : "center",
        gap : 3,
    },
    infoSupplementaireText : {
        fontSize : 10,
    },
    infoSupplementaireDataText : {
        color : "#FFFFFF",
        fontSize : 9,
        fontWeight : "400",
        textAlign: "center",
    },
    boutonAjouter : {
        paddingVertical : 7.5,
        paddingHorizontal : 12.5,
        borderRadius : 5,
    },
    boutonAjouterText : {
        color : "#FFFFFF",
        fontSize : 12,
        fontWeight : "500",
        textAlign: "center",
    },
    barreDeRecherche : {
        position : "absolute",
        right : 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 7,
        paddingHorizontal: 10,
        height: 30,
        width: "30%",
        marginRight: 10,
        borderWidth : 1,
        borderColor : "#bebebe"
    },
    rechercheInput : {
        marginLeft: 6,
        flex: 1,
        outlineStyle: "none",
    },
})
