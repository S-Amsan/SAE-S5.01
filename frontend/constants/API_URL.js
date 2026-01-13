import {Platform} from "react-native";

export const API_URL =
    Platform.OS === "android" || Platform.OS === "ios"
        ? "http://192.168.1.146:8080"
        : "http://localhost:8080";
