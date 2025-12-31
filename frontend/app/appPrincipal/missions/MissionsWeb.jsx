import { View } from "react-native";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";

import MissionsListContent from "./_components/MissionsListContent/MissionsListContent";
import Gestes from "./_components/Gestes/Gestes";
import Post from "./_components/PostObjet/Post";

export default function MissionsWeb() {
    const [ongletActifId, setOngletActifId] = useState("listes");
    const [showPostModal, setShowPostModal] = useState(false);

    const onglets = [
        { id: "listes", label: "Régulières" },
        { id: "gestes", label: "Une fois" },
    ];

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f6f6f6" }}>
            {/* NAVBAR */}
            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            {/* CONTENU */}
            <View style={{ flex: 1 }}>
                <Header
                    onglets={onglets}
                    ongletActifId={ongletActifId}
                    setOngletActif={setOngletActifId}
                />

                <View style={{ flex: 1, padding: 24 }}>
                    {ongletActifId === "listes" && (
                        <MissionsListContent
                            onPostObjet={() => setShowPostModal(true)}
                        />
                    )}

                    {ongletActifId === "gestes" && <Gestes />}
                </View>
            </View>

            {/* MODAL POST OBJET (WEB) */}
            {showPostModal && (
                <View
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <View
                        style={{
                            width: 500,
                            maxHeight: "90vh",
                            backgroundColor: "#fff",
                            borderRadius: 16,
                            overflow: "hidden",
                        }}
                    >
                        <Post onBack={() => setShowPostModal(false)} />
                    </View>
                </View>
            )}
        </View>
    );
}
