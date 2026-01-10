
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/API_URL";

/**
 * Example response:
 * ```json
 * {
 *   "id": 1,
 *   "title": "Canapé",
 *   "address": "143 avenue de Versailles",
 *   "description": "Vieux truc pourri",
 *   "photoUrl": "http://82.66.240.161:8090/files/be1da047d3f3323851a1219447158af54df17496f2f48d2dc3f0768b7eb00582.png",
 *   "pickedUp": false,
 *   "creationDate": "2026-01-08",
 *   "user_id": 1
 * }
 * ```
*/
export async function postObject({ title, description, address, imageUrl }) {
    const token = await AsyncStorage.getItem("@auth_token");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);

    formData.append("image", {
        uri: imageUrl,
        name: "photo.jpg",
        type: "image/jpeg",
    });

    const response = await fetch(`${API_URL}/object/post`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    return response.json();
}


/**
 * Example response:
 * ```json
 * [
 *   {
 *     "id": 1,
 *     "title": "Canapé",
 *     "address": "143 avenue de Versailles",
 *     "description": "Vieux truc pourri",
 *     "photoUrl": "http://82.66.240.161:8090/files/be1da047d3f3323851a1219447158af54df17496f2f48d2dc3f0768b7eb00582.png",
 *     "pickedUp": false,
 *     "creationDate": "2026-01-08",
 *     "user_id": 1
 *   }
 * ]
 * ```
*/
export async function getAllObjects() {
    const response = await fetch(`${API_URL}/object/all`);

    if (!response.ok) {
        const text = await response.text();
        console.error("API ERROR:", response.status, text);
        throw new Error("Erreur API getAllObjects");
    }

    try {
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (e) {
        console.error("JSON parse error getAllObjects", e);
        return [];
    }
}


export async function pickupObject(object_id) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/object/pickup/${object_id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}

export async function fetchObjectById(object_id) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/object/${object_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}
