import { apiFetch } from "./api";

/* ===========================
   BUY ITEM
=========================== */
export async function buy(purchaseId) {
    return apiFetch(`/store/buy/${purchaseId}`, {
        method: "POST",
    });
}
