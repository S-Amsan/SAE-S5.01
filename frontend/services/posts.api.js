import { Platform } from "react-native";
import { apiFetch } from "./api";

/* ===========================
   FETCH ALL POSTS
=========================== */
export async function fetchAllPosts() {
    return apiFetch("/posts");
}

/* ===========================
   CREATE POST
=========================== */
export async function postPost(post) {
    const formData = new FormData();

    if (post.name) formData.append("name", post.name);
    if (post.description) formData.append("description", post.description);

    if (post.objectId !== null && post.objectId !== undefined) {
        formData.append("objectId", String(post.objectId));
    }

    if (!post.imageUrl) {
        throw new Error("Image manquante");
    }

    if (Platform.OS === "web") {
        const res = await fetch(post.imageUrl);
        const blob = await res.blob();
        formData.append("image", blob, "photo.jpg");
    } else {
        formData.append("image", {
            uri: post.imageUrl,
            name: "photo.jpg",
            type: "image/jpeg",
        });
    }

    return apiFetch("/post", {
        method: "POST",
        body: formData,
        headers: {
            // IMPORTANT : pas de Content-Type pour FormData
        },
    });
}

/* ===========================
   LIKE / DISLIKE
=========================== */
export async function likePost(postId) {
    return apiFetch(`/post/${postId}/like`, { method: "POST" });
}

export async function dislikePost(postId) {
    return apiFetch(`/post/${postId}/dislike`, { method: "POST" });
}

/* ===========================
   CHECK LIKE STATUS
=========================== */
export async function didILikePost(postId) {
    return apiFetch(`/post/${postId}/liked`);
}

export async function didIDislikePost(postId) {
    return apiFetch(`/post/${postId}/disliked`);
}

/* ===========================
   REPORT POST
=========================== */
export async function reportPost(postId, reason) {
    const formData = new FormData();
    formData.append("reason", reason);

    return apiFetch(`/post/${postId}/report`, {
        method: "POST",
        body: formData,
    });
}
