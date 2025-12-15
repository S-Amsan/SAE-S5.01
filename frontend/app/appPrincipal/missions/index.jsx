import {View} from "react-native";
import React from "react";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";

import {isWeb} from "../../../utils/platform";

import style from "./styles/styles";

export default function Index(){
    const onglets = [
        {id: "missions",label : "Régulières", page : "missions/listes"},
        {id: "gestes",label : "Une fois", page : "missions/gestes"},
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
                {
                    isWeb ?
                        <Header onglets={onglets} />
                        :
                        <Header titre={"Régulières"} boutonRetour={true}/>
                }
            </View>
        </View>
    );
};
