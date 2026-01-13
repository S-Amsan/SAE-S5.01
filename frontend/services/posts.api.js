import {Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/API_URL";

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

    if (post.name) {
        formData.append("name", post.name);
    }

    if (post.description) {
        formData.append("description", post.description);
    }


    if (post.objectId !== undefined && post.objectId !== null) {
        formData.append("objectId", String(post.objectId));
    }

    if (!post.imageUrl) {
        throw new Error("Image manquante");
    }

    if (Platform.OS === "web") {
        const blob = await fetch(post.imageUrl).then(r => r.blob());
        formData.append("image", blob, "photo.jpg");
    } else {
        formData.append("image", {
            uri: post.imageUrl,
            name: "photo.jpg",
            type: "image/jpeg",
        });
    }

    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/post`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "API error");
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;

}


export async function likePost(postId) {
    const token = await AsyncStorage.getItem('@auth_token');

    await fetch(`${API_URL}/post/${postId}/like`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export async function dislikePost(postId) {
    const token = await AsyncStorage.getItem('@auth_token');

    await fetch(`${API_URL}/post/${postId}/dislike`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export async function didILikePost(postId) {
    const token = await AsyncStorage.getItem('@auth_token');

    const response = await fetch(`${API_URL}/post/${postId}/liked`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return await response.json();
}

export async function didIDislikePost(postId) {
    const token = await AsyncStorage.getItem('@auth_token');

    const response = await fetch(`${API_URL}/post/${postId}/disliked`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return await response.json();
}

export async function reportPost(postId, reason) {
    const token = await AsyncStorage.getItem('@auth_token');

    const formData = new FormData();

    formData.append('reason', reason);

    const response = await fetch(`${API_URL}/post/${postId}/report`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    return await response.json();

}
