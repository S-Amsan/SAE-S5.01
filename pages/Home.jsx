import React, { useState } from 'react';
import {
    Image,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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
            <ScrollView
                contentContainerStyle={style.scrollContainer}
                showsVerticalScrollIndicator={false}
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
                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
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
                            <View style={style.secondaryButtonContent}>
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
            </ScrollView>
        </LinearGradient>
    );
};

const style = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: height - 40,
    },
    logo: {
        width: 200,
        height: 200,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 42,
        fontWeight: "bold",
        color: 'white',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    slogan: {
        fontStyle: 'italic',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 22,
        opacity: 0.9,
    },
    actionCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: width * 0.35,
        paddingVertical: 35,
        paddingHorizontal: 25,
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    primaryButton: {
        borderRadius: 25,
        marginBottom: 15,
        overflow: 'hidden',
        shadowColor: '#00DB83',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    gradientButton: {
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 25,
        minWidth: 280,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    secondaryButton: {
        borderWidth: 2,
        borderColor: '#00DB83',
        borderRadius: 25,
        paddingVertical: 16,
        paddingHorizontal: 30,
        minWidth: 280,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    secondaryButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        color: '#00DB83',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        width: '100%',
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E9ECEF',
    },
    separatorText: {
        color: '#666',
        fontSize: 12,
        fontWeight: '600',
        marginHorizontal: 10,
        fontStyle: 'italic',
    },
    policyButton: {
        marginBottom: 15,
        padding: 10,
    },
    policyContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    policyText: {
        color: '#1D3937',
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'center',
        marginLeft: 6,
        textDecorationLine: 'underline',
    },
    ecoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 219, 131, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(0, 219, 131, 0.2)',
    },
    ecoBadgeText: {
        color: '#00DB83',
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 5,
    },
});