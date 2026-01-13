import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { NotificationProvider } from "./appPrincipal/notifications/NotificationContext";
import NotificationDrawer from "./appPrincipal/notifications/NotificationDrawer";

export default function RootLayout() {
    return (
        <NotificationProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name="splash" />
                <Stack.Screen name="Login" />
                <Stack.Screen name="SignUp" />
                <Stack.Screen name="home" />
                <Stack.Screen name="parrainage" />
                <Stack.Screen name="age" />
                <Stack.Screen name="photo" />
            </Stack>


            <NotificationDrawer />

            <Toast />
        </NotificationProvider>
    );
}
