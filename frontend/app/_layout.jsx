import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { NotificationProvider } from "./(app)/notifications/NotificationContext";
import NotificationDrawer from "./(app)/notifications/NotificationDrawer";

export default function RootLayout() {
    return (
        <NotificationProvider>
            <Stack screenOptions={{ headerShown: false }}>
            </Stack>

            <NotificationDrawer />
            <Toast />
        </NotificationProvider>
    );
}
