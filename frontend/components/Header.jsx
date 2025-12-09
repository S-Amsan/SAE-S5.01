import {View, Text, TouchableOpacity, Image, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";

export default function Header({ title }) {
    const navigation = useNavigation();

    return (
        <View style={{
            backgroundColor: "#1DDE9A",
            paddingVertical: 10,
            paddingHorizontal: 15,
            elevation: 4,
        }}>

            {/* --- FULL ROW : MENU + TITRE + SEARCH + FILTERS --- */}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
            }}>

                {/* Menu bouton */}
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        source={require("../assets/menu.png")}
                        style={{ width: 26, height: 26, tintColor: "#fff" }}
                    />
                </TouchableOpacity>

                {/* Title */}
                <Text style={{
                    marginLeft: 12,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#fff",
                }}>
                    {title}
                </Text>

                {/* CONTAINER SEARCH + FILTERS */}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    marginLeft: 15,
                }}>

                    {/* SEARCH */}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        height: 40,
                        flex: 1,
                        marginRight: 10,
                        minWidth: 150,
                    }}>
                        <Ionicons name="search" size={18} color="#777" />
                        <TextInput
                            placeholder="Rechercher"
                            placeholderTextColor="#777"
                            style={{ marginLeft: 6, flex: 1, outlineStyle: "none", }}
                        />
                    </View>

                    {/* FILTER 1 */}
                    <TouchableOpacity style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        paddingHorizontal: 12,
                        height: 40,
                        borderRadius: 12,
                        marginRight: 10,
                    }}>
                        <Text>Récent</Text>
                        <Ionicons name="chevron-down" size={16} color="#000" />
                    </TouchableOpacity>

                    {/* FILTER 2 */}
                    <TouchableOpacity style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        paddingHorizontal: 12,
                        height: 40,
                        borderRadius: 12,
                    }}>
                        <Text>France</Text>
                        <Ionicons name="chevron-down" size={16} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
