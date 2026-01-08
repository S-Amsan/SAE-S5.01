import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from "../constants/API_URL";

export async function uploadDocument(card_id, fileUri) {
    const token = await AsyncStorage.getItem('@auth_token');
    const formData = new FormData();

    formData.append("cardId", card_id);
    // TODO: Traiter le fichier

    const response = await fetch(`${API_URL}/document/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    return response.json();
}

export async function fetchAllDocuments() {
    const response = await fetch(`${API_URL}/document/all`);
    return response.json();
}
