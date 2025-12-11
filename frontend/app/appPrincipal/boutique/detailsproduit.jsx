import {Pressable, ScrollView, Text, View} from "react-native";
import Header from "../../../components/Header";
import {useRouter} from "expo-router";

export default function Detailsproduit(){
    const router = useRouter();

    return(
        <ScrollView>
            <Header title={"Boutique"}/>
            <View>
                <Text>
                    DetailProduit
                </Text>

                <Pressable style={{margin : 50, padding : 50, backgroundColor : '#2680b8'}}title="Retour" onPress={() => router.push("../boutique")}>
                    <Text>Retour</Text>
                </Pressable>
            </View>

        </ScrollView>
    );
};