import {ScrollView, Text, View} from "react-native";
import React from "react";

import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";

import {isWeb} from "../../../../utils/platform";

import style from "./styles/styles";

export default function Evenements() {

    const onglets = [
        {id: "classement",label : "Leaderboard", page : "social/classement"},
        {id: "concours",label : "Concours", page : "social/concours"},
        {id: "evenements",label : "Événements", page : "social/evenements"},
    ];

    return(
        <View style={style.container}>
            {
                isWeb &&
                <View style={{ width: "15%" }}>
                    <Navbar/>
                </View>
            }

            <View style={{ flex: 1}}>
                {isWeb ? <Header userDetails={true}/> : <Header titre={"Événements"} boutonRetour={true}/>}
                <ScrollView>
                    {isWeb && <TabNavbarWeb onglets={onglets} pageBack={"social"}/>}
                    <View>
                        <Text>
                            Événements
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>

    );
};
