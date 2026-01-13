import { apiFetch } from "./api";

/* ===========================
   LATEST EVENT
=========================== */
export async function fetchLatestEvent() {
    return apiFetch("/event/latest");
}

/* ===========================
   FOLLOWING EVENTS
=========================== */
export async function fetchFollowingEvents() {
    return apiFetch("/event/following");
}

/* ===========================
   PARTICIPANTS COUNT
=========================== */
export async function fetchCountOfParticipantsForEvent(eventId) {
    const count = await apiFetch(
        `/event/${eventId}/participantsCount`
    );

    return Number.isFinite(count) ? count : null;
}

/* ===========================
   QUALIFIED PARTICIPANTS COUNT
=========================== */
export async function fetchCountOfQualifiedParticipantsForEvent(eventId) {
    const count = await apiFetch(
        `/event/${eventId}/qualifiedParticipantsCount`
    );

    return Number.isFinite(count) ? count : null;
}
