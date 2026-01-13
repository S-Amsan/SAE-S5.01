import { API_URL } from "../constants/API_URL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Platform} from "react-native";

/**
 * Example response
 * ```json
 * [
 *   {
 *     "id": 1,
 *     "post": {
 *       "id": 14,
 *       "name": "S.PELLEGRINO",
 *       "description": "A recyclé un produit de : San Pellegrino, Nestlé",
 *       "imageUrl": "http://82.66.240.161:8090/files/2a3483fcd2f4092718ac061e2c4b7739d5b79afab95ea1b7a56810ffd61419bd.jpg",
 *       "createdAt": "2026-01-09T13:08:27",
 *       "validated": null,
 *       "object_id": null,
 *       "user_id": 4
 *     },
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
 *     "reason": "Test",
 *     "checked": false,
 *     "createdAt": "2026-01-09T01:00:00"
 *   }
 * ]
```
*/
export async function fetchAllReports() {
    const response = await fetch(`${API_URL}/report/all`);
    return response.json();
}


export async function reportPost(postId, reason) {
    const token = await AsyncStorage.getItem("@auth_token");

    console.log("REPORT POST", { postId, reason, token });

    const response = await fetch(`${API_URL}/report/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erreur signalement");
    }

    return true;
}



