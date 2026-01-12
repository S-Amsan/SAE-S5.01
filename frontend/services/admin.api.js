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

export async function publishCard(title, description, photoUrl, points, partnerId) {
    const token = await AsyncStorage.getItem("@auth_token");

    if (!token) {
        throw new Error("Utilisateur non authentifié");
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("points", points);

    if (partnerId) {
        formData.append("partnerId", partnerId);
    }


    if (Platform.OS === "web") {
        const response = await fetch(photoUrl);
        const blob = await response.blob();
        const file = new File([blob], "photo.png", { type: blob.type });
        formData.append("photo", file);
    } else {

        formData.append("photo", {
            uri: photoUrl,
            name: "photo.jpg",
            type: "image/jpeg",
        });
    }

    const response = await fetch(`${API_URL}/admin/card/publish`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erreur publication carte");
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
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

    formData.append("name", String(name ?? ""));
    formData.append("type", String(type ?? ""));

    if (!image) {
        throw new Error("Image manquante");
    }

    if (image instanceof File) {
        formData.append("image", image);
    } else if (typeof image === "string") {
        const res = await fetch(image);
        if (!res.ok) {
            throw new Error("Impossible de lire l'image sélectionnée");
        }
        const blob = await res.blob();
        formData.append("image", blob, "photo.jpg");
    } else {
        throw new Error("Format image invalide");
    }

    const response = await fetch(`${API_URL}/admin/partner/add`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `API error (${response.status})`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
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

export async function fetchDonations() {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/donation/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const data = await response.json();
    return data;
}

export async function publishDonation(
    slug,
    title,
    fullTitle,
    description,
    fullDescription,
    points,
    image,
    cardImage,
    bannerImage,
    partnerId
) {
    const token = await AsyncStorage.getItem("@auth_token");
    const formData = new FormData();

    formData.append("slug", String(slug ?? ""));
    formData.append("title", String(title ?? ""));
    formData.append("fullTitle", String(fullTitle ?? ""));
    formData.append("description", String(description ?? ""));
    formData.append("fullDescription", String(fullDescription ?? ""));
    formData.append("points", String(points ?? 0));
    formData.append("partnerId", String(partnerId ?? ""));

    const appendImage = async (key, value) => {
        if (!value) throw new Error(`Image manquante: ${key}`);

        if (value instanceof File) {
            formData.append(key, value);
            return;
        }

        if (typeof value === "string") {
            const res = await fetch(value);
            if (!res.ok) throw new Error(`Impossible de lire l'image: ${key}`);
            const blob = await res.blob();
            formData.append(key, blob, `${key}.jpg`);
            return;
        }

        throw new Error(`Format image invalide: ${key}`);
    };

    await appendImage("image", image);
    await appendImage("cardImage", cardImage);
    await appendImage("bannerImage", bannerImage);

    const response = await fetch(`${API_URL}/admin/donation`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const text = await response.text();

    if (!response.ok) {
        throw new Error(text || `API error (${response.status})`);
    }

    return text ? JSON.parse(text) : null;
}

export async function publishCompetition(
    name,
    deadline,
    goalPoints,
    inscriptionCost
) {
    const token = await AsyncStorage.getItem("@auth_token");
    const formData = new FormData();

    formData.append("name", name);
    formData.append("deadline", deadline);
    formData.append("goalPoints", goalPoints);
    formData.append("inscriptionCost", inscriptionCost);

    const response = await fetch(`${API_URL}/admin/competition`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    const data = await response.json();
    return data;
}

export async function deleteCompetition(id) {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await fetch(`${API_URL}/admin/competition/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}
