import React from "react";
import { BarChart } from "react-native-gifted-charts";
import {useScreenDimensions} from "./chartConfig";

export default function RecompensesParCategorieChart({data}) {

    const width = useScreenDimensions();

    return (
        <BarChart
            width={width-70}
            data={data}
            barWidth={60}
            spacing={100}
            roundedTop={false} // Désactiver l'arrondi
            roundedBottom={false} // Désactiver l'arrondi
            hideRules
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisColor="#333"
            yAxisColor="#333"
            yAxisTextStyle={{
                color: '#666',
                fontSize: 10,
                fontWeight: '600'
            }}
            xAxisLabelTextStyle={{
                color: '#333',
                fontSize: 10,
                fontWeight: '600',
                textAlign: 'center'
            }}
            noOfSections={4}
            maxValue={1000}
            height={180}
            showVerticalLines={false}
            showFractionalValues={false}
            yAxisOffset={0}
            initialSpacing={30}
            endSpacing={30}
            isAnimated
            showValuesAsTopLabel
            topLabelTextStyle={{
                color: '#333',
                fontSize: 12,
                fontWeight: 'bold',
                marginBottom: 4
            }}
            // Ajouter ces props pour contrôler l'apparence des barres
            barBorderRadius={0} // Radius à 0 pour des rectangles
            // Personnaliser les labels Y
            yAxisLabelTexts={['0', '250', '500', '1000']}
            // Améliorer la grille
            showLine={false}
            // Contrôler la couleur de fond des barres
            showGradient={false}
            // Épaisseur des axes
            thickness={1}
        />
    );
}

