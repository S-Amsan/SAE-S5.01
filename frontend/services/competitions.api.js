import { apiFetch } from "./api";

/* ===========================
   LATEST COMPETITION
=========================== */
export async function fetchLatestCompetition() {
    return apiFetch("/competition/latest");
}

/* ===========================
   SUCCESS TYPES
=========================== */
export async function fetchSuccess() {
    const success = await apiFetch("/competition/success_types");

    return success.map((s) => ({
        id: s.id,
        Nom: s.name,
        Descripion: s.description,
        Img_url: s.imageUrl,
    }));
}

/* ===========================
   FOLLOWING COMPETITIONS
=========================== */
export async function fetchFollowingCompetitions() {
    return apiFetch("/competition/following");
}

/* ===========================
   PARTICIPANTS COUNT
=========================== */
export async function fetchCountOfParticipantsForCompetition(competitionId) {
    const count = await apiFetch(
        `/competition/${competitionId}/participantsCount`
    );

    return Number.isFinite(count) ? count : null;
}

/* ===========================
   QUALIFIED PARTICIPANTS COUNT
=========================== */
export async function fetchCountOfQualifiedParticipantsForCompetition(
    competitionId
) {
    const count = await apiFetch(
        `/competition/${competitionId}/qualifiedParticipantsCount`
    );

    return Number.isFinite(count) ? count : null;
}
