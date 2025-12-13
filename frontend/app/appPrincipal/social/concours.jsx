import {Platform, Pressable, ScrollView, Text, View} from "react-native";
import Header from "../../../components/Header";
import {useRouter} from "expo-router";
import Navbar from "../../../components/Navbar";
import React from "react";
import TabNavbar from "../../../components/TabNavbar";
import style from "./styles/styles";

export default function Concours(){
    const router = useRouter();

    const onglets = [
        {id: "classement",label : "Leaderboard", page : "social/classement"},
        {id: "concours",label : "Concours", page : "social/concours"},
        {id: "evenements",label : "Événements", page : "social/evenements"},
    ];

    return(
        <View style={style.container}>
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
                            Concours
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>

    );
};
