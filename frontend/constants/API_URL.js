import {Platform} from "react-native";

export const API_URL =
    Platform.OS === "android" || Platform.OS === "ios"
        ? "http://172.20.10.2:8080"
        : "http://localhost:8080";
