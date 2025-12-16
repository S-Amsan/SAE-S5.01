import { View } from "react-native";
import { Slot } from "expo-router";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";

export default function MissionsLayoutWeb() {
    const onglets = [
        { id: "missions", label: "Régulières", page: "missions/listes" },
        { id: "gestes", label: "Une fois", page: "missions/gestes" },
    ];

    return (
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f6f6f6" }}>
            <View style={{ width: "15%" }}>
                <Navbar />
            </View>

            <View style={{ flex: 1 }}>
                <Header onglets={onglets} />
                <View style={{ flex: 1, padding: 24 }}>
                    <Slot />
                </View>
            </View>
        </View>
    );
}
