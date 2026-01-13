import React from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

import {useRouter} from "expo-router";


export default function AccesReserveAdmin()  {
    const router = useRouter();

    return (
        <View style={styles.webContainer}>
            <Modal transparent animationType="fade" visible>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={48}
                            color="#1DDE9A"
                        />
                        <Text style={styles.modalTitle}>
                            Accès restreint
                        </Text>
                        <Text style={styles.modalText}>
                            Cette page est réservée aux administrateurs.
                            Vous n’avez pas les droits nécessaires pour accéder au dashboard.
                        </Text>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.modalButtonText}>
                                Retour
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
        backgroundColor: "#000",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContent: {
        width: "85%",
        backgroundColor: "#111",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
    },

    modalTitle: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
    },

    modalText: {
        marginTop: 12,
        fontSize: 14,
        color: "#ccc",
        textAlign: "center",
        lineHeight: 20,
    },

    modalButton: {
        marginTop: 24,
        backgroundColor: "#1DDE9A",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
    },

    modalButtonText: {
        color: "#000",
        fontWeight: "600",
    },
});
