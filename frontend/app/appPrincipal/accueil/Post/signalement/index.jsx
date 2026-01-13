import React, { useState } from "react";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "../../../../../components/Header";
import { isWeb } from "../../../../../utils/platform";

import SignalementReasons from "./_components/SignalementReasons";
import SignalementSuccess from "./_components/SignalementSuccess";

export default function Index() {
    const router = useRouter();
    const { postId } = useLocalSearchParams();
    const [page, setPage] = useState("reasons");

    if (isWeb) {
        router.back();
        return null;
    }

    if (!postId) {
        console.error("postId manquant (route mobile)");
        return null;
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header
                titre="Signaler"
                boutonRetour
                onBack={() => {
                    if (page === "success") {
                        setPage("reasons");
                    } else {
                        router.back();
                    }
                }}
            />

            {page === "reasons" && (
                <SignalementReasons
                    postId={postId}
                    onSuccess={() => setPage("success")}
                />
            )}

            {page === "success" && (
                <SignalementSuccess onDone={() => router.back()} />
            )}
        </View>
    );
}
