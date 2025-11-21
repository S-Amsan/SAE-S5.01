import { useEffect } from "react";
import { useRouter } from "expo-router";
import SplashScreen from "../pages/SplashScreen";

export default function Splash() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/home");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return <SplashScreen />;
}
