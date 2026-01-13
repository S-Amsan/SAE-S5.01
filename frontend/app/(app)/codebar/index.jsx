import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Modal,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {getProductData} from "../../../services/scan.api";

export default function ScanPage() {
    const router = useRouter();
    const isWeb = Platform.OS === "web";

    const [scanned, setScanned] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [notPartnerModal, setNotPartnerModal] = useState(false);
    const [ineligibleReason, setIneligibleReason] = useState(null);


    const INELIGIBLE_REASON = {
        UNKNOWN: "UNKNOWN",
        NOT_PLASTIC: "NOT_PLASTIC",
        INCOMPLETE: "INCOMPLETE",
    };

    useEffect(() => {
        if (!isWeb && !permission) {
            requestPermission();
        }
    }, [permission, isWeb]);

    const handleBarcodeScanned = async ({ data, type }) => {
        setScanned(true);
        console.log("SCAN:", type, data);

        try {
            const productData = await getProductData(data);

            console.log("OPENFOODFACTS RAW RESPONSE:", productData);
            console.log("PRODUCT ONLY:", productData.product);

            if (productData.status !== 1) {
                setIneligibleReason(INELIGIBLE_REASON.UNKNOWN);
                setNotPartnerModal(true);
                return;
            }

            const { product } = productData;

            if (!product.product_name || !product.brands) {
                setIneligibleReason(INELIGIBLE_REASON.INCOMPLETE);
                setNotPartnerModal(true);
                return;
            }

            if (product.plastic === false) {
                setIneligibleReason(INELIGIBLE_REASON.NOT_PLASTIC);
                setNotPartnerModal(true);
                return;
            }

            router.replace({
                pathname: "missions",
                params: {
                    page: "post",
                    product: JSON.stringify(productData.product),
                    code: data,
                },
            });

        } catch (error) {
            console.error("Erreur API OpenFoodFacts", error);
            setScanned(false);
        }
    };

    if (isWeb) {
        return (
            <View style={styles.webContainer}>
                <Modal transparent animationType="fade" visible>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Ionicons
                                name="phone-portrait-outline"
                                size={48}
                                color="#1DDE9A"
                            />
                            <Text style={styles.modalTitle}>
                                Fonctionnalité mobile uniquement
                            </Text>
                            <Text style={styles.modalText}>
                                Retrouver le scan de code-barres uniquement
                                sur l’application mobile.
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

    if (!permission) return null;

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    Accès caméra refusé
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFill}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
                }}
            />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Scanner un produit</Text>
            </View>

            {/* ZONE DE SCAN */}
            <View style={styles.scanArea}>
                <View style={styles.scanFrame} />
                <Text style={styles.scanText}>
                    Place le code-barres dans le cadre
                </Text>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Le scan se fera automatiquement
                </Text>
            </View>

            <Modal
                transparent
                animationType="fade"
                visible={notPartnerModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Produit non partenaire
                        </Text>

                        <Text style={styles.modalText}>
                            {ineligibleReason === INELIGIBLE_REASON.UNKNOWN &&
                                "Ce produit n’est pas référencé chez nos partenaires."}

                            {ineligibleReason === INELIGIBLE_REASON.NOT_PLASTIC &&
                                "Ce produit n’est pas conditionné en plastique."}

                            {ineligibleReason === INELIGIBLE_REASON.INCOMPLETE &&
                                "Les informations de ce produit sont incomplètes."}
                        </Text>


                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setNotPartnerModal(false);
                                setIneligibleReason(null);
                                router.back();
                            }}
                        >
                            <Text style={styles.modalButtonText}>
                                Fermer
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },

    header: {
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        zIndex: 10,
    },

    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },

    scanArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    scanFrame: {
        width: 260,
        height: 160,
        borderWidth: 3,
        borderColor: "#1DDE9A",
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.2)",
    },

    scanText: {
        marginTop: 16,
        color: "#fff",
        fontSize: 14,
        opacity: 0.85,
    },

    footer: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: "center",
    },

    footerText: {
        color: "#fff",
        opacity: 0.7,
    },

    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },

    permissionText: {
        color: "#fff",
    },

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
