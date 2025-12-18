// Ranks, pour le classement
// Import des images de chaque rang
import bronzeIII from '../assets/icones/rank/Bronze III.png'
import bronzeII from '../assets/icones/rank/Bronze II.png'
import bronzeI from '../assets/icones/rank/Bronze I.png'
import argentIII from '../assets/icones/rank/Argent III.png'
import argentII from '../assets/icones/rank/Argent II.png'
import argentI from '../assets/icones/rank/Argent I.png'
import orIII from '../assets/icones/rank/Or III.png'
import orII from '../assets/icones/rank/Or II.png'
import orI from '../assets/icones/rank/Or I.png'
import platineIII from '../assets/icones/rank/Platine III.png'
import platineII from '../assets/icones/rank/Platine II.png'
import platineI from '../assets/icones/rank/Platine I.png'
import diamantIII from '../assets/icones/rank/Diamant III.png'
import diamantII from '../assets/icones/rank/Diamant II.png'
import diamantI from '../assets/icones/rank/Diamant I.png'
import maitreIII from '../assets/icones/rank/Maitre III.png'
import maitreII from '../assets/icones/rank/Maitre II.png'
import maitreI from '../assets/icones/rank/Maitre I.png'
import elite from '../assets/icones/rank/Elite.png'


const IMAGE_BY_FULL_RANK = {
    "Bronze III": bronzeIII,
    "Bronze II": bronzeII,
    "Bronze I": bronzeI,
    "Argent III": argentIII,
    "Argent II": argentII,
    "Argent I": argentI,
    "Or III": orIII,
    "Or II": orII,
    "Or I": orI,
    "Platine III": platineIII,
    "Platine II": platineII,
    "Platine I": platineI,
    "Diamant III": diamantIII,
    "Diamant II": diamantII,
    "Diamant I": diamantI,
    "Maitre III": maitreIII,
    "Maitre II": maitreII,
    "Maitre I": maitreI,
    "Elite": elite,
};

// Les rangs de base de l'application (sans divisions)
const BASE_RANKS = [
    "Bronze",
    "Argent",
    "Or",
    "Platine",
    "Diamant",
    "Maitre",
    "Elite",
];

// Les divisions (dans l'ordre croissant)
const DIVISIONS = ["III", "II", "I"];

// Le seuil de trophées par palier (5000)
const TROPHIES_PER_STEP = 5000;

export const RANG_MINIMUM_EVENEMENT = "Or III";

let currentTrophies = 0;
let rankId = 1;

export const RANK_PALIERS = [];

// Génération des rangs avec divisions (Bronze à Maître)
for (const rankName of BASE_RANKS.slice(0, -1)) { // Exclut 'Élite'
    for (const division of DIVISIONS) {
        RANK_PALIERS.push({
            id: rankId++,
            name: rankName,
            division: division,
            requiredTrophies: currentTrophies,
            imageUrl: `../assets/icones/rank/${rankName}.png`, // Utilise le nom principal
        });
        currentTrophies += TROPHIES_PER_STEP;
    }
}

// Ajout du rang Élite (sans division)
RANK_PALIERS.push({
    id: rankId++,
    name: "Élite",
    division: "", // Pas de division pour Elite
    requiredTrophies: currentTrophies,
    imageUrl: `../assets/icones/rank/elite.png`,
});


// --- Fonctions utilitaires ---

/**
 * Retourne le palier de rang actuel de l'utilisateur.
 * @param userTrophies Le nombre de trophées de l'utilisateur (issu du serveur).
 * @returns Le palier de rang le plus élevé atteint.
 */
export function getCurrentRank(userTrophies) {
    // Parcourt le tableau à l'envers pour trouver rapidement le rang le plus haut atteint
    for (let i = RANK_PALIERS.length - 1; i >= 0; i--) {
        if (userTrophies >= RANK_PALIERS[i].requiredTrophies) {
            return RANK_PALIERS[i];
        }
    }
    return RANK_PALIERS[0];
}

/**
 * Retourne l'URL de l'image de rang associée.
 * @param userTrophies Le nombre de trophées de l'utilisateur.
 * @returns Le chemin d'accès à l'image du rang.
 */
export function getRankImageUrl(userTrophies) {
    const fullRankName = getFullRankName(userTrophies);
    return IMAGE_BY_FULL_RANK[fullRankName] || elite;}

/**
 * Retourne le rang complet (ex: "Bronze III").
 * @param userTrophies Le nombre de trophées de l'utilisateur.
 * @returns Le nom complet du rang.
 */
export function getFullRankName(userTrophies) {
    const rank = getCurrentRank(userTrophies);
    return rank.division ? `${rank.name} ${rank.division}` : rank.name;
}

/**
 * Retourne le nombre minimum de trophées requis pour un ID de rang donné.
 * ID 1 = Bronze III, ID 4 = Argent III, etc.
 * @param rankId L'identifiant numérique du rang (commençant à 1).
 * @returns Le nombre de trophées requis, ou -1 si l'ID n'existe pas.
 */
export function getRequiredTrophiesByRankId(rankId) {
    const index = rankId - 1;

    if (index >= 0 && index < RANK_PALIERS.length) {
        return RANK_PALIERS[index].requiredTrophies;
    }

    // Si l'ID est invalide ou hors des limites du tableau.
    console.error(`ID de rang invalide : ${rankId}`);
    return -1;
}

/**
 * Retourne le nombre minimum de trophées requis pour un rang donné.
 * @param fullRankName Le nom complet du rang (ex: "Or III", "Élite").
 * @returns Le nombre de trophées requis, ou -1 si le rang n'existe pas.
 */
export function getRequiredTrophiesByRankName(fullRankName) {
    const normalizedInput = fullRankName.trim().toLowerCase();

    const foundRank = RANK_PALIERS.find(rank => {
        // Construction du nom complet du rang pour la comparaison
        const rankFullName = rank.division
            ? `${rank.name} ${rank.division}`
            : rank.name;

        return rankFullName.toLowerCase() === normalizedInput;
    });

    if (foundRank) {
        return foundRank.requiredTrophies;
    }

    // Si le rang n'est pas trouvé
    console.error(`Nom de rang invalide : ${fullRankName}`);
    return -1;
}
