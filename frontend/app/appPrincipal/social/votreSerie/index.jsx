import {View, Image, Text, TouchableOpacity, Pressable, ImageBackground} from "react-native";
import React, {useEffect, useState} from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";

import {isWeb} from "../../../../utils/platform";

import styles from "./styles/styles";
import {useRouter} from "expo-router";

import flamme from "../../../../assets/icones/social/flamme.png"
import flammePerdue from "../../../../assets/icones/social/flammePerdue.png"
import flammeFond from "../../../../assets/icones/social/flammeFond.png"
import {NombreFlammesImage} from "../../../../utils/flamme";
import Calendrier from "../_components/Calendrier";
import PopUp from "../../../../components/PopUp";
import {Ionicons} from "@expo/vector-icons";
import {loadUser} from "../../../../services/RegisterStorage";

const RestaurerPopUp = ({setVisible, flammes = 0}) => {
    const [confirmation, setConfirmation] = useState(false);

    return (
        <View style={styles.popupWrapper}>
            <ImageBackground
                style={styles.popupContainer}
                source={flammeFond}
                resizeMode="stretch"
            >
                <Pressable style={styles.closeBouton} onPress={() => {setVisible(false)}}>
                    <Ionicons name={"close"} size={30}  />
                </Pressable>

                <Text style={styles.titre}>Restaurer votre série{"\n"}de {flammes} flammes</Text>
                <Text style={styles.sousTitre}>Vous pouvez restaurer dans les 24 heures après avoir perdu votre série</Text>

                <View style={styles.boutonsContainer}>
                    {
                        !confirmation ?
                            <TouchableOpacity onPress={() => setConfirmation(true)}>
                                <Text style={styles.restaurerBouton}>Restaurer avec 5 000 points</Text>
                            </TouchableOpacity>
                            :
                            <>
                                <TouchableOpacity>
                                    <Text style={styles.restaurerBouton}>Payer 5 000 points</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setConfirmation(false)}>
                                    <Text style={styles.annulerBouton}>Annuler</Text>
                                </TouchableOpacity>
                            </>
                    }
                </View>

            </ImageBackground>
        </View>
    );
}

const FlammeContenu = ({restaurerFlammes, setRestaurerFlammes, flammes, flammesPerdueRecuperable, periodeEnCours, user_DATA}) => {
    return (
        <View style={styles.flammeContainer}>
            <PopUp visible={restaurerFlammes} setVisible={setRestaurerFlammes}>
                <RestaurerPopUp setVisible={setRestaurerFlammes} flammes={flammes}/>
            </PopUp>
            <View>
                <View style={styles.flammesCompteurContainer}>
                    <View style={{alignItems: "center"}}>
                        <Image source={(flammesPerdueRecuperable || !periodeEnCours) ? flammePerdue : flamme} style={styles.flammeImage}/>
                        <View style={{position: "absolute", bottom : 15 , alignItems: "center", justifyContent: "center"}}>
                            <NombreFlammesImage n={periodeEnCours ? user_DATA.flammes : 0} versionSombre={flammesPerdueRecuperable || !periodeEnCours}/>
                        </View>
                    </View>
                    {flammesPerdueRecuperable &&
                        <TouchableOpacity style={{alignItems: "center", justifyContent: "center", width : "100%"}} onPress={() => setRestaurerFlammes(true)}>
                            <Text style={styles.flammesPerdueText}>Restaurer vos flammes</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.calendrierContainer}>
                    <Calendrier flammes={flammes} dernierAction={user_DATA.date_derniere_action} periodeEnCours={periodeEnCours}/>
                </View>
            </View>
        </View>
    )
}

const FlammeAmisContenu = () => {
    return (
        <View style={styles.flammeAmisContainer}>

        </View>
    )
}
export default function VotreSerie(){
    const router = useRouter();

    const onglets = [
        {id: "profil",label : "Votre profil", page : "social/votreProfil"},
        {id: "flamme",label : "Votre Série", page : "social/votreSerie"},
    ];
    const [ongletActifId, setOngletActif] = useState("flamme");

    useEffect(()=> {
        if(ongletActifId === "profil"){
            router.push("./votreProfil")
        }
    },[ongletActifId])

    const [user_DATA, setUserDATA] = useState(null);

    React.useEffect(() => {
        loadUser().then(setUserDATA)
    }, []);


    const user_Stats = user_DATA?.stats || {}

    const dernierAction = user_Stats?.date_derniere_action || null
    const flammes = user_Stats?.flames || 0

    const periodeEnCours = (() => {
        if (!dernierAction) return false;

        const JOUR = 24 * 60 * 60 * 1000;

        const diffJours = Math.floor(
            (Date.now() - dernierAction) / JOUR
        );
        if (flammes <= 1 && diffJours <= 1) return true;

        return flammes > 1 && diffJours <= 2;

    })();

    const flammesPerdueRecuperable = (() => { // Les flammes sont récupérable si il n'a rater que 1 jour, donc si la derniere action date d'il y'a - de 3 jours
        if (!user_Stats.date_derniere_action) return false;
        if (!periodeEnCours) return false;

        const JOUR = 24 * 60 * 60 * 1000;

        const diffJours = Math.floor(
            (Date.now() - user_Stats.date_derniere_action) / JOUR
        );

        // TRUE uniquement si dernière action = avant-hier
        return diffJours === 2;

    })();

    const [restaurerFlammes, setRestaurerFlammes] = useState(flammesPerdueRecuperable); // PopUp


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
                <View style={{flex : 1}}>
                    {
                        isWeb ?
                            <View style={{flexDirection: "row", flex: 1}}>
                                <FlammeContenu
                                    restaurerFlammes={restaurerFlammes}
                                    setRestaurerFlammes={setRestaurerFlammes}
                                    flammes={flammes}
                                    flammesPerdueRecuperable={flammesPerdueRecuperable}
                                    periodeEnCours={periodeEnCours}
                                    user_DATA={user_Stats}
                                />
                                <FlammeAmisContenu/>
                            </View>
                        :
                        <FlammeContenu
                            restaurerFlammes={restaurerFlammes}
                            setRestaurerFlammes={setRestaurerFlammes}
                            flammes={flammes}
                            flammesPerdueRecuperable={flammesPerdueRecuperable}
                            periodeEnCours={periodeEnCours}
                            user_DATA={user_Stats}
                        />
                    }
                </View>
            </View>
        </View>
    );
};
