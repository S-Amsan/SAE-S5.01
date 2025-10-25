import React, { useEffect } from 'react';
import {Image, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
    const logoTranslateY = useSharedValue(-200);
    const textTranslateY = useSharedValue(200);
    const opacity = useSharedValue(0);

    useEffect(() => {
        logoTranslateY.value = withTiming(0, { duration: 1500 });
        textTranslateY.value = withTiming(0, { duration: 1500 });
        opacity.value = withTiming(1, { duration: 1500 });

        setTimeout(() => {
            logoTranslateY.value = withTiming(-200, { duration: 1500 });
            textTranslateY.value = withTiming(200, { duration: 1500 });
            opacity.value = withTiming(0, { duration: 1500 });
        }, 2000);
    }, []);

    const logoStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: logoTranslateY.value }],
        opacity: opacity.value,
    }));

    const textStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: textTranslateY.value }],
        opacity: opacity.value,
    }));

    return (
        <LinearGradient
            colors={['#00DB83', '#0CD8A9']}
            style={styles.container}
        >
            <Animated.View style={logoStyle}>
                <Image
                    source={require('../assets/logo.png')}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250,
    },
    appName: {
        color: '#fff',
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
});
