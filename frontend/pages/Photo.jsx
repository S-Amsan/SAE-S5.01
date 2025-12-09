import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import styles from "./styles/photoStyles";

export default function Photo() {
    const router = useRouter();

    const handleSkip = () => {
        router.push("appPrincipal/accueil");
    };

    return (
        <LinearGradient
            colors={["#00DB83", "#0CD8A9"]}
            style={styles.gradient}
        >
            <View style={styles.container}>

                {/* Title */}
                <Text style={styles.title}>Personnaliser{"\n"}votre profil</Text>

                {/* Photo */}
                <Text style={styles.label}>Photo de profil</Text>

                <View style={styles.photoWrapper}>
                    <View style={styles.photoCircle}>
                        <Image
                            source={require("../assets/icones/photo.png")}
                            style={styles.cameraIcon}
                        />
                    </View>
                </View>

                {/* Name */}
                <Text style={styles.label}>Nom</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Entrez votre nom"
                    placeholderTextColor="#A9A9A9"
                    underlineColorAndroid="transparent"
                />

                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitText}>Valider</Text>
                </TouchableOpacity>

                {/* Skip */}
                <TouchableOpacity onPress={handleSkip}>
                    <Text style={styles.skipText}>Passer {">"}</Text>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    );
}
