import React from "react";
import {View, Text} from "react-native";
import styles from "../../social/index/styles/styles";
import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";


export default function Gerer() {

    return (
        <View style={styles.container}>
            <View style={{ width: "15%" }}>
                <Navbar/>
            </View>
            <View style={{ flex: 1}}>
                <Header/>
                <View style={styles.contenuContainer}>
                    <Text>Gerer</Text>
                </View>
            </View>
        </View>
    )
};
