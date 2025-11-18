import React from 'react';
import {
    Image,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation} from "expo-router";

const { width, height } = Dimensions.get('window');

export default function Home(){
    const navigation = useNavigation()
    const handleLogin =() =>{
        navigation.navigate('Login')
    }
    const handleSignup =() =>{
        navigation.navigate('SignUp')
    }
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

                    <View style={style.start}>
                        <TouchableOpacity style={style.primaryButton}
                        onPress={handleSignup}>
                            <LinearGradient
                                colors={['#00DB83', '#0CD8A9']}
                                style={style.gradientButton}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                            <Text style={style.primaryButtonText}>
                                Commencer l&#39;aventure
                            </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.secondaryButton}
                        onPress={handleLogin}>
                                <LinearGradient
                                    colors={['#00DB83', '#0CD8A9']}
                                    style={style.gradientButton}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                            <Text style={style.secondaryButtonText}>
                                Connexion
                            </Text>
                                </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={style.policy}>Politique de confidentialité et conditions d&#39;utilisation</Text>
                        </TouchableOpacity>
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
    textContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 240,
        height: 240,
    },
    title: {
        textAlign: 'center',
        fontSize: 48,
        fontWeight: "bold",
        fontFamily: 'comic sans ms',
        color: 'white',
        marginBottom: 20,
    },
    slogan: {
        fontStyle: 'italic',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 24,
    },
    start: {
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 10,
        backgroundColor: 'white',
        width: 470,
        height:380,
        paddingVertical: 40,
        borderStyle: 'solid',
        borderRadius: 45,
    },
    primaryButton: {
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        padding: 15,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    gradientButton: {
        padding: 20,
        alignItems: 'center',
        width:360,
        height:60,
        borderRadius:8
    },
    policy:{
        color:'#1D3937',
        fontStyle:'italic',
        fontSize:14,
    }
});