import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { chartConfig, screenWidth } from "./chartConfig";

export default function WeeklyEcoActionsChart() {
    const data = {
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        datasets: [{ data: [380, 150, 780, 820, 650, 50, 120] }],
    };

    return (
        <View>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
                Gestes éco hebdomadaire
            </Text>
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
            />
        </View>
    );
}
