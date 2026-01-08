import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import Header from "../../../../../components/Header";
import { isWeb } from "../../../../../utils/platform";

import SignalementReasons from "./_components/SignalementReasons";
import SignalementSuccess from "./_components/SignalementSuccess";

export default function Index() {
    const router = useRouter();
    const [page, setPage] = useState("reasons");
    const [reason, setReason] = useState(null);


    if (isWeb) {
        router.back();
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
                    onSelect={async (selectedReason) => {
                        setReason(selectedReason);
                        // TODO: Enregister la raison du signalement avec id de PostAction
                        setPage("success");
                    }}
                />
            )}


            {page === "success" && (
                <SignalementSuccess
                    onDone={() => router.back()}
                />
            )}
        </View>
    );
}
