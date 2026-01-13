import React, { createContext, useContext, useMemo, useCallback, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PanierContext = createContext(null);

const PANIER_KEY = "ecocecption_panier_articles";

const genererCodeFictif = () => {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const taille = 18;
    let code = "";
    for (let i = 0; i < taille; i++) {
        code += alphabet[Math.floor(Math.random() * alphabet.length)];
        if ((i + 1) % 6 === 0 && i !== taille - 1) code += "-";
    }
    return code;
};

export function PanierProvider({ children }) {
    const [articles, setArticles] = useState([]);
    const [achats, setAchats] = useState([]);
    const [favoris, setFavoris] = useState([]);

    const [afficherTitreAjoute, setAfficherTitreAjoute] = useState(false);

    useEffect(() => {
        const chargerPanier = async () => {
            try {
                const raw = await AsyncStorage.getItem(PANIER_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) setArticles(parsed);
                }
            } catch (e) {
                console.log("Erreur chargement panier:", e);
            }
        };

        chargerPanier();
    }, []);

    // Sauvegarder le panier à chaque changement
    useEffect(() => {
        const sauvegarderPanier = async () => {
            try {
                await AsyncStorage.setItem(PANIER_KEY, JSON.stringify(articles));
            } catch (e) {
                console.log("Erreur sauvegarde panier:", e);
            }
        };

        sauvegarderPanier();
    }, [articles]);

    const nombreProduits = useMemo(() => {
        return articles.reduce((acc, it) => acc + (Number(it.quantity) || 1), 0);
    }, [articles]);

    const totalPoints = useMemo(() => {
        return articles.reduce(
            (acc, it) => acc + (Number(it.points) || 0) * (Number(it.quantity) || 1),
            0
        );
    }, [articles]);

    const ajouterAuPanier = useCallback((nouvelArticle) => {
        setArticles((prev) => {
            const id = String(nouvelArticle.id);
            const qAjout = Number(nouvelArticle.quantity) || 1;

            const idx = prev.findIndex((x) => String(x.id) === id);

            if (idx !== -1) {
                const copie = [...prev];
                const courant = copie[idx];
                copie[idx] = { ...courant, quantity: (Number(courant.quantity) || 1) + qAjout };
                return copie;
            }

            return [
                ...prev,
                {
                    ...nouvelArticle,
                    id,
                    points: Number(nouvelArticle.points) || 0,
                    quantity: qAjout,
                },
            ];
        });

        setAfficherTitreAjoute(true);
    }, []);

    const decrementerDuPanier = useCallback((id) => {
        setArticles((prev) => {
            const next = [];

            for (const it of prev) {
                if (String(it.id) !== String(id)) {
                    next.push(it);
                    continue;
                }

                const q = (Number(it.quantity) || 1) - 1;
                if (q > 0) next.push({ ...it, quantity: q });
            }

            if (next.length === 0) setAfficherTitreAjoute(false);
            return next;
        });
    }, []);

    const viderPanier = useCallback(async () => {
        setArticles([]);
        setAfficherTitreAjoute(false);

        try {
            await AsyncStorage.removeItem(PANIER_KEY);
        } catch (e) {
            console.log("Erreur suppression panier:", e);
        }
    }, []);

    const passerCommande = useCallback(() => {
        const dateAchatISO = new Date().toISOString();

        setAchats((prevAchats) => {
            const lignes = [];

            for (const it of articles) {
                const q = Number(it.quantity) || 1;

                for (let i = 0; i < q; i++) {
                    lignes.push({
                        ...it,
                        id: String(it.id),
                        points: Number(it.points) || 0,
                        quantity: 1,
                        dateAchatISO,
                        code: genererCodeFictif(),
                        idLigneAchat: `${String(it.id)}-${dateAchatISO}-${i}-${Math.random().toString(16).slice(2)}`,
                    });
                }
            }

            return [...lignes, ...prevAchats];
        });

        setArticles([]);
        setAfficherTitreAjoute(false);
    }, [articles]);

    const acheterOffre = useCallback((article) => {
        const dateAchatISO = new Date().toISOString();
        const q = Number(article.quantity) || 1;

        setAchats((prevAchats) => {
            const lignes = [];

            for (let i = 0; i < q; i++) {
                lignes.push({
                    ...article,
                    id: String(article.id),
                    points: Number(article.points) || 0,
                    quantity: 1,
                    dateAchatISO,
                    code: genererCodeFictif(),
                    idLigneAchat: `${String(article.id)}-${dateAchatISO}-${i}-${Math.random().toString(16).slice(2)}`,
                });
            }

            return [...lignes, ...prevAchats];
        });
    }, []);

    const estFavori = useCallback(
        (id) => {
            return favoris.some((x) => String(x.id) === String(id));
        },
        [favoris]
    );

    const toggleFavori = useCallback((article) => {
        const id = String(article.id);

        setFavoris((prev) => {
            const existe = prev.some((x) => String(x.id) === id);
            if (existe) return prev.filter((x) => String(x.id) !== id);

            return [
                ...prev,
                {
                    id,
                    titre: String(article.titre ?? ""),
                    titreComplet: String(article.titreComplet ?? ""),
                    description: String(article.description ?? ""),
                    descriptionLongue: String(article.descriptionLongue ?? ""),
                    points: Number(article.points) || 0,
                    imageCarte: String(article.imageCarte ?? ""),
                    banniere: String(article.banniere ?? ""),
                    type: String(article.type ?? ""),
                },
            ];
        });
    }, []);

    const value = useMemo(
        () => ({
            articles,
            achats,
            favoris,
            nombreProduits,
            totalPoints,
            afficherTitreAjoute,
            setAfficherTitreAjoute,
            ajouterAuPanier,
            decrementerDuPanier,
            viderPanier,
            passerCommande,
            acheterOffre,
            estFavori,
            toggleFavori,
        }),
        [
            articles,
            achats,
            favoris,
            nombreProduits,
            totalPoints,
            afficherTitreAjoute,
            ajouterAuPanier,
            decrementerDuPanier,
            viderPanier,
            passerCommande,
            acheterOffre,
            estFavori,
            toggleFavori,
        ]
    );

    return <PanierContext.Provider value={value}>{children}</PanierContext.Provider>;
}

export function usePanier() {
    const ctx = useContext(PanierContext);
    if (!ctx) throw new Error("usePanier doit être utilisé dans un PanierProvider");
    return ctx;
}
