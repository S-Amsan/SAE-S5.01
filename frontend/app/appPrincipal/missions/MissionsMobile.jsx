import React, { useEffect, useState } from "react";
import { View } from "react-native";

import Header from "../../../components/Header";
import TabNavbarMobile from "../../../components/TabNavbarMobile";

import MissionsListContent from "./_components/MissionsListContent/MissionsListContent";
import Gestes from "./_components/Gestes/Gestes";
import PostObjet from "./_components/PostObjet/PostObjet";
import PostAction from "./_components/Post/PostAction";
import ObjetDetails from "./_components/ObejetDetails/ObjetDetails";
import AssociateSubscription from "./_components/Associate/AssociateSubscription";
import ObjetRecupPhoto from "./_components/CollectObjet/CollectObjet";
import { useLocalSearchParams } from "expo-router";
import {getAllObjects} from "../../../services/objects.api";

export default function MissionsMobile() {
    /* ===== ÉTATS ===== */
    const [page, setPage] = useState("listes"); // listes | recupObjet | associate | postObjet
    const [ongletActifId, setOngletActifId] = useState("listes"); // listes | gestes
    const [selectedObjet, setSelectedObjet] = useState(null);
    const { page: pageFromScan, product, code } = useLocalSearchParams();

    const { mode, objetId } = useLocalSearchParams();

    useEffect(() => {
        if (mode === "recup" && objetId) {
            setPage("recupObjet");
        }
    }, [mode, objetId]);

    useEffect(() => {
        if (!objetId) return;

        const id = Number(objetId);
        if (!id) return;

        const load = async () => {
            const objects = await getAllObjects();
            const found = objects.find(o => o.id === id);
            if (!found) return;

            setSelectedObjet(found);
        };

        load();
    }, [objetId]);


    const onglets = [
        { id: "listes", label: "Régulières" },
        { id: "gestes", label: "Une fois" },
    ];

    const getTitle = () => {
        switch (page) {
            case "postObjet":
                return "Poster un objet";
            case "post":
                return "Publier votre action";
            case "associate":
                return "Associer un abonnement";
            case "recupObjet":
                return "Récupérer un objet";
            default:
                return "Missions";
        }
    };
        const handleBack = () => {
            if (page === "recupPhoto") {
                setPage("recupObjet");
                return;
            }

            if (page === "recupObjet") {
                setSelectedObjet(null);
                setPage("listes");
                setOngletActifId("listes");
                return;
            }

            if (page === "associate") {
                setPage("listes");
                setOngletActifId("gestes");
                return;
            }

            if (page === "postObjet") {
                setPage("listes");
                setOngletActifId("listes");
                return;
            }

            if (page === "post") {
                setPage("listes");
                setOngletActifId("listes");
                return;
            }

        };

    useEffect(() => {
        if (pageFromScan === "post") {
            setPage("post");
        }
    }, [pageFromScan]);


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* ===== HEADER ===== */}
            <Header
                titre={getTitle()}
                boutonRetour={page !== "listes"}
                onBack={handleBack}
            />

            {/* ===== ONGLET ===== */}
            {page === "listes" && (
                <TabNavbarMobile
                    onglets={onglets}
                    ongletActifId={ongletActifId}
                    setOngletActif={setOngletActifId}
                />
            )}

            {/* LISTES */}
            {page === "listes" && ongletActifId === "listes" && (
                <MissionsListContent
                    onPostObjet={() => setPage("postObjet")}
                    onSeeObjet={(objet) => {
                        setSelectedObjet(objet);
                        setPage("recupObjet");
                    }}
                />
            )}

            {/* DÉTAIL OBJET */}
            {page === "recupObjet" && selectedObjet && (
                <ObjetDetails
                    objet={selectedObjet}
                    onRecupObjet={() => setPage("recupPhoto")}
                    onSignal={() => {

                        console.log("SIGNALER OBJET");
                    }}
                />
            )}


            {/* PHOTO APRÈS RÉCUP */}
            {page === "recupPhoto" && selectedObjet && (
                <ObjetRecupPhoto
                    objet={selectedObjet}
                    onBack={handleBack}
                    onSubmit={() => {
                        setSelectedObjet(null);
                        setPage("listes");
                        setOngletActifId("listes");
                    }}
                />
            )}


            {/* GESTES */}
            {page === "listes" && ongletActifId === "gestes" && (
                <Gestes onAssociate={() => setPage("associate")} />
            )}

            {/* ASSOCIATE */}
            {page === "associate" && (
                <AssociateSubscription onBack={handleBack} />
            )}

            {/* POST OBJET */}
            {page === "postObjet" && (
                <PostObjet onBack={handleBack} />
            )}

            {page === "post" && (
                <PostAction onBack={handleBack} />
            )}

        </View>
    );
}
