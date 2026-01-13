import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/API_URL";

/**
 * Example response
 * ```json
 * [
 *   {
 *     "id": 2,
 *     "user": {
 *       "id": 1,
 *       "pseudo": "feodot",
 *       "passwordHash": "$2a$10$QmGG5hda3mzB2v3ZzjViBO8P.691E5iBidtxnGyvfjyC0Qcdfqy0i",
 *       "email": "raevskijb@gmail.com",
 *       "phone": null,
 *       "photoProfileUrl": "http://82.66.240.161:8090/files/e6147c61a425a38eb159e7295dc6be40c57b591494d654baef0a510f16a36cd5.jpg",
 *       "profileBannerUrl": null,
 *       "dateCreation": "2025-12-30T12:53:21.925945Z",
 *       "dateModification": "2025-12-30T12:53:21.925945Z",
 *       "age": 20,
 *       "name": "Bohdan",
 *       "banned": false,
 *       "admin": false
 *     },
 *     "title": "Test title",
 *     "description": "Test descriprtion",
 *     "imageUrl": null,
 *     "receivedAt": "2026-01-01T01:00:00",
 *     "read": false,
 *   }
 * ]
 * ```
 */
export async function fetchNotifications(){
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/user/notifications`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}
