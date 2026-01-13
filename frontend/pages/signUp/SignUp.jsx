import React, {useEffect, useState} from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList,
    ScrollView,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import {
    saveRegisterData,
    loadRegisterData,
    clearRegisterData,
    updateRegisterData
} from "../../services/RegisterStorage";
import Toast from "react-native-toast-message";

import style from "./styles/signUpStyles";

const countries = [
    { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { code: 'BE', name: 'Belgique', dialCode: '+32', flag: '🇧🇪' },
    { code: 'CH', name: 'Suisse', dialCode: '+41', flag: '🇨🇭' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { code: 'US', name: 'États-Unis', dialCode: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'Royaume-Uni', dialCode: '+44', flag: '🇬🇧' },
    { code: 'DE', name: 'Allemagne', dialCode: '+49', flag: '🇩🇪' },
    { code: 'ES', name: 'Espagne', dialCode: '+34', flag: '🇪🇸' },
    { code: 'IT', name: 'Italie', dialCode: '+39', flag: '🇮🇹' },
    { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
];

export default function SignUp(){
    const navigation = useNavigation();
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadDraft() {
            const saved = await loadRegisterData();
            if (saved) {
                setPseudo(saved.pseudo ?? '');
                setEmail(saved.email ?? '');
                setPassword(saved.password ?? '');
                setPhone(saved.phone ?? '');
                setAge(saved.age ?? "");
            }
        }
        loadDraft();
    }, []);

    useEffect(() => {
        async function sync() {
            const current = await loadRegisterData();

            if (!current) {

                await saveRegisterData({
                    pseudo,
                    email,
                    password,
                    phone,
                    age
                });
            } else {

                await updateRegisterData({
                    pseudo,
                    email,
                    password,
                    phone,
                    age
                });
            }
        }

        sync();
    }, [pseudo, email, password, phone, age]);



    const handleSignUp = async () => {

        const cleanPseudo = pseudo.trim();
        const cleanEmail = email.trim();
        const cleanPassword = password.trim();
        const cleanPhone = phone.trim();

        // ============================
        //  VÉRIFICATIONS LOCALES
        // ============================
        if (cleanPseudo.length === 0) {
            return Toast.show({
                type: "error",
                text1: "Pseudo manquant",
                text2: "Veuillez entrer un pseudo."
            });
        }

        if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
            return Toast.show({
                type: "error",
                text1: "E-mail invalide",
                text2: "Veuillez entrer une adresse e-mail valide."
            });
        }

        if (cleanPassword.length < 8) {
            return Toast.show({
                type: "error",
                text1: "Mot de passe trop court",
                text2: "Il doit contenir au moins 8 caractères."
            });
        }

        if (cleanPhone.length === 0) {
            return Toast.show({
                type: "error",
                text1: "Numéro manquant",
                text2: "Veuillez entrer un numéro de téléphone."
            });
        }

        // ============================
        //  VÉRIFICATION BACKEND
        // ============================
        try {
            const encodedPseudo = encodeURIComponent(cleanPseudo);
            const encodedEmail = encodeURIComponent(cleanEmail);
            const encodedPhone = encodeURIComponent(selectedCountry.dialCode + cleanPhone);

            const response = await fetch(
                `http://localhost:8080/auth/check?pseudo=${encodedPseudo}&email=${encodedEmail}&phone=${encodedPhone}`
            );

            const result = await response.json();

            if (result.pseudoTaken) {
                return Toast.show({
                    type: "error",
                    text1: "Pseudo déjà utilisé",
                    text2: "Veuillez en choisir un autre."
                });
            }

            if (result.emailTaken) {
                return Toast.show({
                    type: "error",
                    text1: "E-mail déjà utilisé",
                    text2: "Un autre compte utilise déjà cet e-mail."
                });
            }

            if (result.phoneTaken) {
                return Toast.show({
                    type: "error",
                    text1: "Numéro déjà utilisé",
                    text2: "Un compte utilise déjà ce numéro."
                });
            }

        } catch (err) {
            console.error(err);
            return Toast.show({
                type: "error",
                text1: "Erreur réseau",
                text2: "Impossible de vérifier les informations."
            });
        }

        // ============================
        //  SAUVEGARDE & NAVIGATION
        // ============================
        await saveRegisterData({
            pseudo: cleanPseudo,
            email: cleanEmail,
            password: cleanPassword,
            phone: selectedCountry.dialCode + cleanPhone,
            age, // Maintenant disponible !
        });

        Toast.show({
            type: "success",
            text1: "Informations validées",
            text2: "Passe à l'étape suivante."
        });

        navigation.navigate("parrainage");
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const formatPhoneNumber = (text) => {
        const cleaned = text.replace(/\D/g, '');

        if (selectedCountry.code === 'FR') {
            // Format français: X XX XX XX XX (9 chiffres + 4 espaces = 13 caractères max)
            if (cleaned.length <= 1) {
                return cleaned;
            } else if (cleaned.length <= 3) {
                return `${cleaned.slice(0, 1)} ${cleaned.slice(1)}`;
            } else if (cleaned.length <= 5) {
                return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3)}`;
            } else if (cleaned.length <= 7) {
                return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5)}`;
            } else {
                return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)}`;
            }
        }
        return cleaned;
    };

    const handlePhoneChange = (text) => {
        // Garde seulement les chiffres pour le stockage (max 9 chiffres pour la France)
        const cleaned = text.replace(/\D/g, '');
        if (selectedCountry.code === 'FR' && cleaned.length <= 9) {
            setPhone(cleaned);
        } else if (cleaned.length <= 15) {
            setPhone(cleaned);
        }
    };

    const getDisplayPhone = () => {
        return formatPhoneNumber(phone);
    };

    const getMaxLength = () => {
        // Pour la France: 9 chiffres + 4 espaces = 13 caractères affichés
        return selectedCountry.code === 'FR' ? 13 : 15;
    };

    const renderCountryItem = ({ item }) => (
        <TouchableOpacity
            style={style.countryItem}
            onPress={() => {
                setSelectedCountry(item);
                setModalVisible(false);
                setPhone('');
            }}
        >
            <Text style={style.countryFlag}>{item.flag}</Text>
            <Text style={style.countryName}>{item.name}</Text>
            <Text style={style.countryDialCode}>{item.dialCode}</Text>
        </TouchableOpacity>
    );

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
                        <Text style={style.title}>Crée ton compte !</Text>

                        {/* Champ Pseudo */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Pseudo</Text>
                            <TextInput
                                style={style.textInput}
                                placeholder="Ton pseudo unique"
                                placeholderTextColor="#999"
                                value={pseudo}
                                onChangeText={setPseudo}
                            />
                        </View>

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

                        {/* Champ Téléphone avec sélecteur de pays */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Numéro de téléphone</Text>
                            <View style={style.phoneInputContainer}>
                                <TouchableOpacity
                                    style={style.countrySelector}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Text style={style.countryFlag}>{selectedCountry.flag}</Text>
                                    <Text style={style.countryCodeText}>{selectedCountry.dialCode}</Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={style.phoneInput}
                                    placeholder={selectedCountry.code === 'FR' ? "6 12 34 56 78" : "Votre numéro"}
                                    placeholderTextColor="#999"
                                    value={getDisplayPhone()}
                                    onChangeText={handlePhoneChange}
                                    keyboardType="numeric"
                                    maxLength={getMaxLength()}
                                />
                            </View>
                            <Text style={style.phoneHint}>
                                {selectedCountry.code === 'FR' ? '9 chiffres maximum' : '15 chiffres maximum'}
                            </Text>
                        </View>

                        {/* Champ Mot de passe avec icône œil */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Mot de passe</Text>
                            <View style={style.passwordContainer}>
                                <TextInput
                                    style={style.passwordInput}
                                    placeholder="Minimum 8 caractères"
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
                                        name={showPassword ? "eye" : "eye-off"}
                                        size={24}
                                        color="#999"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Bouton d'inscription */}
                        <TouchableOpacity
                            style={style.primaryButton}
                            onPress={handleSignUp}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#00DB83', '#0CD8A9']}
                                style={style.gradientButton}
                            >
                                <Text style={style.primaryButtonText}>
                                    Créer mon compte
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Lien de connexion */}
                        <View style={style.loginContainer}>
                            <Text style={style.loginText}>
                                Déjà un compte ?{' '}
                            </Text>
                            <TouchableOpacity onPress={handleLogin}>
                                <Text style={style.loginLink}>Connecte toi !</Text>
                            </TouchableOpacity>
                        </View>
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
                    <Text style={style.title}>Crée ton compte !</Text>

                    {/* Champ Pseudo */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Pseudo</Text>
                        <TextInput
                            style={style.textInput}
                            placeholder="Ton pseudo unique"
                            placeholderTextColor="#999"
                            value={pseudo}
                            onChangeText={setPseudo}
                        />
                    </View>

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

                    {/* Champ Téléphone avec sélecteur de pays */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Numéro de téléphone</Text>
                        <View style={style.phoneInputContainer}>
                            <TouchableOpacity
                                style={style.countrySelector}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={style.countryFlag}>{selectedCountry.flag}</Text>
                                <Text style={style.countryCodeText}>{selectedCountry.dialCode}</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={style.phoneInput}
                                placeholder={selectedCountry.code === 'FR' ? "6 12 34 56 78" : "Votre numéro"}
                                placeholderTextColor="#999"
                                value={getDisplayPhone()}
                                onChangeText={handlePhoneChange}
                                keyboardType="numeric"
                                maxLength={getMaxLength()} // ✅ Correction ici
                            />
                        </View>
                        <Text style={style.phoneHint}>
                            {selectedCountry.code === 'FR' ? '9 chiffres maximum' : '15 chiffres maximum'}
                        </Text>
                    </View>

                    {/* Champ Mot de passe avec icône œil */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Mot de passe</Text>
                        <View style={style.passwordContainer}>
                            <TextInput
                                style={style.passwordInput}
                                placeholder="Minimum 8 caractères"
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
                                    name={showPassword ? "eye" : "eye-off"}
                                    size={24}
                                    color="#999"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bouton d'inscription */}
                    <TouchableOpacity
                        style={style.primaryButton}
                        onPress={handleSignUp}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#00DB83', '#0CD8A9']}
                            style={style.gradientButton}
                        >
                            <Text style={style.primaryButtonText}>
                                Créer mon compte
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Lien de connexion */}
                    <View style={style.loginContainer}>
                        <Text style={style.loginText}>
                            Déjà un compte ?{' '}
                        </Text>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={style.loginLink}>Connecte toi !</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> )}

            {/* Modal de sélection du pays */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Text style={style.modalTitle}>Sélectionnez un pays</Text>
                        <FlatList
                            data={countries}
                            renderItem={renderCountryItem}
                            keyExtractor={(item) => item.code}
                            showsVerticalScrollIndicator={false}
                        />
                        <TouchableOpacity
                            style={style.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={style.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};
