import { apiFetch } from "./api";

/* ===========================
   FETCH ALL REPORTS
=========================== */
export async function fetchAllReports() {
    return apiFetch("/report/all");
}

/* ===========================
   REPORT POST
=========================== */
export async function reportPost(postId, reason) {
    return apiFetch(`/report/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
    });
}
