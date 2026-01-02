import {Platform, Pressable, ScrollView, Text, View} from "react-native";
import Header from "../../../../components/Header";
import Navbar from "../../../../components/Navbar";
import React from "react";
import TabNavbarWeb from "../../../../components/TabNavbarWeb";


export default function Index(){

    const onglets = [
        {id: "panier",label : "Mon panier", page : "boutique/panier"},
        {id: "historique",label : "Mes achats", page : "boutique/historique"},
    ];

    return(
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FFFFFF" }}>

            <View style={{ width: "15%" }}>
                <Navbar />
            </View>


            <View style={{flex: 1}}>
                <Header/>
                {Platform.OS === "web" && <TabNavbarWeb onglets={onglets} pageBack={"boutique"}/>}
                <View>
                    <Pressable>
                        Cartes cadeaux
                    </Pressable>

                    <Pressable>
                        Bons de réduction
                    </Pressable>

                    <Pressable>
                        Dons aux associations
                    </Pressable>

                </View>


                <View>

                </View>
            </View>

        </View>
    );
};