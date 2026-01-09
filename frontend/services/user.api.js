import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/API_URL";


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

export async function fetchMyStats() {
    const token = await AsyncStorage.getItem('@auth_token');

    const res = await fetch(`${API_URL}/user/stats/my`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    const text = await res.text();
    if (!text) return [];

    const data = JSON.parse(text);

    return [
        { type: "default", valeur: data.points },
        { type: "trophees", valeur: data.trophies },
        { type: "flammes", valeur: data.flames },
    ];
}


export async function fetchUserStats(userId) {
    const res = await fetch(`${API_URL}/user/stats/${userId}`);

    const stats = await res.json();
    return stats;
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

/**
 * Response example:
 * ```json
 * [
 *   {
 *     "id": 1,
 *     "acquiredAt": "2026-01-07",
 *     "description": "voté 5 posts",
 *     "user_id": 3,
 *     "image_url": "http://82.66.240.161:8090/files/0ae4130a1bc9191dfceb17b7e485196944b10aa084b05d181095688813580331.png"
 *   }
 * ]
 * ```
*/
export async function fetchActions() {
    const token = await AsyncStorage.getItem('@auth_token');
    const res = await fetch(`${API_URL}/user/actions`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const actions = await res.json();
    return actions;
}
