import { apiFetch } from "./api";

/**
 * Fetch user notifications
 */
export async function fetchNotifications() {
    return apiFetch("/user/notifications");
}
