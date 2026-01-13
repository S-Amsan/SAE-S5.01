import React from "react";
import { PieChart } from "react-native-chart-kit";
import {useScreenDimensions} from "./chartConfig";

export default function PostsRepartitionChart() {
    const data = [
        { name: "de posts validés", population: 25, color: "rgba(76,175,80,0.6)", legendFontColor: "#333" },
        { name: "de posts refusés", population: 15, color: "rgba(244,67,54,0.6)", legendFontColor: "#333" },
        { name: "de posts non votés", population: 60, color: "rgba(33,150,243,0.6)", legendFontColor: "#333" },
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
