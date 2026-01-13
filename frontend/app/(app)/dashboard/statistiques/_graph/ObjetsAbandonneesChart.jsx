import React from "react";
import { PieChart } from "react-native-chart-kit";
import { useScreenDimensions } from "./chartConfig";

export default function ObjetsAbandonneesChart() {
    const data = [
        { name: "d'objets retrouvés", population: 25, color: "#FFD580", legendFontColor: "#333" },
        { name: "d'objets récupérés", population: 75, color: "#87CEFA", legendFontColor: "#333" },
    ];

    const width = useScreenDimensions();

    return (
        <PieChart
            data={data}
            width={width}
            height={220}
            chartConfig={{ color: () => "#000" }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
        />
    );
}
