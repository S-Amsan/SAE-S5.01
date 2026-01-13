import React from "react";
import { LineChart } from "react-native-chart-kit";
import {chartConfig, useScreenDimensions} from "./chartConfig";

export default function GesteEcoHebdomadaire() {
    const data = {
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        datasets: [{ data: [380, 150, 780, 820, 650, 50, 43] }],
    };

    const width = useScreenDimensions();

    return (
        <LineChart
            data={data}
            width={width}
            height={220}
            chartConfig={chartConfig}
            bezier
        />
    );
}
