import { API_URL } from "../constants/API_URL";

export async function fetchAllReports() {
    const response = await fetch(`${API_URL}/report/all`);
    return response.json();
}
