import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@register_data";

export async function saveRegisterData(data) {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Erreur sauvegarde AsyncStorage:", e);
    }
}

export async function loadRegisterData() {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : null;
    } catch (e) {
        console.error("Erreur chargement AsyncStorage:", e);
        return null;
    }
}

export async function clearRegisterData() {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error("Erreur suppression AsyncStorage:", e);
    }
}
