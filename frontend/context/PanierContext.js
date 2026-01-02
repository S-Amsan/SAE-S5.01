import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const PanierContext = createContext(null);

export function PanierProvider({ children }) {
    const [items, setItems] = useState([]);

    const addItem = useCallback((product) => {
        setItems((prev) => {
            const id = String(product.id);
            const found = prev.find((p) => String(p.id) === id);

            if (found) {
                return prev.map((p) =>
                    String(p.id) === id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }

            return [...prev, { ...product, id, quantity: 1 }];
        });
    }, []);

    const removeItem = (id) => {
        setItems((prev) =>
            prev
                .map((item) => {
                    if (item.id !== id) return item;

                    if (item.quantity > 1) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }
                    return null;
                })
                .filter(Boolean)
        );
    };


    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const cartCount = useMemo(() => {
        return items.reduce((acc, it) => acc + (it.quantity || 1), 0);
    }, [items]);

    const totalPoints = useMemo(() => {
        return items.reduce((acc, it) => acc + (Number(it.points) || 0) * (it.quantity || 1), 0);
    }, [items]);

    const value = useMemo(
        () => ({ items, addItem, removeItem, clearCart, cartCount, totalPoints }),
        [items, addItem, removeItem, clearCart, cartCount, totalPoints]
    );

    return <PanierContext.Provider value={value}>{children}</PanierContext.Provider>;
}

export function usePanier() {
    const ctx = useContext(PanierContext);
    if (!ctx) throw new Error("usePanier must be used inside <PanierProvider />");
    return ctx;
}
