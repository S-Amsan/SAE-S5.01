import AsyncStorage from "@react-native-async-storage/async-storage";
import {Platform} from "react-native";
import {API_URL} from "../constants/API_URL";

export async function checkReport(reportId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/check_report/${reportId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function invalidatePost(postId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/invalidate_post/${postId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function banUser(userId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/ban/${userId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function unbanUser(userId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/unban/${userId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function validateDocument(documentId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/document/${documentId}/validate`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function invalidateDocument(documentId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/document/${documentId}/invalidate`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export async function publishCard(title, description, photo, trophies) {
    const token = await AsyncStorage.getItem("@auth_token");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("trophies", trophies);

    if (Platform.OS === "web") {
        formData.append("photo", photo); // File natif
    } else {
        formData.append("photo", {
            uri: photo.uri,
            name: photo.name ?? "document.jpg",
            type: photo.type ?? "image/jpeg",
        });
    }

    const response = await fetch(`${API_URL}/admin/card`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    const data = await response.json();
    return data;
}

export async function deleteCard(cardId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/card/${cardId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const data = await response.json();
    return data;
}

export async function addPartner(name, type, image) {
    const token = await AsyncStorage.getItem("@auth_token");
    const formData = new FormData();

    formData.append("name", name);
    formData.append("type", type);
    if (Platform.OS === "web") {
        formData.append("image", image); // File natif
    } else {
        formData.append("image", {
            uri: image.uri,
            name: image.name ?? "document.jpg",
            type: image.type ?? "image/jpeg",
        });
    }

    const response = await fetch(`${API_URL}/admin/partner/add`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    const data = await response.json();
    return data;
}

export async function getAllPartners() {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/partner/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const data = await response.json();
    return data;
}

export async function deletePartner(partnerId) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/partner/${partnerId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const data = await response.json();
    return data;
}
