import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../constants/API_URL";
import {Platform} from "react-native";

export async function uploadDocument(cardId, file) {
    const token = await AsyncStorage.getItem("@auth_token");
    const formData = new FormData();

    formData.append("cardId", String(cardId));

    if (Platform.OS === "web") {
        formData.append("file", file);
    } else {
        formData.append("file", {
            uri: file.uri,
            name: file.name ?? "document.jpg",
            type: file.type ?? "image/jpeg",
        });
    }
    const response = await fetch(`${API_URL}/document/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Upload failed");
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}




export async function fetchAllDocuments() {
    const response = await fetch(`${API_URL}/document/all`);
    return response.json();
}
