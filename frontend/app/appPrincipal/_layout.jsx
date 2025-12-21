import { Drawer } from "expo-router/drawer";
import Navbar from "../../components/Navbar";
import {Platform} from "react-native";
import {Stack} from "expo-router";


export default function Layout() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="accueil" />
            <Stack.Screen name="missions" />
            <Stack.Screen name="social"/>
            <Stack.Screen name="boutique" />
            <Stack.Screen name="codebar" />
            <Stack.Screen name="notifications"/>
            <Stack.Screen name="parametres"/>
        </Stack>
    )

    /*
    (
        <Drawer
            drawerContent={(props) => <Navbar {...props}/>}
            screenOptions={{
                headerShown: false,
                drawerType: "front",
                drawerStyle: {
                    backgroundColor: "transparent",
                    width: "20%",
                },
                drawerContentContainerStyle: {
                    flex: 1,
                    paddingBottom: 0,
                    backgroundColor: "transparent",
                },
            }}
        >


        <Drawer.Screen name="accueil"/>
            <Drawer.Screen name="missions" />
            <Drawer.Screen name="social" />
            <Drawer.Screen name="boutique" />
            <Drawer.Screen name="qrcode" />
            <Drawer.Screen name="notifications" />
            <Drawer.Screen name="parametres" />
        </Drawer>
    );
     */
}
