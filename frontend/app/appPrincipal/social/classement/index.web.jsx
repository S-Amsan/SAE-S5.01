import {ScrollView, Text, View} from "react-native";
import React from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";

import {isWeb} from "../../../../utils/platform";

import styles from "./styles/styles";

export default function Classement(){

    const onglets = [
        {id: "classement",label : "Leaderboard", page : "social/classement"},
        {id: "concours",label : "Concours", page : "social/concours"},
        {id: "evenements",label : "Événements", page : "social/evenements"},
    ];

    return(
        <View style={[styles.container, !isWeb && {backgroundColor: "#05D991"}]}>

            <View style={{ width: "15%" }}>
                <Navbar/>
            </View>

            <View style={{ flex: 1}}>
                <Header userDetails={true}/>
                <ScrollView>
                    <TabNavbarWeb onglets={onglets} pageBack={"social"}/>
                    <View>
                        <Text>
                            Classement
                        </Text>
                    </View>
                </ScrollView>
            </ View>
        </View>
    );
};
