import {StyleSheet, Text, View} from "react-native";

export default function BlocInfos(){
    return(
        <View style={styles.infos}>
            <Text>Nouveau partenaire dans la boutique</Text>
            <Text>Voir plus</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    infos : {
        margin: 50,
        padding: 100,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
    }
});