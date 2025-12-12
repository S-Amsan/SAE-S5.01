import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="splash" />
                <Stack.Screen name="Login" />
                <Stack.Screen name="SignUp"/>
                <Stack.Screen name="home" />
                <Stack.Screen name="parrainage"/>
                <Stack.Screen name="age"/>
                <Stack.Screen name="photo"/>
            </Stack>

            <Toast />
        </>
    );
}
