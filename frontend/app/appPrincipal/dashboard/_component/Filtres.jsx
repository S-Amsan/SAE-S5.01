import {View} from "react-native";
import React from "react";
import Filtre from "./Filtre";


export default function Filtres ({filtres = [], values, onChange, style,}) {
    const safeValues =
        Array.isArray(values) && values.length === filtres.length
            ? values
            : filtres.map((_, i) => values?.[i] ?? null);


    const setValueAt = (index, v) => {
        const next = [...safeValues];
        next[index] = v;
        onChange?.(next);
    };

    return (
        <View style={[{ flexDirection: "row", gap: 10, flexWrap: "wrap", alignItems: "center" }, style]}>
            {filtres.map((options, i) => (
                <View key={i} style={{ minWidth: 140 }}>
                    <Filtre
                        filtres={options}
                        value={safeValues[i]}
                        onChange={(v) => setValueAt(i, v)}
                        placeholder="Choisir"
                    />
                </View>
            ))}
        </View>
    );
}
