// Ranks.ts
// Définit la structure d'un palier de rang pour une meilleure typage
export interface RankPalier {
    id: number;
    name: string;
    division: string;
    requiredTrophies: number;
    imageUrl: string;
}

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

export const RANK_PALIERS: RankPalier[] = [];

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
export function getCurrentRank(userTrophies: number): RankPalier {
    // Parcourt le tableau à l'envers pour trouver rapidement le rang le plus haut atteint
    for (let i = RANK_PALIERS.length - 1; i >= 0; i--) {
        if (userTrophies >= RANK_PALIERS[i].requiredTrophies) {
            return RANK_PALIERS[i];
        }
    }
    // Devrait toujours retourner le Bronze III (0 trophée), mais par sécurité
    return RANK_PALIERS[0];
}

/**
 * Retourne l'URL de l'image de rang associée.
 * @param userTrophies Le nombre de trophées de l'utilisateur.
 * @returns Le chemin d'accès à l'image du rang.
 */
export function getRankImageUrl(userTrophies: number): string {
    return getCurrentRank(userTrophies).imageUrl;
}

/**
 * Retourne le rang complet (ex: "Bronze III").
 * @param userTrophies Le nombre de trophées de l'utilisateur.
 * @returns Le nom complet du rang.
 */
export function getFullRankName(userTrophies: number): string {
    const rank = getCurrentRank(userTrophies);
    return rank.division ? `${rank.name} ${rank.division}` : rank.name;
}

/**
 * Retourne le nombre minimum de trophées requis pour un ID de rang donné.
 * ID 1 = Bronze III, ID 4 = Argent III, etc.
 * @param rankId L'identifiant numérique du rang (commençant à 1).
 * @returns Le nombre de trophées requis, ou -1 si l'ID n'existe pas.
 */
export function getRequiredTrophiesByRankId(rankId: number): number {
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
export function getRequiredTrophiesByRankName(fullRankName: string): number {
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
