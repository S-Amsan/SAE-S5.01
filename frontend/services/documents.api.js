import { Platform } from "react-native";
import { apiFetch } from "./api";

/* ===========================
   UPLOAD DOCUMENT
=========================== */
export async function uploadDocument(cardId, file) {
    const formData = new FormData();

    formData.append("cardId", String(cardId));

    if (Platform.OS === "web") {
        formData.append("file", file);
    } else {
        formData.append("file", {
            uri: file.uri,
            name: file.name ?? "document.jpg",
            type: file.type ?? "image/jpeg",
        });
    }

    return apiFetch("/document/upload", {
        method: "POST",
        body: formData,
        // ⚠️ pas de Content-Type pour FormData
    });
}

/* ===========================
   FETCH ALL DOCUMENTS
=========================== */
export async function fetchAllDocuments() {
    return apiFetch("/document/all");
}
