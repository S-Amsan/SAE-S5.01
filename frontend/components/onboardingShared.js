export const slides = [
    {
        key: "welcome",
        title: "Agis pour la planète et gagne des récompenses",
        subtitle: "Bienvenue sur EcoCeption",
        text: "Chaque geste écolo compte ! Scanne, recycle, partage ou récupère des objets pour accumuler des points et grimper dans le classement.",
    },
    {
        key: "points",
        title: "Réalise des actions écologiques",
        subtitle: "Gagner des points",
        text: "Recycle un produit partenaire en scannant son QR code, prends une photo de ton geste ou déplace-toi en transport doux. Chaque action validée te rapporte des points.",
    },
    {
        key: "use-points",
        title: "Échange tes points contre des récompenses",
        subtitle: "Utiliser tes points",
        text: "Tes points te permettent d’obtenir des cartes cadeaux, des réductions chez nos partenaires ou de faire un don à une association. Plus tu agis, plus tu gagnes.",
    },
    {
        key: "community",
        title: "Partage et valide les actions des autres",
        subtitle: "Participer au fil communautaire",
        text: "Publie tes photos dans le fil communautaire, découvre les gestes des autres utilisateurs et aide à valider leurs actions. Ensemble, on rend l’écologie plus fun et collective.",
    },
    {
        key: "objects",
        title: "Donne une seconde vie aux objets",
        subtitle: "Récupérer des objets",
        text: "Trouve autour de toi des objets abandonnés à récupérer. Poste une photo pour signaler un objet, ou prends-en une après l’avoir récupéré pour gagner encore plus de points.",
    },
    {
        key: "missions",
        title: "Relève des défis mensuels",
        subtitle: "Concours et missions",
        text: "Participe à des concours ou à des événements écologiques pour booster ton score. Chaque mois, des récompenses spéciales t’attendent.",
    },
    {
        key: "ranking",
        title: "Progresse dans le classement",
        subtitle: "Classement et rang",
        text: "Chaque action te permet de gagner des points, convertis automatiquement en trophées. Ton score te fait monter dans le leaderboard et évoluer en rang, reflétant ton engagement écologique.",
    },
    {
        key: "start",
        title: "À ton tour d’agir !",
        subtitle: "Prêt à commencer ?",
        text: "Choisis une mission, passe à l’action et fais partie de la Green Nation. Ensemble, on change les habitudes… un geste à la fois.",
    },
];

import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const styles = {
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: isWeb ? "50%" : "90%",
        height: "60%",
        backgroundColor: "#fff",
        borderRadius: 30,
        padding: 24,
    },
    close: {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 10,
    },
    logo: {
        width: isWeb ? 140 : 100,
        height: isWeb ? 180 : 140,
        alignSelf: "center",
        marginBottom: 20,
    },
    slide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 16,
        textAlign: "center",
    },
    text: {
        fontSize: 14,
        textAlign: "center",
        color: "#666",
    },
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 16,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ddd",
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: "#22c55e",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    prev: {
        color: "#aaa",
        fontSize: 16,
    },
    next: {
        color: "#22c55e",
        fontSize: 18,
        fontWeight: "600",
    },
};
