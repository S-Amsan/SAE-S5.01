import { Platform } from "react-native";
import {IPv4} from "../constants/ip";

const API_URL =
    Platform.OS === "android"
        ? `http://${IPv4}:8080`
        : "http://localhost:8080";


export async function signupMultipart({
                                          pseudo,
                                          email,
                                          password,
                                          name,
                                          phone,
                                          age,
                                          photoUri
                                      }) {
    const formData = new FormData();

    formData.append("pseudo", pseudo);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("phone", phone ?? "");
    formData.append("age", age ? String(age) : "");

    if (Platform.OS === "web") {
        const blob = await fetch(photoUri).then(r => r.blob());
        formData.append("avatarImage", blob, "avatar.jpg");
    } else {
        formData.append("avatarImage", {
            uri: photoUri,
            type: "image/jpeg",
            name: "avatar.jpg"
        });
    }

    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        body: formData
    });

    let data = {};
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    }

    if (!response.ok) {
        throw data || new Error("Signup failed");
    }

    return data;
}
