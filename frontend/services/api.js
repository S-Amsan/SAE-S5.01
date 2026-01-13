import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { API_URL } from "../constants/API_URL";

export async function apiFetch(path, options = {}) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    // 🔴 SESSION EXPIRÉE
    if (response.status === 401 || response.status === 403) {
        await AsyncStorage.multiRemove(["@auth_token", "@auth_email"]);

        Toast.show({
            type: "info",
            text1: "Session expirée",
            text2: "Veuillez vous reconnecter",
        });

        router.replace("/(auth)/Login");
        throw new Error("SESSION_EXPIRED");
    }

    // 🔹 Lecture SAFE de la réponse
    const contentType = response.headers.get("content-type");

    let data = null;
    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    }

    if (!response.ok) {
        throw new Error(data?.message || "Erreur API");
    }

    return data;
}
