import { Stack } from "expo-router";
import { PanierProvider } from "../../../context/PanierContext";

export default function Layout() {
    return (
        <PanierProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </PanierProvider>
    );
}
