import React, { useEffect } from "react";
import { Image, Text, StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function SplashScreen() {
    const logoTranslateY = useSharedValue(-200);
    const textTranslateY = useSharedValue(200);
    const opacity = useSharedValue(0);

    useEffect(() => {
        // Animation entrée
        logoTranslateY.value = withTiming(0, { duration: 1200 });
        textTranslateY.value = withTiming(0, { duration: 1200 });
        opacity.value = withTiming(1, { duration: 1200 });

        // Animation sortie + navigation
        const timeout = setTimeout(() => {
            logoTranslateY.value = withTiming(-200, { duration: 800 });
            textTranslateY.value = withTiming(200, { duration: 800 });
            opacity.value = withTiming(0, { duration: 800 }, () => {
                runOnJS(redirectAfterSplash)();
            });
        }, 1800);

        return () => clearTimeout(timeout);
    }, []);

    const redirectAfterSplash = async () => {
        const token = await AsyncStorage.getItem("@auth_token");

        if (token) {
            router.replace("/(app)/accueil");
        } else {
            router.replace("/(auth)/login");
        }
    };

    const logoStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: logoTranslateY.value }],
        opacity: opacity.value,
    }));

    const textStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: textTranslateY.value }],
        opacity: opacity.value,
    }));

    return (
        <LinearGradient colors={["#00DB83", "#0CD8A9"]} style={styles.container}>
            <Animated.View style={logoStyle}>
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>

            <Animated.View style={textStyle}>
                <Text style={styles.appName}>Ecoception</Text>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 250,
        height: 250,
    },
    appName: {
        color: "#fff",
        marginTop: 20,
        fontSize: 24,
        fontWeight: "bold",
    },
});
