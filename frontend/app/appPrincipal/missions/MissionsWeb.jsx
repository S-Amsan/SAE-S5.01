import { View } from "react-native";
import { useState } from "react";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";

import MissionsListContent from "./_components/MissionsListContent/MissionsListContent";
import Gestes from "./_components/Gestes/Gestes";
import PostObjet from "./_components/PostObjet/PostObjet";
import AssociateSubscription from "./_components/Associate/AssociateSubscription";
import ObjetDetail from "./_components/ObejetDetails/ObjetDetails";
import ObjetRecupPhoto from "./_components/CollectObjet/CollectObjet";

export default function MissionsWeb() {
    /* ===== ONGLET ===== */
    const [ongletActifId, setOngletActifId] = useState("listes");
    const [selectedCard, setSelectedCard] = useState(null);


    /* ===== MODALS ===== */
    const [showPostModal, setShowPostModal] = useState(false);
    const [showAssociateModal, setShowAssociateModal] = useState(false);
    const [showMissionDetailModal, setShowMissionDetailModal] = useState(false);
    const [showRecupObjetModal, setShowRecupObjetModal] = useState(false);

    /* ===== OBJET SÉLECTIONNÉ ===== */
    const [selectedObjet, setSelectedObjet] = useState(null);

    const onglets = [
        { id: "listes", label: "Régulières" },
        { id: "gestes", label: "Une fois" },
    ];

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f6f6f6" }}>
            {/* ===== NAVBAR ===== */}
            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            {/* ===== CONTENU ===== */}
            <View style={{ flex: 1 }}>
                <Header
                    onglets={onglets}
                    ongletActifId={ongletActifId}
                    setOngletActif={setOngletActifId}
                />

                <View style={{ flex: 1, padding: 24 }}>
                    {ongletActifId === "listes" && (
                        <MissionsListContent
                            onPostObjet={() => {
                                closeAllModals();
                                setShowPostModal(true);
                            }}
                            onSeeObjet={(objet) => {
                                closeAllModals();
                                setSelectedObjet(objet);
                                setShowMissionDetailModal(true);
                            }}
                        />
                    )}

                    {ongletActifId === "gestes" && (
                        <Gestes
                            onAssociate={(card) => {
                                closeAllModals();
                                setSelectedCard(card);
                                setShowAssociateModal(true);
                            }}
                        />

                    )}
                </View>
            </View>

            {/* ===== MODAL POST OBJET ===== */}
            {showPostModal && (
                <PostObjet
                    onBack={() => setShowPostModal(false)}
                />
            )}

            {/* ===== MODAL ASSOCIATE ===== */}
            {showAssociateModal && (
                <AssociateSubscription
                    card={selectedCard}
                    onBack={() => setShowAssociateModal(false)}
                />
            )}

            {/* ===== MODAL DÉTAIL OBJET ===== */}
            {showMissionDetailModal && selectedObjet && (
                <ObjetDetail
                    objet={selectedObjet}
                    onBack={() => {
                        setShowMissionDetailModal(false);
                        setSelectedObjet(null);
                    }}
                    onRecupObjet={() => {
                        setShowMissionDetailModal(false);
                        setShowRecupObjetModal(true);
                    }}
                />
            )}

            {/* ===== MODAL RÉCUP OBJET ===== */}
            {showRecupObjetModal && selectedObjet && (
                <ObjetRecupPhoto
                    objet={selectedObjet}
                    onBack={() => {
                        setShowRecupObjetModal(false);
                        setShowMissionDetailModal(true);
                    }}
                    onSubmit={() => {
                        setShowRecupObjetModal(false);
                        setSelectedObjet(null);
                    }}
                />
            )}
        </View>
    );

    function closeAllModals() {
        setShowPostModal(false);
        setShowAssociateModal(false);
        setShowMissionDetailModal(false);
        setShowRecupObjetModal(false);
    }
}
