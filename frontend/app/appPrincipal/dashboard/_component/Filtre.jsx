import React from "react";
import {Modal, Pressable, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const ITEM_HEIGHT = 34;

export default function Filtre ({filtres = [], value, onChange, placeholder = "Filtrer", style,}) {

    const [open, setOpen] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null); // {x,y,width,height}
    const btnRef = React.useRef(null);

    const label = value ?? placeholder;

    const openMenu = () => {

        if (btnRef.current?.measureInWindow) {
            btnRef.current.measureInWindow((x, y, width, height) => {
                setAnchor({ x, y, width, height });
                setOpen(true);
            });
        } else {
            setOpen(true);
        }
    };

    return (
        <View style={[{ position: "relative" }, style]}>
            <Pressable
                ref={btnRef}
                onPress={openMenu}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor: "#bebebe",
                    borderRadius: 7,
                    paddingHorizontal: 10,
                    height: 30,
                    backgroundColor: "#fff",
                }}
            >
                <Text style={{ color: value ? "#111" : "#777", fontSize: 12 }}>
                    {label}
                </Text>
                <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} color="#777" />
            </Pressable>

            <Modal transparent visible={open} animationType="none" onRequestClose={() => setOpen(false)}>
                {/* overlay cliquable pour fermer, quand le click est en dehors de la liste*/}
                <Pressable
                    onPress={() => setOpen(false)}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                />

                <View
                    style={{
                        position: "absolute",
                        top: (anchor?.y ?? 0) + (anchor?.height ?? 30) + 4,
                        left: anchor?.x ?? 0,
                        width: anchor?.width ?? 160,
                        backgroundColor: "#fff",
                        borderWidth: 1,
                        borderColor: "#bebebe",
                        borderRadius: 7,
                        overflow: "hidden",
                    }}
                >
                    {filtres.map((f) => (
                        <Pressable
                            key={f}
                            onPress={() => {
                                onChange?.(f);
                                setOpen(false);
                            }}
                            style={({ pressed }) => ({
                                height: ITEM_HEIGHT,
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                backgroundColor: pressed ? "#f2f2f2" : "#fff",
                            })}
                        >
                            <Text style={{ fontSize: 12 }}>{f}</Text>
                        </Pressable>
                    ))}
                </View>
            </Modal>
        </View>
    );
}
