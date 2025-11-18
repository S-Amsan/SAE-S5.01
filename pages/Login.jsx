import React, { useState } from 'react';
import {
    Image,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Login(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => { //à coder
        console.log('Connexion:', { email, password });
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    const handleForgotPassword = () => { //à coder
        console.log('Mot de passe oublié');
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

                    <View style={style.FormContainer}>
                        {/* Titre */}
                        <Text style={style.title}>Content de te revoir !</Text>
                        <Text style={style.subtitle}>Connecte-toi à ton compte</Text>

                        {/* Champ Email */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>E-mail</Text>
                            <TextInput
                                style={style.textInput}
                                placeholder="ton@email.com"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Champ Mot de passe avec icône œil */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Mot de passe</Text>
                            <View style={style.passwordContainer}>
                                <TextInput
                                    style={style.passwordInput}
                                    placeholder="Ton mot de passe"
                                    placeholderTextColor="#999"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    style={style.eyeIcon}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-off" : "eye"}
                                        size={24}
                                        color="#999"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Lien mot de passe oublié */}
                        <TouchableOpacity
                            style={style.forgotPasswordContainer}
                            onPress={handleForgotPassword}
                        >
                            <Text style={style.forgotPasswordText}>
                                Mot de passe oublié ?
                            </Text>
                        </TouchableOpacity>

                        {/* Bouton de connexion */}
                        <TouchableOpacity
                            style={style.primaryButton}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#00DB83', '#0CD8A9']}
                                style={style.gradientButton}
                            >
                                <Text style={style.primaryButtonText}>
                                    Se connecter
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Séparateur */}
                        <View style={style.separator}>
                            <View style={style.separatorLine} />
                            <Text style={style.separatorText}>ou</Text>
                            <View style={style.separatorLine} />
                        </View>

                        {/* Bouton d'inscription */}
                        <TouchableOpacity
                            style={style.secondaryButton}
                            onPress={handleSignUp}
                            activeOpacity={0.8}
                        >
                            <Text style={style.secondaryButtonText}>
                                Créer un compte
                            </Text>
                        </TouchableOpacity>

                        {/* Texte de politique */}
                        <Text style={style.policy}>
                            En te connectant, tu acceptes nos conditions d&#39;utilisation et notre politique de confidentialité.
                        </Text>
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
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 40,
        minHeight: height,
    },
    logo: {
        width: 240,
        height: 240,
        marginBottom: 20,
    },
    FormContainer: {
        padding: 40,
        borderRadius: 45,
        backgroundColor: 'white',
        width: width * 0.35,
        minHeight: 600,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00DB83',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        fontStyle: 'italic',
    },
    inputGroup: {
        width: '100%',
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 5,
    },
    textInput: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 15,
        padding: 18,
        fontSize: 16,
        color: '#333',
        width: '100%',
    },
    // Styles pour le champ mot de passe
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 15,
        overflow: 'hidden',
    },
    passwordInput: {
        flex: 1,
        padding: 18,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        padding: 18,
    },
    // Lien mot de passe oublié
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: '#00DB83',
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    // Bouton principal
    primaryButton: {
        borderRadius: 25,
        width: '100%',
        marginBottom: 20,
        overflow: 'hidden',
    },
    gradientButton: {
        padding: 18,
        alignItems: 'center',
        borderRadius: 25,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Séparateur
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E9ECEF',
    },
    separatorText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '600',
        marginHorizontal: 15,
    },
    // Bouton secondaire
    secondaryButton: {
        borderWidth: 2,
        borderColor: '#00DB83',
        borderRadius: 25,
        padding: 16,
        alignItems: 'center',
        marginBottom: 25,
    },
    secondaryButtonText: {
        color: '#00DB83',
        fontSize: 16,
        fontWeight: 'bold',
    },

    policy: {
        color: '#1D3937',
        fontSize: 12,
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 16,
    },
});