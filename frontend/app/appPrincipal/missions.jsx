import {Platform, ScrollView, Text, View} from "react-native";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import React from "react";

export default function Missions(){
    return(
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" }}>
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
                    <Text>
                        C Les missions ici
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
};