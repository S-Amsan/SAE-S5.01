import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function RewardsByCategoryChart() {
    const barData = [
        { value: 950, label: 'CARTES\nCADEAUX', frontColor: '#36a2eb' },
        { value: 420, label: 'BONS DE\nRÉDUCTION', frontColor: '#36a2eb' },
        { value: 210, label: 'DONS AUX\nASSOCIATIONS', frontColor: '#36a2eb' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                RÉPARTITION DES RÉCOMPENSES ACHETÉ PAR CATÉGORIE
            </Text>

            <View style={styles.chartWrapper}>
                <BarChart
                    data={barData}
                    barWidth={60}
                    spacing={50}
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 20,
        color: "#333",
        textAlign: "center",
        letterSpacing: 0.5,
    },
    chartWrapper: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
});
