import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {usePathname, useRouter} from "expo-router";


export default function TabNavbarWeb({
    onglets,
    pageBack // Mettre la page (appPrincipal) vers la quelle le bouton redirige (exemple : "social" -> redirige vers /appPrincipal/social
    }){
    const pathname = usePathname();
    const router = useRouter();

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.boutonRetourcontainer} onPress={() => router.push(`/appPrincipal/${pageBack}`)}>
                <Ionicons name="chevron-back" size={27} color="#000000" />
            </TouchableOpacity>

            <View style={styles.ongletsContainer}>
                {onglets.map((onglet) => {
                    const isActive = pathname === `/appPrincipal/${onglet.page}`;

                    return (
                        <TouchableOpacity
                            key={onglet.id}
                            style={styles.ongletContainer}
                            onPress={() => !isActive && router.push(`/appPrincipal/${onglet.page}`)}
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
        width: "95%",
        height: 60,
        backgroundColor: "#efefef",
        alignSelf: "center",
        marginVertical : 20,
        borderRadius : 15,
        flexDirection: "row",
        alignItems: "center",
    },
    boutonRetourcontainer : {
        width: "5%",
        margin : 0,
        alignItems: "center",
        justifyContent: "center",
    },
    ongletsContainer : {
        flex : 1,
        flexDirection: "row",
        alignItems: "center",
        gap : 15,
        justifyContent: "space-around",
    },
    ongletContainer: {
        flex : 1,
        alignItems: "center",
    },
    ongletText: {
        textAlign: "center",
        paddingVertical : 10,
        width: "80%",
        fontSize: 17,
        fontWeight: "medium",
        borderRadius: 13,
    }
})
