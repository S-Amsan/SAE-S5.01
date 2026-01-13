import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "../constants/API_URL";

export async function fetchAllCards() {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/cards`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erreur lors du chargement des cards");
    }

    return response.json();
}
