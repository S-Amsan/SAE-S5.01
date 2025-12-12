import { Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import style from "./styles/parrainageStyles";
import { useNavigation } from "expo-router";
import Toast from "react-native-toast-message";
import { loadRegisterData, updateRegisterData } from "../services/RegisterStorage";

export default function Parrainage() {
    const navigation = useNavigation();
    const [parrainCode, setParrainCode] = useState("");

    useEffect(() => {
        async function load() {
            const saved = await loadRegisterData();
            if (saved?.parrainCode) {
                setParrainCode(saved.parrainCode);
            }
        }
        load();
    }, []);

    const handleNext = async () => {
        await updateRegisterData({ parrainCode });

        Toast.show({
            type: "success",
            text1: "Code enregistré",
            text2: "Passons à l'étape suivante."
        });

        navigation.navigate("age");
    };

    const handleSkip = () => {
        navigation.navigate("age");
    };

    return (
        <LinearGradient colors={["#00DB83", "#0CD8A9"]} style={style.gradient}>
            <View style={style.container}>
                <Image
                    source={require("../assets/logo.png")}
                    style={style.logo}
                    resizeMode="contain"
                />

                <Text style={style.title}>Avez-vous un code de parrainage ?</Text>

                <Text style={style.sub}>Demandez à un ami sinon !</Text>

                <View style={style.inputBox}>
                    <TextInput
                        style={style.input}
                        placeholder="Code de parrainage"
                        placeholderTextColor="#999"
                        value={parrainCode}
                        onChangeText={setParrainCode}
                    />

                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={style.skipText}>Passer {">"}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.submit} onPress={handleNext}>
                    <Text style={style.buttonText}>Valider mon code</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
