import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "../constants/API_URL";

export async function checkReport(reportId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/check_report/${reportId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}
