import { Platform } from "react-native";
import { apiFetch } from "./api";

/* ===========================
   CREATE OBJECT
=========================== */
export async function postObject({ title, description, address, imageUrl }) {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);

    if (Platform.OS === "web") {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        formData.append("image", blob, "photo.jpg");
    } else {
        if (!imageUrl.startsWith("file://")) {
            throw new Error("imageUrl mobile invalide");
        }

        formData.append("image", {
            uri: imageUrl,
            name: "photo.jpg",
            type: "image/jpeg",
        });
    }

    return apiFetch("/object/post", {
        method: "POST",
        body: formData,
    });
}

/* ===========================
   GET ALL OBJECTS
=========================== */
export async function getAllObjects() {
    const data = await apiFetch("/object/all");
    return Array.isArray(data) ? data : [];
}

/* ===========================
   PICKUP OBJECT
=========================== */
export async function pickupObject(objectId) {
    return apiFetch(`/object/pickup/${objectId}`, {
        method: "POST",
    });
}

/* ===========================
   FETCH OBJECT BY ID
=========================== */
export async function fetchObjectById(objectId) {
    return apiFetch(`/object/id/${objectId}`);
}
