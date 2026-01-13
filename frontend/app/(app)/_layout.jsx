import { Stack } from "expo-router";
import { PanierProvider } from "../../context/PanierContext";

export default function AppLayout() {
    return (
        <PanierProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="accueil" />
                <Stack.Screen name="missions" />
                <Stack.Screen name="social" />
                <Stack.Screen name="boutique" />
                <Stack.Screen name="codebar" />
                <Stack.Screen name="notifications" />
                <Stack.Screen name="parametres" />
            </Stack>
        </PanierProvider>
    );
}

