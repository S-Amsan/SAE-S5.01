import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { screenWidth } from "./chartConfig";

export default function PostsDistributionChart() {
    const data = [
        { name: "Post validé", population: 25, color: "#FFD580", legendFontColor: "#333" },
        { name: "Post refusé", population: 15, color: "#98FB98", legendFontColor: "#333" },
        { name: "Post non voté", population: 60, color: "#87CEFA", legendFontColor: "#333" },
    ];

    return (
        <View>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
                Répartition des posts
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
