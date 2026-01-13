import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUser } from "./RegisterStorage";
import { fetchUserByEmail } from "./user.api";
import { API_URL } from "../constants/API_URL";



export async function login(email, password) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: formData
    });

    if (!res.ok) {
        let message = "Erreur de connexion";

        try {
            const error = await res.json();
            if (error?.message) {
                message = error.message.replace("Authentication error: ", "");
            }
        } catch (_) {
        }

        throw new Error(message);
    }


    const responseData = await res.json();
    const token = responseData.token;

    await AsyncStorage.setItem("@auth_token", token);
    await AsyncStorage.setItem("@auth_email", email);

    const user = await fetchUserByEmail(email);
    await saveUser(user);

    return user;
}

