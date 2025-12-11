import {Pressable, ScrollView, Text, View} from "react-native";
import Header from "../../../components/Header";
import {useRouter} from "expo-router";

export default function Concours(){
    const router = useRouter();

    return(
        <ScrollView>
            <Header title={"Concours"}/>
            <View>
                <Text>
                    Concours
                </Text>

                <Pressable style={{margin : 50, padding : 50, backgroundColor : '#2680b8'}}title="Retour" onPress={() => router.push("../social")}>
                    <Text>Retour</Text>
                </Pressable>
            </View>

        </ScrollView>
    );
};