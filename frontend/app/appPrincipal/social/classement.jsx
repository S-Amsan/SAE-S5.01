import {Platform, Pressable, ScrollView, Text, View} from "react-native";
import Header from "../../../components/Header";
import {useRouter} from "expo-router";
import Navbar from "../../../components/Navbar";
import React from "react";
import TabNavbar from "../../../components/TabNavbar";

export default function Classement(){
    const router = useRouter();

    const onglets = [
        {id: "classement",label : "Leaderboard", page : "social/classement"},
        {id: "concours",label : "Concours", page : "social/concours"},
        {id: "evenements",label : "Événements", page : "social/evenements"},
    ];

    return(
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" }}>
            {
                Platform.OS === 'web' &&
                <View style={{ width: "15%" }}>
                    <Navbar/>
                </View>
            }

            <View style={{ flex: 1}}>
                <Header userDetails={true}/>
                <ScrollView>
                    {Platform.OS === 'web' && <TabNavbar onglets={onglets} pageBack={"social"}/>}
                    <View>
                        <Text>
                            Classement
                        </Text>

                        <Pressable style={{margin : 50, padding : 50, backgroundColor : '#2680b8'}}title="Retour" onPress={() => router.push("../social")}>
                            <Text>Retour</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>

    );
};
