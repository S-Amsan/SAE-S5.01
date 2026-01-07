import {Modal, TouchableOpacity, StyleSheet, View} from "react-native";
import React from "react";

export default function PopUp({
                                  visible, // Boolean ou un autre, si null ou undefined alors c'est une defined
                                  setVisible, // Pour enlever le popup
                                  children // pas un paramètres, c'est ceux qu'il y'a a l'intérieur. Exemple <PopUp> <Text>contenu<Text/> <PopUp/>
}) {
    return (
        <Modal transparent visible={!!visible} statusBarTranslucent>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                >
                </TouchableOpacity>
                {children}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 50,
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
    },

})
