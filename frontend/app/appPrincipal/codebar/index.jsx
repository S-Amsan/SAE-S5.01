import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Navbar from "../../../components/Navbar";

export default function Index({ onScanned }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (!permission) requestPermission();
    }, []);

    const handleBarcodeScanned = ({ data, type }) => {
        setScanned(true);

        console.log("BARCODE TYPE:", type);
        console.log("BARCODE DATA:", data);

        onScanned(data);
    };

    if (!permission) {
        return <Text>Demande d’autorisation caméra…</Text>;
    }

    if (!permission.granted) {
        return <Text>Accès caméra refusé</Text>;
    }

    return (
        <View style={styles.container}>
            <Navbar/>
            <CameraView
                style={{ flex: 1 }}
                onBarcodeScanned={permission?.granted ? handleBarcodeScanned : undefined}
                barcodeScannerSettings={{
                    barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"]
                }}
            />


            {scanned && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setScanned(false)}
                >
                    <Text style={styles.text}>Scanner à nouveau</Text>
                </TouchableOpacity>
            )}
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        backgroundColor: "#1DDE9A",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16
    }
});

