import React from "react";
import { PieChart } from "react-native-chart-kit";
import { useScreenDimensions } from "./chartConfig";

export default function ObjetsAbandonneesChart({data}) {

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
