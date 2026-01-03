import {View} from "react-native";
import React, {useEffect} from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";

import {isWeb} from "../../../../utils/platform";

import styles from "./styles/styles";
import {useRouter} from "expo-router";

export default function VotreSerie(){
    const router = useRouter();

    const onglets = [
        {id: "profil",label : "Votre profil", page : "social/votreProfil"},
        {id: "flamme",label : "Votre Série", page : "social/votreSerie"},
    ];
    const [ongletActifId, setOngletActif] = React.useState("flamme");

    useEffect(()=> {
        if(ongletActifId === "profil"){
            router.push("./votreProfil")
        }
    },[ongletActifId])
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
                        <Header onglets={onglets} ongletActifId={ongletActifId} setOngletActif={setOngletActif}/>
                        :
                        <Header titre={"Votre série"} boutonRetour={true}/>
                }
            </View>
        </View>
    );
};
