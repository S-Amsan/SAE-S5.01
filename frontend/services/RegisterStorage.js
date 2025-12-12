import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@register_data";

/**
 * Charge toutes les données stockées
 */
export async function loadRegisterData() {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed = json ? JSON.parse(json) : null;
        console.log("📦 [AsyncStorage] Données chargées :", parsed);
        return parsed;
    } catch (e) {
        console.error("❌ [AsyncStorage] Erreur chargement :", e);
        return null;
    }
}

/**
 * Écrase complètement les données (rarement utilisé)
 */
export async function saveRegisterData(data) {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log("📦 [AsyncStorage] Données sauvegardées (overwrite) :", data);
    } catch (e) {
        console.error("❌ [AsyncStorage] Erreur sauvegarde :", e);
    }
}

/**
 * Met à jour les données existantes sans rien écraser
 */
export async function updateRegisterData(newValues) {
    try {
        const current = await loadRegisterData() || {};
        const updated = { ...current, ...newValues };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        console.log("📦 [AsyncStorage] Données mises à jour (merge) :", updated);
        return updated;
    } catch (e) {
        console.error("❌ [AsyncStorage] Erreur mise à jour :", e);
        return null;
    }
}

/**
 * Supprime complètement les données
 */
export async function clearRegisterData() {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        console.log("📦 [AsyncStorage] Données supprimées");
    } catch (e) {
        console.error("❌ [AsyncStorage] Erreur suppression :", e);
    }
}

const USER_KEY = "@user_data";

export async function saveUser(data) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
}

export async function loadUser() {
    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
}

export async function clearUser() {
    await AsyncStorage.removeItem(USER_KEY);
}

