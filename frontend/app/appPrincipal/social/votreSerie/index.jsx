import {View} from "react-native";
import React from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";

import {isWeb} from "../../../../utils/platform";

import styles from "./styles/styles";

export default function VotreSerie(){
    const onglets = [
        {id: "profil",label : "Votre profil", page : "social/votreProfil"},
        {id: "flamme",label : "Votre Série", page : "social/votreSerie"},
    ];

    return(

        <View style={styles.container}>
            {
                isWeb &&
                <View style={{ width: "15%" }}>
                    <Navbar/>
                </View>
            }
            <View style={{ flex: 1}}>
                {
                    isWeb ?
                        <Header onglets={onglets} />
                        :
                        <Header titre={"Votre série"} boutonRetour={true}/>
                }
            </View>
        </View>
    );
};
