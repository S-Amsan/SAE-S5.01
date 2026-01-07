import {StyleSheet, View} from "react-native";
import React from "react";


export default function OverlaySombre({children}) {

    return (
        <View>
            {children}
            {React.cloneElement(children, {
                style: [children.props.style, styles.overlay],
            })}
        </View>
    )

}

const styles = StyleSheet.create({
    overlay: {
        opacity: 0.7,
        tintColor: "#000000",
        position: "absolute"
    }
})
