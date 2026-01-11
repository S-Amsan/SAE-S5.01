import {ScrollView, Text, View, Image, TouchableOpacity, Pressable} from "react-native";
import React, {useState} from "react";

import Header from "../../../../components/Header";
import TabNavbarMobile from "../../../../components/TabNavbarMobile";


import cible from "../../../../assets/icones/social/cible.png";
import horloge from "../../../../assets/icones/social/horloge.png";

import styles from "./styles/styles";
import {formatNombreEspace} from "../../../../utils/format";
import {tempsEcoule, tempsRestant} from "../../../../utils/temps";
import {Ionicons} from "@expo/vector-icons";
import {getMessageEncouragement} from "../../../../utils/message";
import PopUp from "../../../../components/PopUp";


const EVENT_CONFIG = {
    concours: {
        titre: "Concours", couleur: "#FFD54F"
    },
    evenements: {
        titre: "Événements", couleur: "#E7A2F0"
    },
}

const EnCours = ({isActive, config, event_DATA}) => {

    if (!event_DATA) {
        return (
            <View style={[styles.enCoursContainer, {display: isActive ? "flex" : "none"}]}>
                <View style={styles.alertContainer}>
                    <Text style={styles.messageAlert}>Aucun {config.titre.toLowerCase()} disponible :(</Text>
                </View>
            </View>
        )
    }

    const event_user_DATA = event_DATA.collectedPoints

    const pointsObjectif = formatNombreEspace(event_DATA.goalPoints);
    const pointsRecolte = formatNombreEspace(event_user_DATA ?? 0);
    const pourcentageDAvancement = Math.min((event_user_DATA ?? 0) / event_DATA.goalPoints, 1);

    const eventNom = event_DATA.name
    const eventFin = tempsRestant(event_DATA.deadline)

    const participants = event_DATA.participants
    const qualifies = event_DATA.qualified
    const coutInscriptionEvent = formatNombreEspace(event_DATA.inscriptionCost)
    const pointsARedistribuer = formatNombreEspace(participants * event_DATA.inscriptionCost)

    return (
        <View style={[styles.enCoursContainer, {display: isActive ? "flex" : "none"}]}>

            {/* ---- HAUT ----- */}
            {/* Partie Info */}
            <View style={styles.partieInfoContainer}>
                <View style={styles.nomEventContainer}>
                    <Text style={styles.nomEventText}>{config.titre + " " +eventNom}</Text>
                </View>
                <View style={styles.InfoEventWrapper}>
                    <View style={styles.InfoEventContainer}>
                        <Image source={cible} style={styles.InfoEventImage}></Image>
                        <Text style={styles.InfoEventNom}>Objectif : atteindre {pointsObjectif} points</Text>
                    </View>
                    <View style={styles.InfoEventContainer}>
                        <Image source={horloge} style={styles.InfoEventImage}></Image>
                        <Text style={styles.InfoEventNom}>Fin dans {eventFin}</Text>
                    </View>
                </View>
            </View>

            {/* ---- MILIEU ----- */}
            {/* Carte Info */}
            <View style={styles.contenuMilieuContainer}>

                {event_user_DATA ? (
                    <View style={styles.carteInfoContainer}>
                        <Text style={styles.infoPointsText}>{pointsRecolte} pts / {pointsObjectif} pts</Text>
                        <View style={styles.barreDAvancementContainer}>
                            <View
                                style={{
                                    backgroundColor: config.couleur,
                                    borderRadius: 24,
                                    width: `${pourcentageDAvancement * 100}%`,
                                }}
                            />
                            <View
                                style={{
                                    width: `${(1 - pourcentageDAvancement) * 100}%`,
                                }}
                            />
                        </View>
                        <Text>Tu es à {(pourcentageDAvancement * 100).toFixed(2)}% de l&#39;objectif ! 🤤</Text>
                    </View>
                ) : (
                    <View style={[styles.carteInfoContainer, {padding: 30, gap: 10}]}>
                        <Text style={styles.infoPointsText}>Coût d’incription</Text>
                        <Text style={styles.coutText}>{coutInscriptionEvent} points</Text>
                    </View>
                )
                }
                <View style={styles.boutonsContainer}>
                    {event_user_DATA ? (
                            <TouchableOpacity style={[styles.boutonPrincipaleContainer, styles.boutonDesinscrire]}><Text
                                style={styles.boutonPrincipaleText}>Se désinscrire</Text></TouchableOpacity>
                        ) :
                        (
                            <TouchableOpacity style={[styles.boutonPrincipaleContainer, styles.boutonSinscrire]}><Text
                                style={styles.boutonPrincipaleText}>S’inscrire</Text></TouchableOpacity>
                        )
                    }
                    <View style={styles.boutonsSecondaireContainer}>
                        <TouchableOpacity style={styles.boutonSecondaireContainer}><Text
                            style={styles.boutonsSecondaireText}>En savoir plus</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.boutonSecondaireContainer}><Text
                            style={styles.boutonsSecondaireText}>Voir les récompences</Text></TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* ---- BAS ----- */}
            {/* Infos Supplementaires */}
            <View style={styles.infosCarteContainer}>
                <Text style={styles.infoTitre}>Informations supplémentaires</Text>
                <View style={styles.infosContainer}>
                    <Text style={styles.infoText}>Participants : {participants}</Text>
                    <Text style={styles.infoText}>Qualifiés : {qualifies}</Text>
                    <Text style={styles.infoText}>Points à redistribuer : {pointsARedistribuer}</Text>
                    <Text style={styles.infoText}>Chances de gagner : ~{((1 / qualifies) * 100).toFixed(2)}%</Text>
                </View>
            </View>
        </View>
    );
};

const Statistiques = ({isActive, config, user_event_DATA, setOngletActifId}) => {
    const [eventClique, setEventClique] = useState(null);

    if (!user_event_DATA) {
        return (
            <View style={[styles.enCoursContainer, {display: isActive ? "flex" : "none"}]}>
                <View style={styles.alertContainer}>
                    <Text style={styles.messageInformatif}>Rejoignez un {config.titre.toLowerCase()} et commencez à suivre vos performances !</Text>
                </View>
            </View>
        )
    }

    const nbParticipations = user_event_DATA.length;
    const nbQualifications = user_event_DATA.filter(e => e.collectedPoints > e.goalPoints).length;
    const nbConcoursGagnes = user_event_DATA.filter(e => e.recompense !== null).length;
    const efficacite = nbParticipations > 0 ? Math.round((nbQualifications / nbParticipations) * 100) : 0;

    return (
        <>

            <PopUp visible={eventClique} setVisible={setEventClique}>
                <EventPopup event_DATA={eventClique} setEventClique={setEventClique} config={config}/>
            </PopUp>

            <View style={[styles.statistiqueContainer, {display: isActive ? "flex" : "none"}]}>
                <View style={styles.infosCarteContainer}>
                    <Text style={styles.infoTitre}>Récapitulatif</Text>
                    <View style={styles.infosContainer}>
                        <Text style={styles.infoText}>Participations : {nbParticipations}</Text>
                        <Text style={styles.infoText}>Qualifications : {nbQualifications}</Text>
                        <Text style={styles.infoText}>Concours gagnés : {nbConcoursGagnes}</Text>
                        <Text style={styles.infoText}>Efficacité : ~{efficacite}%</Text>
                    </View>
                </View>
                <View>
                    <View><Text style={styles.titre}>Historique des {config.titre.toLowerCase()}</Text></View>
                    <View style={styles.carteEventContainer}>
                        {user_event_DATA.map((event_DATA, index) => (
                            <CarteEvent key={index} event_DATA={event_DATA} id={index+1} setEventClique={setEventClique} setOngletActifId={setOngletActifId}/>
                        ))}
                    </View>
                </View>
                <Text style={styles.finText}>Vous avez atteins la fin</Text>
            </View>
        </>
    );
};

const CarteEvent = ({event_DATA,setEventClique, setOngletActifId, id}) => {
    if (!event_DATA) {
        return null;
    }


    const pointsObjectif = formatNombreEspace(event_DATA.goalPoints);
    const pointsRecolte = formatNombreEspace(event_DATA?.collectedPoints ?? 0);
    const pourcentageDAvancement = Math.min((event_DATA?.collectedPoints ?? 0) / event_DATA.goalPoints, 1);

    const eventTermine = tempsRestant(event_DATA.deadline) === "Terminé"
    const qualifieALEvent = pourcentageDAvancement !== 1

    return (
        <TouchableOpacity style={styles.carteEvent} onPress={() => eventTermine ? setEventClique({ ...event_DATA, id }) : setOngletActifId("encours")}>
            <Text style={styles.numText}>#{id || -1}</Text>
            <View style={styles.carteContenu}>
                <Text style={styles.infoNom}>{event_DATA.name}</Text>
                <Text style={styles.infoTemps}>{eventTermine ? ("Il y a " + tempsEcoule(event_DATA.deadline)): ("Fin dans " + tempsRestant(event_DATA.deadline))}</Text>
                <View style={styles.infoEvent}>
                    <Text style={styles.progressionText}>{pointsRecolte} / {pointsObjectif} ({(pourcentageDAvancement * 100).toFixed(1)}%)</Text>
                    {
                        !eventTermine ?
                            <Text style={styles.infoEtat}>En cours</Text>
                            :
                            qualifieALEvent ?
                                <Text style={[styles.infoEtat, styles.defaite]}>Non qualifié</Text>
                                :
                                event_DATA.recompense ?
                                    <Text style={[styles.infoEtat, styles.victoire]}>Gagné</Text>
                                    :
                                    <Text style={[styles.infoEtat, styles.defaite]}>Perdu</Text>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const EventPopup = ({event_DATA, setEventClique, config}) => {
    if (!event_DATA) {
        return null;
    }
    const eventNom = event_DATA.name
    const eventFin = tempsEcoule(event_DATA.deadline)

    const pointsObjectif = formatNombreEspace(event_DATA.goalPoints);
    const pointsRecolte = formatNombreEspace(event_DATA?.collectedPoints ?? 0);
    const pourcentageDAvancement = Math.min((event_DATA?.collectedPoints ?? 0) / event_DATA.goalPoints, 1);

    const participants = event_DATA.participants
    const qualifies = event_DATA.qualified
    const pointsARedistribuer = formatNombreEspace(participants * event_DATA.inscriptionCost)

    return (
        <View style={styles.popupContainer}>
            <View style={styles.popupEventContainer}>
                <View style={styles.titreHautContainer}>
                    <Text style={styles.popupTitre}>{eventNom}</Text>
                    <Text style={styles.popupSousTitre}>{config.titre} #{event_DATA.id || -1}</Text>
                </View>
                <Pressable style={styles.closeBouton} onPress={() => {setEventClique(null)}}>
                    <Ionicons name={"close"} size={24}  />
                </Pressable>
                <View style={styles.eventInfosContainer}>
                    <View style={styles.eventInfoContainer}>
                        <Image source={cible} style={styles.popupIcon}/>
                        <Text style={styles.infoPopupText}>Objectif : atteindre {pointsObjectif} points</Text>
                    </View>
                    <View style={styles.eventInfoContainer}>
                        <Image source={horloge} style={styles.popupIcon}/>
                        <Text style={styles.infoPopupText}>Terminé il y a {eventFin}</Text>
                    </View>
                </View>
                <Text style={styles.eventProgression}>{pointsRecolte} pts / {pointsObjectif} pts</Text>
                <View style={styles.eventResultat}>
                    {pourcentageDAvancement === 1 ?
                        event_DATA.recompense ?
                            (<>
                                <Text style={styles.eventResultatTitre}>🏆 Vous avez gagné : </Text>
                                <Text style={styles.eventResultatSousTitre}>{event_DATA.recompense.Nom}</Text>
                                <Text style={styles.eventResultatInfo}><Text style={styles.gras}>Récompense disponible</Text> dans votre profil</Text>
                            </>):
                            (<>
                                <Text style={styles.eventResultatTitre}>😭 Vous avez perdu : </Text>
                                <Text style={styles.eventResultatSousTitre}>{getMessageEncouragement()}</Text>
                                <Text style={[styles.eventResultatInfo,styles.rougeText]}><Text style={styles.gras}>Vous n’avez pas été tiré au sort cette fois.</Text></Text>
                            </>)
                        :
                        (<>
                            <Text style={styles.eventResultatTitre}>😭 Vous avez perdu : </Text>
                            <Text style={styles.eventResultatSousTitre}>{getMessageEncouragement()}</Text>
                            <Text style={[styles.eventResultatInfo,styles.rougeText]}><Text style={styles.gras}>Vous n&#39;avez pas réussi à vous qualifier</Text></Text>
                        </>)
                    }

                </View>
                <View style={styles.eventInfoSuppWrapper}>
                    <Text style={styles.eventInfoSuppTitre}>Informations supplémentaires</Text>
                    <View style={styles.eventInfoSuppContainer}>
                        <Text style={styles.eventInfoSuppText}>Participants : {participants}</Text>
                        <Text style={styles.eventInfoSuppText}>Qualifiés : {qualifies}</Text>
                        <Text style={styles.eventInfoSuppText}>Points à redistribuer : {pointsARedistribuer}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default function EventPage({type, event_DATA, user_event_DATA}) {

    const ongletsMobile = [
        {id: "encours", label: "En cours", component: EnCours},
        {id: "statistiques", label: "Statistiques", component: Statistiques},
    ];

    const [ongletActifId, setOngletActifId] = React.useState("encours");

    const config = EVENT_CONFIG[type];

    return (
        <View style={styles.container}>

            <Header titre={config.titre} boutonRetour={true}/>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>

                <TabNavbarMobile
                    ongletActifId={ongletActifId}
                    onglets={ongletsMobile}
                    setOngletActif={setOngletActifId}
                />

                {
                    ongletsMobile.map((onglet) => {
                        const OngletComponent = onglet.component;
                        return (
                            <OngletComponent
                                key={onglet.id}
                                isActive={onglet.id === ongletActifId}
                                config={config}
                                event_DATA={event_DATA}
                                user_event_DATA={user_event_DATA}
                                setOngletActifId={setOngletActifId}
                            />
                        );
                    })
                }
            </ScrollView>

        </View>
    );
}
