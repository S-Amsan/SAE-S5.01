import {Platform, View} from "react-native";
import React from "react";
import style from "./styles/styles";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";

export default function VotreSerie(){
    const onglets = [
        {id: "profil",label : "Votre profil", page : "votreProfil"},
        {id: "flamme",label : "Votre Série", page : "votreSerie"},
    ];

    return(

        <View style={style.container}>
            {
                Platform.OS === 'web' &&
                <View style={{ width: "15%" }}>
                    <Navbar/>
                </View>
            }
            <View style={{ flex: 1}}>
                <Header onglets={onglets} setOnglets={setOnglets} />
            </View>
        </View>
    );
};
