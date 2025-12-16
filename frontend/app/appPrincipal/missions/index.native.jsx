import React, { useState } from "react";
import { View } from "react-native";
import Header from "../../../components/Header";
import TabNavbarMobile from "../../../components/TabNavbarMobile";
import MissionsListContent from "./_components/MissionsListContent/MissionsListContent";
import Gestes from "./_components/Gestes/Gestes";

const items = [
    {
        id: 1,
        title: "Barbecue",
        address: "96 Av. de La Liberté Tunis",
        distance: "5 km",
        author: "@Maitre",
        time: "2 min",
        image: "https://via.placeholder.com/120",
    },
    {
        id: 2,
        title: "Équipements maison",
        address: "96 Av. de La Liberté Tunis",
        distance: "13 km",
        author: "@Maitre",
        time: "2 min",
        image: "https://via.placeholder.com/120",
    },
];

export default function MissionsMobile() {
    const [ongletActifId, setOngletActifId] = useState("listes");

    const onglets = [
        { id: "listes", label: "Régulières" },
        { id: "gestes", label: "Une fois" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header titre="Missions" boutonRetour />

            <TabNavbarMobile
                ongletActifId={ongletActifId}
                onglets={onglets}
                setOngletActif={setOngletActifId}
            />

            {ongletActifId === "listes" && (
                <MissionsListContent items={items} />
            )}

            {ongletActifId === "gestes" && <Gestes />}
        </View>
    );
}
