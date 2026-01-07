import { View, Image } from "react-native";

import zero from '../assets/icones/social/chiffres/0.png';
import zeroSombre from '../assets/icones/social/chiffres/0_sombre.png';
import un from '../assets/icones/social/chiffres/1.png';
import unSombre from '../assets/icones/social/chiffres/1_sombre.png';
import deux from '../assets/icones/social/chiffres/2.png';
import deuxSombre from '../assets/icones/social/chiffres/2_sombre.png';
import trois from '../assets/icones/social/chiffres/3.png';
import troisSombre from '../assets/icones/social/chiffres/3_sombre.png';
import quatre from '../assets/icones/social/chiffres/4.png';
import quatreSombre from '../assets/icones/social/chiffres/4_sombre.png';
import cinq from '../assets/icones/social/chiffres/5.png';
import cinqSombre from '../assets/icones/social/chiffres/5_sombre.png';
import six from '../assets/icones/social/chiffres/6.png';
import sixSombre from '../assets/icones/social/chiffres/6_sombre.png';
import sept from '../assets/icones/social/chiffres/7.png';
import septSombre from '../assets/icones/social/chiffres/7_sombre.png';
import huit from '../assets/icones/social/chiffres/8.png';
import huitSombre from '../assets/icones/social/chiffres/8_sombre.png';
import neuf from '../assets/icones/social/chiffres/9.png';
import neufSombre from '../assets/icones/social/chiffres/9_sombre.png';

const IMAGES = {
    versionNormal: {
        "0": zero,
        "1": un,
        "2": deux,
        "3": trois,
        "4": quatre,
        "5": cinq,
        "6": six,
        "7": sept,
        "8": huit,
        "9": neuf,
    },
    versionSombre: {
        "0": zeroSombre,
        "1": unSombre,
        "2": deuxSombre,
        "3": troisSombre,
        "4": quatreSombre,
        "5": cinqSombre,
        "6": sixSombre,
        "7": septSombre,
        "8": huitSombre,
        "9": neufSombre,
    },
};

export const NombreFlammesImage = ({ n, versionSombre = false }) => {
    if (n == null) return null;

    const IMAGE_BY_CHIFFRE = versionSombre ? IMAGES.versionSombre : IMAGES.versionNormal;

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            {n.toString().split("").map((chiffre, index) => (
                <Image
                    key={index}
                    source={IMAGE_BY_CHIFFRE[chiffre]}
                    style={{
                        width: 35,
                        height: 49,
                        resizeMode: "cover",
                        marginLeft: index === 0 ? 0 : -4,
                    }}
                />
            ))}
        </View>
    );
};

