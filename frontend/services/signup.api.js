import { Platform } from "react-native";
import { API_URL } from "../constants/API_URL";

export async function signupMultipart({
                                          pseudo,
                                          email,
                                          password,
                                          name,
                                          phone,
                                          age,
                                          photoUri,
                                      }) {
    const formData = new FormData();

    formData.append("pseudo", pseudo);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("phone", phone ?? "");
    formData.append("age", age ? String(age) : "");

    if (photoUri) {
        if (Platform.OS === "web") {
            const res = await fetch(photoUri);
            const blob = await res.blob();
            formData.append("avatarImage", blob, "avatar.jpg");
        } else {
            formData.append("avatarImage", {
                uri: photoUri,
                type: "image/jpeg",
                name: "avatar.jpg",
            });
        }
    }

    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        body: formData,
    });

    let data = null;
    try {
        data = await response.json();
    } catch {}

    if (!response.ok) {
        throw new Error(
            data?.message || "Erreur lors de l’inscription"
        );
    }

    return data;
}
