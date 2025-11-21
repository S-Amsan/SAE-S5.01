import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splash" />
            <Stack.Screen name="Login" />
            <Stack.Screen name="SignUp"/>
            <Stack.Screen name="home" />
        </Stack>
    );
}
