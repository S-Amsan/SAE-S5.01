import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/API_URL";

// Response example:
// [
//   {
//     "id": 2,
//     "email": "wangshihong2333@gmail.com",
//     "pseudo": "WSH2333",
//     "phone": "+33767187457",
//     "photoProfile": "http://82.66.240.161:8090/files/dc4aa0c94e24d4db16ee182d355e8ad27cfcf08a8cac282e932f66c19ed8d3fa.jpg",
//     "actif": true,
//     "name": "Wang Shihong"
//   }
// ]
export async function getFriends() {
    const token = await AsyncStorage.getItem('@auth_token');

    const res = await fetch(`${API_URL}/friends/my`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const friends = await res.json();
    return friends;
}

export async function sendFriendRequestTo(userId) {
    const token = await AsyncStorage.getItem('@auth_token');
    const formData = new FormData();

    formData.append("toUserId", userId);

    const res = await fetch(`${API_URL}/friends/requests`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
}

export async function rejectFriendRequest(requestId) {
    const token = await AsyncStorage.getItem('@auth_token');

    const res = await fetch(`${API_URL}/friends/requests/${requestId}/reject`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}

export async function fetchIncomingRequests(requestId) {
    const token = await AsyncStorage.getItem('@auth_token');

    const res = await fetch(`${API_URL}/friends/requests/${requestId}/cancel`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}

export async function fetchOutgoingRequests() {
    const token = await AsyncStorage.getItem('@auth_token');

    const res = await fetch(`${API_URL}/friends/requests/outgoing`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    const requests = await res.json();
    return requests;
}

export async function deleteFriend(userId) {
    const token = await AsyncStorage.getItem('@auth_token');

    const res = await fetch(`${API_URL}/friends/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}
