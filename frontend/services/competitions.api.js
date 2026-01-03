import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL =
    Platform.OS === "android"
        ? "http://192.168.1.146:8080"
        : "http://localhost:8080";


/**
 * Response example:
 * ```js
 * {
 *   "id": 1,
 *   "name": "Décembre 2025",
 *   "deadline": "2025-12-30T17:59:59.000+00:00",
 *   "goalPoints": 10000,
 *   "inscriptionCost": 1000
 * }
 * ```
*/
export async function fetchLatestCompetition() {
    const res = await fetch(`${API_URL}/competition/latest`);
    const text = await res.text();
    if (!text) return null;
    const competition = JSON.parse(text);
    return competition;
}

export async function fetchSuccess() {
    // [
    //   {
    //     "id": 1,
    //     "name": "Premier pas",
    //     "description": "Réaliser sa toute première action ecologique validée",
    //     "imageUrl": "http://82.66.240.161:8090/files/407e2005a16252e5c984438efea889af69ee73b88c0bc3588c903776a0e9798b.png"
    //   },
    //   {
    //     "id": 2,
    //     "name": "Série de feu",
    //     "description": "Réaliser au moins une action pendant 7 jours consécutifs",
    //     "imageUrl": "http://82.66.240.161:8090/files/files/7339a1ade4a5497f3cc1be5392c4d0a01687d41a239cf1b28054d1e998205373.png"
    //   }
    // ]
    const res = await fetch(`${API_URL}/competition/success`);
    const success = await res.json();

    const mappedSuccess = success.map((s) => ({
        id: s.id,
        Nom: s.name,
        Descripion: s.description,
        Img_url: s.imageUrl,
    }));

    return mappedSuccess;
}

/**
 * Response example:
 * ```js
 * [
 *   {
 *     "id": 1,
 *     "name": "Décembre 2025",
 *     "deadline": "2025-12-30T17:59:59.000+00:00",
 *     "goalPoints": 10000,
 *     "inscriptionCost": 1000
 *   }
 * ]
 * ```
*/
export async function fetchFollowingCompetitions() {
    const token = await AsyncStorage.getItem('@auth_token');
    const res = await fetch(`${API_URL}/competition/following`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const competitions = await res.json();
    return competitions;
}

export async function fetchCountOfParticipantsForCompetition(competition_id) {
    const res = await fetch(`${API_URL}/competition/${competition_id}/participantsCount`);
    const text = await res.text();

    if (!text) {
        return null;
    }

    const count = parseInt(text, 10);

    return Number.isNaN(count) ? null : count;
}

export async function fetchCountOfQualifiedParticipantsForCompetition(competition_id) {
    const res = await fetch(`${API_URL}/competition/${competition_id}/qualifiedParticipantsCount`);
    const text = await res.text();

    if (!text) {
        return null;
    }

    const count = parseInt(text, 10);

    return Number.isNaN(count) ? null : count;
}
