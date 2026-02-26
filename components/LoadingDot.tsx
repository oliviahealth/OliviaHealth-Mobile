import React, { useEffect, useRef } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

type Props = {
    size?: number;
    color?: string;
    durationMs?: number;
    style?: ViewStyle;
};

export default function LoadingDot({
    size = 10,
    color = "#000",
    durationMs = 700,
    style,
}: Props) {
    const scale = useRef(new Animated.Value(0.6)).current;
    const opacity = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(scale, {
                        toValue: 1.1,
                        duration: durationMs,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: durationMs,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(scale, {
                        toValue: 0.6,
                        duration: durationMs,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0.5,
                        duration: durationMs,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );

        loop.start();
        return () => loop.stop();
    }, [durationMs, opacity, scale]);

    return (
        <Animated.View
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    transform: [{ scale }],
                    opacity,
                },
                style,
            ]}
        />
    );
}