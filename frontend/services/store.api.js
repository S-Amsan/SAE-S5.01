import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/API_URL";

export async function buy(purchaseId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/store/buy/${purchaseId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
