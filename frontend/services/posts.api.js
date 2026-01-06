import {Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IPv4} from "../constants/ip";

const API_URL =
    Platform.OS === "android"
        ? `http://${IPv4}:8080`
        : "http://localhost:8080";


/** Response example
 * ```json
 * [
 *   {
 *     "id": 2,
 *     "name": "Test post",
 *     "description": "Test description",
 *     "address": "Test address",
 *     "imageUrl": "http://82.66.240.161:8090/files/abf24cb4cb7bb1cde11769b75196f111a38644d64d41c1dc84197708ed7ad6c0.png",
 *     "createdAt": "2026-01-05T22:17:57.986488",
 *     "user_id": 1
 *   }
 * ]
 * ```
*/
export async function fetchAllPosts() {
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    return data;
}

/**
 * Example response:
 * ```json
 * {
 *   "id": 3,
 *   "name": "Test post",
 *   "description": "Test description",
 *   "address": "Test address",
 *   "imageUrl": "http://82.66.240.161:8090/files/abf24cb4cb7bb1cde11769b75196f111a38644d64d41c1dc84197708ed7ad6c0.png",
 *   "createdAt": "2026-01-05T23:44:43.305624",
 *   "user_id": 1
 * }
 * ```
 */
export async function postPost(post) {
    const formData = new FormData();

    formData.append("name", post.name);
    formData.append("address", post.address);
    formData.append("description", post.description);
    if (Platform.OS === "web") {
        const blob = await fetch(post.imageUrl).then(r => r.blob());
        formData.append("image", blob, undefined);
    } else {
        formData.append("image", {
            uri: post.imageUrl,
        });
    }

    const token = await AsyncStorage.getItem('@auth_token');

    const response = await fetch(`${API_URL}/post`, {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return await response.json();
}
