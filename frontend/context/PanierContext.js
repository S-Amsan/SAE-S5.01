import React, { createContext, useContext, useMemo, useState } from "react";

const PanierContext = createContext(null);

export function PanierProvider({ children }) {
    const [nbPanier, setNbPanier] = useState(0);

    const value = useMemo(
        () => ({
            nbPanier,
            ajouterAuPanier: () => setNbPanier((n) => n + 1),
            setNbPanier,
        }),
        [nbPanier]
    );

    return <PanierContext.Provider value={value}>{children}</PanierContext.Provider>;
}

export function usePanier() {
    const ctx = useContext(PanierContext);
    if (!ctx) {
        throw new Error("usePanier doit être utilisé dans un <PanierProvider>");
    }
    return ctx;
}
