import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from "../constants/API_URL";
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
export async function fetchLatestEvent() {
    const res = await fetch(`${API_URL}/event/latest`);
    const text = await res.text();
    if (!text) return null;
    const event = JSON.parse(text);
    return event;
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
export async function fetchFollowingEvents() {
    const token = await AsyncStorage.getItem('@auth_token');
    const res = await fetch(`${API_URL}/event/following`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const events = await res.json();
    return events;
}

export async function fetchCountOfParticipantsForEvent(event_id) {
    const res = await fetch(`${API_URL}/event/${event_id}/participantsCount`);
    const text = await res.text();

    if (!text) {
        return null;
    }

    const count = parseInt(text, 10);

    return Number.isNaN(count) ? null : count;
}

export async function fetchCountOfQualifiedParticipantsForEvent(event_id) {
    const res = await fetch(`${API_URL}/event/${event_id}/qualifiedParticipantsCount`);
    const text = await res.text();

    if (!text) {
        return null;
    }

    const count = parseInt(text, 10);

    return Number.isNaN(count) ? null : count;
}
