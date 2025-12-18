import {Text, View, Image, ScrollView, TouchableOpacity} from "react-native";
import React from "react";

import Header from "../../../../components/Header";

import styles from "./styles/styles";
import TabNavbarMobile from "../../../../components/TabNavbarMobile";

import DEFAULT_PICTURE from "../../../../assets/icones/default_picture.jpg";
import tropheeIcon from "../../../../assets/icones/trophee.png";
import {getRankImageUrl} from "../../../../constants/rank";

// ---------------- LEADERBOARD ----------------

const Leaderboard = ({isActive}) => {
    const user_classement = [0,1,2,3,4,5,6,7,8,9,10] // TODO remplacer par des vrai donné
    return (
        <View style={[{display: isActive ? "flex" : "none", flex : 1}]}>
            <View style={styles.podiumContainer}>
                {
                    PODIUM_ORDRE.map((index) => (<Place key={index} id={index} />))
                }
            </View>
            <View style={styles.classementTableauContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    {
                        user_classement.map((index) => (<UserCarte key={index} separateur={index !== user_classement.length - 1}/>))
                    }
                    <Text style={styles.finText}>Seul le Top 100 est affiché</Text>
                </ScrollView>
                <View style={styles.userActuelCarte}>
                    <UserCarte separateur={false}/>
                </View>
            </View>
        </View>
    )
}

const PODIUM_ORDRE = [1, 0, 2];

const PODIUM_CONFIG =
    {
        widths: ["100%", "100%", "100%"],
        heights: ["55%", "40%", "30%"],
    };

const podiumStyle = [0, 1, 2].map((index) => ({
    place: {
        width: PODIUM_CONFIG.widths[index],
        height: PODIUM_CONFIG.heights[index],
    },
}));


const Place = ({user_DATA, id}) => {
    //if (!user_DATA) return null;

    const num = id+1;//user_DATA.Classement || 0;
    const style = podiumStyle[num-1];

    return (
        <View style={styles.placeContainer}>
            <Image
                source={user_DATA?.Photo_url || DEFAULT_PICTURE}
                style={styles.placePicture}
            />
            <Text style={styles.placeNomText}>{user_DATA?.Nom || "USER_NOM"}</Text>
            <View style={styles.placeTropheesContainer}>
                <Text style={styles.placeTropheesText}>{user_DATA?.Trophees || -1}</Text>
                <Image source={tropheeIcon} style={styles.podiumTropheeIcon}/>
            </View>
            <View style={[styles.place, style.place]}>
                <Text style={styles.placeNumero}>{num}</Text>
            </View>
        </View>
    )
}

const UserCarte = ({user_DATA, separateur = true}) => {
    return (
        <View style={styles.userTopContainer}>
            <Text style={styles.userTopText}>{user_DATA?.Top || -1}</Text>
            <View style={styles.userInfoContainer}>
                <Image source={user_DATA?.Photo_url || DEFAULT_PICTURE} style={styles.userTopPicture}/>
                <Text style={styles.userTopName}>{user_DATA?.Nom || "USER_NOM"}</Text>{/* TODO Mettre (Vous quand c'est le user Actuel)*/}
            </View>
            <View style={styles.userTropheesContainer}>
                <Text style={styles.userTropheesText}>{user_DATA?.Trophees || -1}</Text>
                <Image source={tropheeIcon} style={styles.TropheesIcon}/>
            </View>
            {
                separateur &&
                <View style={styles.separateurWrapper}>
                    <View style={styles.demiLigneSeparateur}/>
                </View>
            }
        </View>
    )
}


// ---------------- MA CARRIERE ----------------

const MaCarriere = ({isActive}) => {
    return (
        <View style={[{display: isActive ? "flex" : "none"}]}>
           <View>
               <Text>Vous êtes</Text>
               <View>
                   <View>
                       <Image source={getRankImageUrl(200000)}/>
                       <Image source={getRankImageUrl(200000)} style={{ opacity: 0.8, tintColor: "#000000", position: "absolute"}} />
                   </View>
                   <Image source={getRankImageUrl(1000)}/>
                   <Image source={getRankImageUrl(1000)}/>
               </View>
               <Text>Or III</Text>
               <Text>Un éco-responsable en Or</Text>
           </View>
           <View>
               <View>
                   <Text>{-1}</Text>
                   <View>
                       <View/>
                       <View/>
                   </View>
                   <Text>{-1}</Text>
               </View>
               <Text>{-1} Trophées</Text>
           </View>
           <View>
               <TouchableOpacity>
                   <Image/><Text>Classement global :<Text>{"#-1"}</Text></Text>
               </TouchableOpacity>
               <View>
                   <TouchableOpacity>
                       <Text>En savoir plus sur le classement</Text>
                   </TouchableOpacity>
                   <TouchableOpacity>
                       <Text>Voir les rangs disponibles</Text>
                   </TouchableOpacity>
               </View>
           </View>
        </View>
    )
}


// ---------------- CLASSEMENT ----------------
const CONFIG_TABNAVBAR = {
    leaderboard : {transparent : true},
    macarriere : {transparent : false},
}

export default function Classement(){

    const ongletsMobile = [
        {id: "leaderboard", label: "Leaderboard", component: Leaderboard},
        {id: "macarriere", label: "Ma carrière", component: MaCarriere},
    ];

    const [ongletActifId, setOngletActifId] = React.useState("leaderboard");

    const config = CONFIG_TABNAVBAR[ongletActifId];

    return(
        <View style={[styles.container, config.transparent && {backgroundColor: "#05D991"}]}>

            <View style={{ flex: 1}}>
                <Header titre={"Classement"} boutonRetour={true} fondTransparent={config.transparent}/>
                <View style={{ flex: 1}}>
                    <TabNavbarMobile
                        ongletActifId={ongletActifId}
                        onglets={ongletsMobile}
                        setOngletActif={setOngletActifId}
                        transparent={config.transparent}
                    />

                    {
                        ongletsMobile.map((onglet) => {
                            const OngletComponent = onglet.component;
                            return (
                                <OngletComponent
                                    key={onglet.id}
                                    isActive={onglet.id === ongletActifId}
                                    setOngletActifId={setOngletActifId}
                                />
                            );
                        })
                    }
                </View>
            </View>
        </View>
    );
};
