import { apiFetch } from "./api";

/* ===========================
   GET MY FRIENDS
=========================== */
export async function getFriends() {
    return apiFetch("/friends/my");
}

/* ===========================
   SEND FRIEND REQUEST
=========================== */
export async function sendFriendRequestTo(userId) {
    const formData = new FormData();
    formData.append("toUserId", String(userId));

    return apiFetch("/friends/requests", {
        method: "POST",
        body: formData,
    });
}

/* ===========================
   REJECT FRIEND REQUEST
=========================== */
export async function rejectFriendRequest(requestId) {
    return apiFetch(`/friends/requests/${requestId}/reject`, {
        method: "POST",
    });
}

/* ===========================
   CANCEL INCOMING REQUEST
   (nom conservé pour ne rien casser)
=========================== */
export async function fetchIncomingRequests(requestId) {
    return apiFetch(`/friends/requests/${requestId}/cancel`, {
        method: "POST",
    });
}

/* ===========================
   FETCH OUTGOING REQUESTS
=========================== */
export async function fetchOutgoingRequests() {
    return apiFetch("/friends/requests/outgoing");
}

/* ===========================
   DELETE FRIEND
=========================== */
export async function deleteFriend(userId) {
    return apiFetch(`/friends/${userId}`, {
        method: "DELETE",
    });
}
