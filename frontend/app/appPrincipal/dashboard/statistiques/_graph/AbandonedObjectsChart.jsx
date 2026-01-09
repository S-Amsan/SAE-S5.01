import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { screenWidth } from "./chartConfig";

export default function AbandonedObjectsChart() {
    const data = [
        { name: "Objet trouvé", population: 25, color: "#FFD580", legendFontColor: "#333" },
        { name: "Objet récupéré", population: 75, color: "#87CEFA", legendFontColor: "#333" },
    ];

    return (
        <View>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
                Répartition des objets abandonnés
            </Text>
            <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={{ color: () => "#000" }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
            />
        </View>
    );
}
