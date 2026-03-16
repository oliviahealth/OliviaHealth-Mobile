import { View, Text, Animated, Dimensions } from "react-native";
import { useEffect, useRef } from "react";

export default function ErrorPopup({ message, visible }: {
    message: string;
    visible: boolean;
}) {
    const slideAnim = useRef(new Animated.Value(-80)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 50 : -180,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <Animated.View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                alignItems: "center",
                transform: [{ translateY: slideAnim }],
                zIndex: 1000,
            }}
        >
            <View
                style={{
                    backgroundColor: "#D32F2F",
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    maxWidth: Dimensions.get("window").width - 32,
                }}
            >
                <Text
                    style={{
                        color: "#FFF",
                        fontSize: 14,
                        textAlign: "center",
                    }}
                >
                    {message}
                </Text>
            </View>
        </Animated.View>
    );
}