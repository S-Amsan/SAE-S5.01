import { Text, View, Image, Pressable, Animated, Easing, Platform} from "react-native";
import { useState, useEffect, useRef } from "react";
import styles from "./styles/styles";

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

                {Platform.OS === "web" && (
                    <Pressable onPress={precedent} style={styles.fleche}>
                        <Text style={styles.flecheTexte}>‹</Text>
                    </Pressable>
                )}

                <View style={styles.contenuCentre}>
                    <View style={styles.texteBloc}>
                        <View>
                            <Text style={styles.titre} numberOfLines={2} ellipsizeMode="tail">
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

                {Platform.OS === "web" && (
                    <Pressable onPress={suivant} style={styles.fleche}>
                        <Text style={styles.flecheTexte}>›</Text>
                    </Pressable>
                )}

            </View>
        </Animated.View>
    );
}

