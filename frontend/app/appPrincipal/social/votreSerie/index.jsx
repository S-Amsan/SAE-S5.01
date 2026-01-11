import {View, Image, Text, TouchableOpacity, Pressable, ImageBackground, FlatList} from "react-native";
import React, {useEffect, useState} from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";

import {isWeb} from "../../../../utils/platform";

import styles from "./styles/styles";
import {useRouter} from "expo-router";

import flamme from "../../../../assets/icones/social/flamme.png"
import flammeIcon from "../../../../assets/icones/flamme.png"
import flammePerdue from "../../../../assets/icones/social/flammePerdue.png"
import flammeFond from "../../../../assets/icones/social/flammeFond.png"
import {NombreFlammesImage} from "../../../../utils/flamme";
import Calendrier from "../_components/Calendrier";
import PopUp from "../../../../components/PopUp";
import {Ionicons} from "@expo/vector-icons";
import {loadUser} from "../../../../services/RegisterStorage";
import {fetchUsers} from "../../../../services/user.api";
import {getFriends} from "../../../../services/friends.api";
import DEFAULT_PICTURE from "../../../../assets/icones/default_picture.jpg";

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

const FlammeContenu = ({restaurerFlammes, setRestaurerFlammes, flammes, flammesPerdueRecuperable, periodeEnCours, derniereAction}) => {
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
                            <NombreFlammesImage n={periodeEnCours ? flammes : 0} versionSombre={flammesPerdueRecuperable || !periodeEnCours}/>
                        </View>
                    </View>
                    {flammesPerdueRecuperable &&
                        <TouchableOpacity style={{alignItems: "center", justifyContent: "center", width : "100%"}} onPress={() => setRestaurerFlammes(true)}>
                            <Text style={styles.flammesPerdueText}>Restaurer vos flammes</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.calendrierContainer}>
                    <Calendrier flammes={flammes} dernierAction={derniereAction} periodeEnCours={periodeEnCours}/>
                </View>
            </View>
        </View>
    )
}

const FlammeAmisContenu = ({user_amis_DATA, user_DATA}) => {
    if (!user_amis_DATA || !user_DATA) return null;

    const trieParFlamesDesc = [...user_amis_DATA].sort((a, b) => {
        const flamesA = a?.stats?.flames ?? 0;
        const flamesB = b?.stats?.flames ?? 0;
        return flamesB - flamesA;
    });

    return (
        <View style={styles.flammeAmisContainer}>
            <View style={styles.classementAmisContainer}>
                <Text  style={styles.classementTitre}>Classement Amis</Text>
                <FlatList
                    data={trieParFlamesDesc}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (<Carte user_DATA={item} userActuel={item?.id === user_DATA?.id}/>)}
                    contentContainerStyle={styles.cartesContainer}
                    style={styles.carteList}
                />
            </View>
        </View>
    )
}

const Carte = ({ user_DATA, userActuel=false}) => {
    if (!user_DATA) return null;

    return (
        <View style={[styles.carteContainer, userActuel && styles.carteUser]}>
            <Image
                source={
                    user_DATA?.photoProfileUrl
                        ? { uri: user_DATA.photoProfileUrl }
                        : DEFAULT_PICTURE
                }
                style={styles.carteImage}
            />
            <Text style={styles.carteNom}>{user_DATA?.name} {userActuel && "(Vous)"}</Text>
            <View style={styles.carteFlamme}>
                <Text style={styles.carteFlammeText}>{user_DATA?.stats?.flames || 0}</Text>
                <Image source={flammeIcon} style={styles.carteFlammeImage}/>
            </View>
        </View>
    )
}
export default function VotreSerie(){
    const router = useRouter();

    const onglets = [
        {id: "profil",label : "Votre profil", page : "social/profil"},
        {id: "flamme",label : "Votre Série", page : "social/votreSerie"},
    ];
    const [ongletActifId, setOngletActif] = useState("flamme");

    useEffect(()=> {
        if(ongletActifId === "profil"){
            router.push("./profil")
        }
    },[ongletActifId])

    const [user_DATA, setUserDATA] = useState(null);
    const [derniereAction, setDerniereAction] = useState(null);
    const [flammes, setFlammes] = useState(null)
    const [user_amis_DATA, setUserAmisData] = React.useState(null);

    React.useEffect(() => {
        loadUser().then(setUserDATA)
        if (isWeb){
            fetchUsers().then(setUserAmisData);
            //getFriends().then((friends) => setUserAmisData(friends));
        }
    }, []);


    React.useEffect(() => {

        setFlammes(user_DATA?.stats?.flames || 0)

        const lastActionDate = user_DATA?.stats?.lastActionDate;
        if (!lastActionDate) return;

        setDerniereAction(new Date(lastActionDate).getTime());

    }, [user_DATA?.stats]);


    const periodeEnCours = (() => {
        if (!derniereAction) return false;

        const JOUR = 24 * 60 * 60 * 1000;


        const diffJours = Math.floor(
            (Date.now() - derniereAction) / JOUR
        );
        if (flammes <= 1 && diffJours <= 1) return true;

        return flammes > 1 && diffJours <= 2;

    })();

    const flammesPerdueRecuperable = (() => { // Les flammes sont récupérable si il n'a rater que 1 jour, donc si la derniere action date d'il y'a - de 3 jours
        if (!derniereAction) return false;
        if (!periodeEnCours) return false;

        const JOUR = 24 * 60 * 60 * 1000;

        const diffJours = Math.floor(
            (Date.now() - derniereAction) / JOUR
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
                                    periodeEnCours={periodeEnCours}
                                    derniereAction={derniereAction}
                                    flammes={flammes}
                                    flammesPerdueRecuperable={flammesPerdueRecuperable}
                                    restaurerFlammes={restaurerFlammes}
                                    setRestaurerFlammes={setRestaurerFlammes}
                                />
                                <FlammeAmisContenu user_amis_DATA={user_amis_DATA} user_DATA={user_DATA}/>
                            </View>
                        :
                        <FlammeContenu
                            periodeEnCours={periodeEnCours}
                            derniereAction={derniereAction}
                            flammes={flammes}
                            flammesPerdueRecuperable={flammesPerdueRecuperable}
                            restaurerFlammes={restaurerFlammes}
                            setRestaurerFlammes={setRestaurerFlammes}
                        />
                    }
                </View>
            </View>
        </View>
    );
};
