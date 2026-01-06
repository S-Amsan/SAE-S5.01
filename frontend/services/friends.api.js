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
