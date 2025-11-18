import React, { useState } from 'react';
import {
    Image,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    Modal,
    FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSignUp = () => { 
        console.log('Inscription:', {
            pseudo,
            email,
            password,
            phone: selectedCountry.dialCode + phone
        });
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
                // Réinitialiser le numéro quand on change de pays
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
                                        name={showPassword ? "eye-off" : "eye"}
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
    FormContainer:{
        padding: 40,
        borderRadius: 45,
        backgroundColor: 'white',
        width: width * 0.35,
        minHeight: 660,
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
        marginBottom: 15,
        textAlign: 'center',
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
    // Styles pour le champ téléphone
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 15,
        overflow: 'hidden',
    },
    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9ECEF',
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderRightWidth: 1,
        borderRightColor: '#DEE2E6',
    },
    countryFlag: {
        fontSize: 16,
        marginRight: 8,
    },
    countryCodeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    phoneInput: {
        flex: 1,
        padding: 18,
        fontSize: 16,
        color: '#333',
    },
    phoneHint: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        marginLeft: 5,
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
    // Styles pour le modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#00DB83',
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    countryName: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    countryDialCode: {
        fontSize: 16,
        color: '#666',
    },
    closeButton: {
        backgroundColor: '#00DB83',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryButton: {
        borderRadius: 25,
        width: '100%',
        marginTop: 20,
        marginBottom: 25,
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: 16,
    },
    loginLink: {
        color: '#00DB83',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});