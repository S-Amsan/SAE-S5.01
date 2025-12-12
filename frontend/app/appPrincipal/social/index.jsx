import {Platform, Pressable, ScrollView, Text, View} from "react-native";
import Header from "../../../components/Header";
import { useRouter } from "expo-router";
import Navbar from "../../../components/Navbar";
import React from "react";
import styles from "./styles/styles";

export default function Social(){
    const router = useRouter();

    return(
        <View style={styles.container}>
            {
                Platform.OS === 'web' ?
                    <View style={{ width: "15%" }}>
                        <Navbar/>
                    </View>
                    :
                    <Navbar/>
            }
            <View style={{ flex: 1}}>
                <Header/>

                <ScrollView>
                    {Platform.OS !== "web" && <View><Text>Profil</Text></View>}

                    <Pressable style={{margin : 50, padding : 150, backgroundColor : '#c95555'}} onPress={() => router.push("./social/concours")}>
                        <Text>Concours</Text>
                    </Pressable>

                    <Pressable style={{margin : 50, padding : 150, backgroundColor : '#c95555'}} onPress={() => router.push("./social/evenements")}>
                        <Text>Événements</Text>
                    </Pressable>

                    <Pressable style={{margin : 50, padding : 150, backgroundColor : '#c95555'}} onPress={() => router.push("./social/classement")}>
                        <Text>Classement</Text>
                    </Pressable>
                </ScrollView>
            </View>
        </View>
    );
};