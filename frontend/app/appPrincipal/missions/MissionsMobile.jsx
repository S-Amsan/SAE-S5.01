import React, {useEffect, useRef, useState} from "react";
import {Animated, View} from "react-native";
import Header from "../../../components/Header";
import TabNavbarMobile from "../../../components/TabNavbarMobile";
import ScanActionButton from "../../../components/ScanActionButton";
import { useLocalSearchParams, useRouter } from "expo-router";

import MissionsListContent from "./_components/MissionsListContent/MissionsListContent";
import Gestes from "./_components/Gestes/Gestes";
import Post from "./_components/PostObjet/Post";
import AssociateSubscription from "./_components/Associate/AssociateSubscription";

export default function MissionsMobile() {
    const [ongletActifId, setOngletActifId] = useState("listes");
    const [page, setPage] = useState("listes");

    const router = useRouter();
    const { scannedData } = useLocalSearchParams();

    useEffect(() => {
        if (scannedData) {
            console.log("MISSION → SCAN REÇU :", scannedData);
        }
    }, [scannedData]);

    const onglets = [
        { id: "listes", label: "Régulières" },
        { id: "gestes", label: "Une fois" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header
                titre={
                    page === "postObjet"
                        ? "Poster un objet"
                        : page === "associate"
                            ? "Associer un abonnement"
                            : "Missions"
                }
                boutonRetour
                onBack={() => {
                    if (page === "postObjet" || page === "associate") {
                        setPage("listes");
                    } else {
                        router.back();
                    }
                }}
            />

            {/* Onglets visibles UNIQUEMENT sur la page listes */}
            {page === "listes" && (
                <TabNavbarMobile
                    ongletActifId={ongletActifId}
                    onglets={onglets}
                    setOngletActif={setOngletActifId}
                />
            )}

            {/* Pages internes */}
            {page === "listes" && ongletActifId === "listes" && (
                <MissionsListContent onPostObjet={() => setPage("postObjet")} />
            )}

            {page === "listes" && ongletActifId === "gestes" && (
                <Gestes
                    onAssociate={() => setPage("associate")}
                />
            )}

            {page === "associate" && (
                <AssociateSubscription
                    onBack={() => setPage("listes")}
                />
            )}

            {page === "postObjet" && <Post onBack={() => setPage("listes")} />}
        </View>
    );
}

