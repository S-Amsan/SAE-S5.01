import React, { useState } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import style from "./styles/homeStyles";


export default function Home(){
    const navigation = useNavigation();
    const [buttonScale] = useState(new Animated.Value(1));

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleSignup = () => {
        navigation.navigate('SignUp');
    };

    const handlePolicy = () => {
        console.log('Politique de confidentialité');
    };

    const animatePress = (callback) => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();

        setTimeout(callback, 150);
    };

    return(
        <LinearGradient
            colors={['#00DB83', '#0CD8A9']}
            style={style.gradient}
        >
                <View style={style.container}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={style.logo}
                            resizeMode="contain"
                        />
                    {/* Texte principal */}
                    <View style={style.textContainer}>
                        <Text style={style.title}>
                            Ecoception
                        </Text>
                        <Text style={style.slogan}>
                            Jouer, participer, agir pour notre planète
                        </Text>
                        <Text style={style.slogan}>
                            Rejoins-nous !
                        </Text>
                    </View>

                    {/* Carte d'actions */}
                    <View style={style.actionCard}>
                        <Animated.View style={{ transform: [{ scale: buttonScale }], width: '100%' }}>
                            <TouchableOpacity
                                style={style.primaryButton}
                                onPress={() => animatePress(handleSignup)}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={['#00DB83', '#0CD8A9']}
                                    style={style.gradientButton}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <View style={style.buttonContent}>
                                        <Ionicons name="rocket-outline" size={24} color="white" />
                                        <Text style={style.primaryButtonText}>
                                            Commencer l&#39;aventure
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Bouton secondaire */}
                        <TouchableOpacity
                            style={style.secondaryButton}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <View style={style.secondaryButtonInner}>
                                <Text style={style.secondaryButtonText}>
                                    Connexion
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Séparateur */}
                        <View style={style.separator}>
                            <View style={style.separatorLine} />
                            <Text style={style.separatorText}>Informations</Text>
                            <View style={style.separatorLine} />
                        </View>

                        {/* Lien politique */}
                        <TouchableOpacity
                            style={style.policyButton}
                            onPress={handlePolicy}
                        >
                            <View style={style.policyContent}>
                                <Ionicons name="shield-checkmark-outline" size={16} color="#1D3937" />
                                <Text style={style.policyText}>
                                    Politique de confidentialité et conditions d&#39;utilisation
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Badge éco-friendly */}
                        <View style={style.ecoBadge}>
                            <Ionicons name="leaf-outline" size={14} color="#00DB83" />
                            <Text style={style.ecoBadgeText}>Application éco-responsable</Text>
                        </View>
                    </View>
                </View>
        </LinearGradient>
    );
};