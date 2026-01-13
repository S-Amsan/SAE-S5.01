import {Redirect, useNavigation} from "expo-router";
import {isWeb} from "../../../utils/platform";

export default function Index() {
    const navigation = useNavigation();
    if (!isWeb) navigation.goBack(); // Page accesible que depuis le web

    return <Redirect href="./dashboard/gerer" />;
}
