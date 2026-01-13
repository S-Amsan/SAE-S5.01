import { apiFetch } from "./api";

/* ===========================
   USERS
=========================== */
export async function fetchUserByEmail(email) {
    const user = await apiFetch(`/user/email/${email}`);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    return user;
}

export async function fetchUserById(id) {
    return apiFetch(`/user/id/${id}`);
}

export async function fetchUsers() {
    return apiFetch("/user/all");
}

/* ===========================
   STATS
=========================== */
export async function fetchMyStats() {
    const data = await apiFetch("/user/stats/my");

    if (!data) return [];

    return [
        { type: "default", valeur: data.points },
        { type: "trophees", valeur: data.trophies },
        { type: "flammes", valeur: data.flames },
    ];
}

export async function fetchUserStats(userId) {
    if (!userId) {
        throw new Error("userId manquant pour fetchUserStats");
    }

    return apiFetch(`/user/stats/${userId}`);
}

/* ===========================
   POINTS
=========================== */
export async function fetchUserPointsForCompetition(competitionId) {
    const points = await apiFetch(
        `/user/points/competition/${competitionId}`
    );

    return Number.isFinite(points) ? points : null;
}

export async function fetchUserPointsForEvent(eventId) {
    const points = await apiFetch(
        `/user/points/event/${eventId}`
    );

    return Number.isFinite(points) ? points : null;
}

/* ===========================
   ACTIONS
=========================== */
export async function fetchMyActions() {
    return apiFetch("/user/actions/my");
}

export async function fetchUserActions(userId) {
    return apiFetch(`/user/actions/${userId}`);
}

/* ===========================
   SUCCESS
=========================== */
export async function fetchMySuccess() {
    return apiFetch("/user/success/my");
}

export async function fetchSuccessForUser(userId) {
    return apiFetch(`/user/success/${userId}`);
}
