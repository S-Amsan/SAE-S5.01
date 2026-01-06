import AsyncStorage from "@react-native-async-storage/async-storage";
import {IPv4} from "../constants/ip";

<<<<<<< Updated upstream
const API_URL =
    Platform.OS === "android"
        ? `http://${IPv4}:8080`
        : "http://localhost:8080";

=======
import { API_URL } from "../constants/API_URL";
>>>>>>> Stashed changes

/**
 * Response example:
 * ```js
 * {
 * "id": 1,
 * "pseudo": "feodot",
 * "passwordHash": "$2a$10$QmGG5hda3mzB2v3ZzjViBO8P.691E5iBidtxnGyvfjyC0Qcdfqy0i",
 * "email": "raevskijb@gmail.com",
 * "phone": null,
 * "photoProfileUrl": "http://82.66.240.161:8090/files/e6147c61a425a38eb159e7295dc6be40c57b591494d654baef0a510f16a36cd5.jpg",
 * "dateCreation": "2025-12-30T12:53:21.925945Z",
 * "dateModification": "2025-12-30T12:53:21.925945Z",
 * "actif": true,
 * "age": 20,
 * "name": "Bohdan"
 * }
 * ```
 */
export async function fetchUserByEmail(email) {
    const res = await fetch(`${API_URL}/user/email/${email}`);
    const user = await res.json();

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    return user;
}

export async function fetchUserById(id) {
    const res = await fetch(`${API_URL}/user/id/${id}`);
    const user = await res.json();

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    return user;
}

export async function fetchUsers() {
    const res = await fetch(`${API_URL}/user/all`);
    const users = await res.json();

    return users;
}

export async function fetchUserStats() {
    const token = await AsyncStorage.getItem('@auth_token');

    // Response example:
    // {
    //   "points": 35,
    //   "trophies": 69,
    //   "flames": 34
    // }
    const res = await fetch(`${API_URL}/user/stats`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const stats = await res.json();

    return [
        {type: "points", valeur: stats.points},
        {type: "trophees", valeur: stats.trophies},
        {type: "flammes", valeur: stats.flames},
    ];
}

export async function fetchUserPointsForCompetition(competitionId) {
    const token = await AsyncStorage.getItem('@auth_token');
    const res = await fetch(`${API_URL}/user/points/competition/${competitionId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const text = await res.text();

    if (!text) {
        return null;
    }

    const points = parseInt(text, 10);

    return Number.isNaN(points) ? null : points;
}

export async function fetchUserPointsForEvent(eventId) {
    const token = await AsyncStorage.getItem('@auth_token');
    const res = await fetch(`${API_URL}/user/points/event/${eventId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const text = await res.text();

    if (!text) {
        return null;
    }

    const points = parseInt(text, 10);

    return Number.isNaN(points) ? null : points;
}
