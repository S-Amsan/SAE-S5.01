import { StyleSheet, Text, View, Image, Pressable, Animated, Easing } from "react-native";
import { useState, useEffect, useRef } from "react";

export default function BlocInfos() {

    const [indexActif, setIndexActif] = useState(0);

    const slides = [
        {
            titre: "Steam est notre nouveau partenaire dans la boutique",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
        },
        {
            titre: "Vous pouvez maintenant faire des dons à des associations depuis la boutique",
            image: "https://afsep.fr/wp-content/uploads/2024/06/Don.jpg",
        },
        {
            titre: "Les cartes cadeaux Amazon sont de nouveau disponibles",
            image: "https://icons.veryicon.com/png/o/application/fill-2/amazon-circle.png",
        },
    ];

    const DELAI_AUTO = 5000;

    const timerRef = useRef(null);
    const directionRef = useRef(1);

    const decalageX = useRef(new Animated.Value(0)).current;
    const opacite = useRef(new Animated.Value(1)).current;

    const animerTransition = (direction) => {
        decalageX.setValue(18 * direction);
        opacite.setValue(0);

        Animated.parallel([
            Animated.timing(opacite, {
                toValue: 1,
                duration: 250,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(decalageX, {
                toValue: 0,
                duration: 250,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    };

    const demarrerAuto = () => {
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            directionRef.current = 1;
            setIndexActif((i) =>
                i === slides.length - 1 ? 0 : i + 1
            );
        }, DELAI_AUTO);
    };

    const reinitialiserAuto = () => {
        demarrerAuto();
    };

    const precedent = () => {
        directionRef.current = -1;
        setIndexActif((i) =>
            i === 0 ? slides.length - 1 : i - 1
        );
        reinitialiserAuto();
    };

    const suivant = () => {
        directionRef.current = 1;
        setIndexActif((i) =>
            i === slides.length - 1 ? 0 : i + 1
        );
        reinitialiserAuto();
    };

    useEffect(() => {
        demarrerAuto();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [slides.length]);

    useEffect(() => {
        animerTransition(directionRef.current);
    }, [indexActif]);

    return (
        <Animated.View
            style={{flex: 1, opacity: opacite, transform: [{ translateX: decalageX }],}}>
            <View style={styles.infos}>
                <Pressable onPress={precedent} style={styles.fleche}>
                    <Text style={styles.flecheTexte}>‹</Text>
                </Pressable>

                <View style={styles.contenuCentre}>
                    <View style={styles.texteBloc}>
                        <View>
                            <Text style={styles.titre} numberOfLines={1} ellipsizeMode="tail">
                                {slides[indexActif].titre}
                            </Text>
                            <Pressable style={{ alignSelf: 'flex-start' }}>
                                <Text style={styles.lien}>Voir plus</Text>
                            </Pressable>
                        </View>

                        <View style={styles.pagination}>
                            {slides.map((_, i) => (
                                <View key={i} style={[
                                    styles.dot, i === indexActif ? styles.dotActif : styles.dotInactif, i === indexActif && { transform: [{ scaleX: 1.05 }, { scaleY: 1.05 }],},
                                    ]}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: slides[indexActif].image }}
                            style={styles.image}
                        />
                    </View>
                </View>

                <Pressable onPress={suivant} style={styles.fleche}>
                    <Text style={styles.flecheTexte}>›</Text>
                </Pressable>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    infos: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,

        marginTop: 40,
        marginLeft : 53,
        width: "93%",
        height: 234,

        paddingHorizontal: 28,
        paddingVertical: 20,
        marginBottom: 42,

        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 3,

    },

    contenuCentre: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 44,
        paddingRight: 10,
    },

    texteBloc: {
        flex: 1,
        height: 170,
        paddingRight: 18,
        paddingTop: 18,
        fontFamily: "Inter",
        position: "relative",
    },

    pagination: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },


    titre: {
        fontSize: 26,
        fontWeight: "400",
        marginBottom: 8,
    },

    lien: {
        fontSize: 15,
        color: "#04DA90",
        textDecorationLine: "underline",
    },

    imageWrapper: {
        width: 160,
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        width: 160,
        height: 160,
        borderRadius: 80,
    },

    fleche: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
    },

    flecheTexte: {
        fontSize: 70,
    },

    dot: {
        width: 86,
        height: 5,
        borderRadius: 3,
        marginHorizontal: 6,
    },

    dotInactif: {
        backgroundColor: "#EFEFEF",
    },
    dotActif: {
        backgroundColor: "#04DA90",
    },
});
