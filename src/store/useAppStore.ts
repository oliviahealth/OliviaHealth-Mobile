import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface IAppState {
    aiConsent: boolean;
    setAiConsent: (aiConsent: boolean) => void
}

export enum AppStorageKeys {
    AI_CONSENT = "aiConsent",
}

const useAppStore = create<IAppState>()((set, get) => ({
    aiConsent: false,
    setAiConsent(aiConsent) {

        AsyncStorage.setItem(
            AppStorageKeys.AI_CONSENT,
            JSON.stringify(aiConsent),
        )
            .then(() => set({ aiConsent }))
            .catch((error) => console.error("Error saving to AsyncStorage:", error));
    },
}));

export const loadAiConsent = async () => {
    try {
        const aiConsentData = await AsyncStorage.getItem(
            AppStorageKeys.AI_CONSENT
        );

        if (aiConsentData) {
            const parsedData = JSON.parse(aiConsentData);
            useAppStore.getState().setAiConsent(parsedData);
        }
    } catch (error) {
        console.error("Error loading from AsyncStorage:", error);
    }
}

export default useAppStore;