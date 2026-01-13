import { useWindowDimensions } from "react-native";

export const useScreenDimensions = () => {
    const { width } = useWindowDimensions();
    return width * 0.85 * 0.40;
};


export const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
    labelColor: () => "#666",
    propsForDots: {
        r: "5",
        strokeWidth: "2",
        stroke: "#1e90ff",
    },
};
