
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/API_URL";
import {Platform} from "react-native";

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

    if (Platform.OS === "web") {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        formData.append("image", blob, "photo.jpg");
    } else {

        if (!imageUrl.startsWith("file://")) {
            throw new Error("imageUrl mobile invalide");
        }

        formData.append("image", {
            uri: imageUrl,
            name: "photo.jpg",
            type: "image/jpeg",
        });
    }

    const response = await fetch(`${API_URL}/object/post`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
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


export async function pickupObject(objectId) {
    console.log("pickupObject called with", objectId);

    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/object/pickup/${objectId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("pickupObject response status", response.status);

    if (!response.ok) {
        const text = await response.text();
        console.error("pickupObject error body", text);
        throw new Error(text || "Pickup failed");
    }

    const text = await response.text();
    console.log("pickupObject response text", text);

    return text ? JSON.parse(text) : null;
}


export async function fetchObjectById(object_id) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/object/id/${object_id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "fetchObjectById failed");
    }

    return response.json();
}

