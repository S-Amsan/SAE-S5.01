import {Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import SectionProduits from "../../../components/boutique/sectionProduits";
import Header from "../../../components/Header";
import {useRouter} from "expo-router";
import BlocInfos from "../../../components/boutique/blocInfos";

export default function Index() {

    const router = useRouter();

    return (
        <ScrollView>
            <Header title={"Boutique"}/>

            <BlocInfos/>
            <SectionProduits/>


        </ScrollView>

    );

}

const styles = StyleSheet.create({
    conteneur: {
        padding: 16
    }
});