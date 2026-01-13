import React from "react";
import { LineChart } from "react-native-chart-kit";
import {chartConfig, useScreenDimensions} from "./chartConfig";

export default function GesteEcoHebdomadaire({data}) {

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
