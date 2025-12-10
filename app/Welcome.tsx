import { AsyncStorageKeys } from "@/src/store/useResourcesStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function WelcomeScreen() {
    const router = useRouter();

    const goToHome = () => {
        router.push("/(tabs)/(home)")
    }

    useEffect(() => {
        const setFirstLaunch = async () => {
            await AsyncStorage.setItem(AsyncStorageKeys.FIRST_LAUNCH, 'false');
        }

        setFirstLaunch();
    }, []);

    return (
        <ImageBackground
            source={require("../assets/images/olivia-splash-2.png")}
            style={{ flex: 1, width: "100%", height: "100%" }}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <View style={styles.dragHandle} />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Text style={styles.title}>Welcome to Olivia Health</Text>

                        <Text style={styles.description}>
                            The OLIVIA project is a uniquely expansive and powerful
                            interdisciplinary research and development effort led by the
                            Texas A&M School of Nursing in partnership with Phillips.
                        </Text>

                        <Text style={styles.description}>
                            Funded by a TAMU Health seedling grant, OLIVIA integrates
                            academia, industry, community and government partners including:
                            Texas A&M University, Amazon, Phillips, Texas Health and Human
                            Services Commission, Texas A&M Center for Applied Technology,
                            project REACH, Driscol Health System and HealthPoint.
                        </Text>
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={goToHome}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 12,
        paddingHorizontal: 24,
        paddingBottom: 24,
        maxHeight: "60%",
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: "#D1D5DB",
        borderRadius: 3,
        alignSelf: "center",
        marginBottom: 12,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 16,
        textAlign: 'center'
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: "#6B7280",
        marginBottom: 8,
    },
    button: {
        backgroundColor: "#B642D3",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 4,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});