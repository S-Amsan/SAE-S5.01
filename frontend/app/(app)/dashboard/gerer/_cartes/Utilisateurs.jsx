import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import Carte from "../../_component/Carte";
import {banUser, unbanUser} from "../../../../../services/admin.api";
import Toast from "react-native-toast-message";


export default function Utilisateurs ({carte}) {
    const [recherche, setRecherche] = useState("");

    const filtres = [
        ["de A à Z", "de Z à A"],
        ["tous", "bannis", "non bannis"],
    ]

    const valeurDefaut = ["de A à Z","tous"]
    const [selected, setSelected] = useState(valeurDefaut);



    const [tri, banFilter] = selected;

    const dataFiltree = (carte?.data ?? [])

        // 1) Recherche par name OU pseudo
        .filter((u) => {
            const q = recherche.trim().toLowerCase();
            if (!q) return true;

            const name = (u.name ?? "").toLowerCase();
            const pseudo = (u.pseudo ?? "").toLowerCase();
            return name.includes(q) || pseudo.includes(q);
        })

        // 2) Filtre bannis
        .filter((u) => {
            if (banFilter === "bannis") return u.banned === true;
            if (banFilter === "non bannis") return u.banned !== true;
            return true; // "tous"
        })

        // 3) Tri
        .sort((a, b) => {
            const A = (a.pseudo ?? "").toLowerCase();
            const B = (b.pseudo ?? "").toLowerCase();

            if (tri === "de Z à A") return B.localeCompare(A);
            return A.localeCompare(B);
        });


    const resetFiltres = () => {
        setRecherche("")
        setSelected(valeurDefaut)
    }

    const handleBannir = (user) => {
        banUser(user.id).then(() => {
                carte.reloadData("utilisateurs")
                Toast.show({
                    type: "success",
                    text1: "Confirmation de ban",
                    text2: `@${user.name} a été ban avec succès!`
                })
            }
        )
    }

    const handleDebannir = (user) => {
        unbanUser(user.id).then(() => {
                carte.reloadData("utilisateurs")
                Toast.show({
                    type: "success",
                    text1: "Confirmation de déban",
                    text2: `@${user.name} a été déban avec succès!`
                })
            }
        )
    }

    return (
        <Carte carte={carte} recherche={recherche} setRecherche={setRecherche} filtres={filtres} selected={selected} setSelected={setSelected}
               styleScrollView={{paddingTop: 0}}
               header={
                   <View style={{flexDirection : "row", marginVertical : 5, paddingHorizontal : 7.5, paddingVertical : 4, backgroundColor: "#F7F7F7"}}>
                       <Text style={[styles.colonneText, {width : "10%"}]}>Photo</Text>
                       <Text style={[styles.colonneText, {width : "20%"}]}>Nom</Text>
                       <Text style={[styles.colonneText, {width : "35%"}]}>Pseudo</Text>
                       <Text style={[styles.colonneText, {width : "10%"}]}>Sanction</Text>
                       <Text style={[styles.colonneText, { width: "25%" }]}>Action</Text>
                       <View style={{width : "2%"}}></View>
                   </View>
               }
        >
            {dataFiltree.map(c => {
                const ban = c?.banned
                const sanction = ban ? "Banni(e)" : "Aucune"

                return (
                    <View key={c.id} style={{flexDirection : "row", alignItems : "center", paddingVertical : 5, borderColor: "#bebebe", borderBottomWidth : 1}}>
                        <View style={{width : "10%", alignItems : "center"}}>
                            <Image
                                style={[styles.userPhoto]}
                                source={{uri: c.photoProfileUrl}}
                            />
                        </View>
                        <Text style={[styles.colonneText, {width : "20%"}]}>@{c.name}</Text>
                        <Text style={[styles.colonneText, {width : "35%"}]}>{c.pseudo}</Text>
                        <Text style={[styles.colonneText, {width : "10%"}, ban && {color : "#ef4745"}]}>{sanction}</Text>

                        {
                            ban ?
                                <TouchableOpacity style={[styles.bouton,{backgroundColor : "#05DA91"}]} onPress={() => handleDebannir(c)}>
                                    <Text style={styles.boutonText}>Débannir</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={[styles.bouton,{backgroundColor : "#ef4745"}]} onPress={() => handleBannir(c)}>
                                    <Text style={styles.boutonText}>Bannir</Text>
                                </TouchableOpacity>
                        }
                    </View>
                )
            })}
            {
                !carte?.data ?
                    <Text>Aucun utilisateur</Text>
                    :
                    dataFiltree.length === 0 &&
                    <Text>Aucun résultat, <Text style={styles.resetText} onPress={() => resetFiltres()}>Réinitialiser les filtres.</Text></Text>
            }
        </Carte>
    )
}


const styles = StyleSheet.create({
    resetText : {
        color : "#4192e3",
        textDecorationLine : "underline",
    },
    colonneText : {
        fontSize : 14,
        fontWeight : "600",
        textAlign: "center",
    },
    userPhoto : {
        height : 35,
        width : 35,
        borderRadius : 35,
    },
    bouton : {
        flex : 1,
        marginHorizontal : 35,
        paddingVertical : 2.5,
        borderRadius : 5,
    },
    boutonText : {
        color : "#ffffff",
        textAlign: "center",
        fontWeight : "400",
    }
})
