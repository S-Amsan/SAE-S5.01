import React, { useState } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation, useRouter} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { login } from "../../services/authService";
import style from "./styles/loginStyles";

export default function Login(){
    const router = useRouter();
    const [error, setError] = useState(null);

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            await login(email, password);
            router.replace("/appPrincipal/accueil");
        } catch (e) {
            setError(e.message);
        }
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    const handleForgotPassword = () => {
        console.log('Mot de passe oublié');
    };

    return(
        <LinearGradient
            colors={['#00DB83', '#0CD8A9']}
            style={style.gradient}
        >
            {Platform.OS === 'web' ? (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}>
                <View style={style.container}>
                    <Image
                        source={require('../../assets/logo.png')}
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
                    ) : ( <View style={style.container}>
                <Image
                    source={require('../../assets/logo.png')}
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
            )}
        </LinearGradient>
    );
};