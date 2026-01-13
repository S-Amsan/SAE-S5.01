import { apiFetch } from "./api";

export async function fetchAllCards() {
    return apiFetch("/cards");
}
