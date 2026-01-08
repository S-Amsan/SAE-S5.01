import { Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MissionsMobile from "./MissionsMobile";
import MissionsWeb from "./MissionsWeb";

export default function MissionsIndex() {
    const params = useLocalSearchParams();

    return Platform.OS === "web"
        ? <MissionsWeb {...params} />
        : <MissionsMobile {...params} />;
}
