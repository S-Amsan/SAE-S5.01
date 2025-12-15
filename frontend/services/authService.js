import { saveToken, saveUser } from "./RegisterStorage";

const API_URL = "http://192.168.1.8:8080/api/auth"; //changer en localhost si besoin

export async function login(email, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Email ou mot de passe incorrect");
    }

    const data = await res.json();
    // { token, user }

    await saveToken(data.token);
    await saveUser(data.user);

    return data.user;
}
