import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";


export default function TabNavbarWeb({ongletActifId, onglets, setOngletActif}){

    return (
        <View style={styles.container}>
            <View style={styles.ongletsContainer}>
                {onglets.map((onglet) => {
                    const isActive = ongletActifId === onglet.id;

                    return (
                        <TouchableOpacity
                            key={onglet.id}
                            style={styles.ongletContainer}
                            onPress={() => !isActive && setOngletActif(onglet.id)}
                        >
                            <Text style={[styles.ongletText, isActive && {color : "#05D993", backgroundColor : "#FFFFFF"}]}>{onglet.label}</Text>
                        </TouchableOpacity>)
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        height: 50,
        backgroundColor: "#efefef",
        alignSelf: "center",
        marginVertical : 20,
        borderRadius : 15,
        flexDirection: "row",
        alignItems: "center",
    },
    ongletsContainer : {
        flex : 1,
        flexDirection: "row",
        alignItems: "center",
        margin : 4,
        justifyContent: "space-around",
    },
    ongletContainer: {
        flex : 1,
        alignItems: "center",
    },
    ongletText: {
        textAlign: "center",
        paddingVertical : 10,
        width: "100%",
        height: "100%",
        fontSize: 17,
        fontWeight: "medium",
        borderRadius: 13,
    }
})
