import {Platform} from "react-native";

const API_URL =
    Platform.OS === "android" ? "http://192.168.1.146:8080" : "http://localhost:8080";

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
    const res = await fetch(`${API_URL}/user/${email}`);
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
