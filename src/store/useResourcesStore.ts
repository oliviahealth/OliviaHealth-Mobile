import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface DetailItem {
  title: string;
  progress: number;
  borderColor: string;
  fillColor: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export interface ILocalResources {
  id: string;
  title: string;
  subtitle: string;
  video_url: string;
  video_id: string;
  video_description: string;
  transcript: string;
  thumbnail_url: string;
  spotlight?: boolean;
}

export interface IVideoSpotlights {
  id: string;
  title: string;
  subtitle: string;
  video_url: string;
  video_id: string;
  video_description: string;
  transcript: string;
  thumbnail_url: string;
  spotlight?: boolean;
}

export interface IQuickTips {
  id: string;
  title: string;
  video_url: string;
  video_id: string;
  description: string;
  infographic_url: string;
  infographic_description: string;
  transcript: string;
  thumbnail_url: string;
  spotlight?: boolean;
}

export interface IInfographics {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  infographic_url: string;
  spotlight?: boolean;
}

export interface IResources {
  local_resources: ILocalResources[];
  video_spotlights: IVideoSpotlights[];
  quick_tips: IQuickTips[];
  infographics: IInfographics[];
}
export type IResourceItem = IResources[keyof IResources][number];

export interface ISavedResourceIds {
  local_resources: string[];
  video_spotlights: string[];
  quick_tips: string[];
  infographics: string[];
}

export interface IResourcesState {
  resources: IResources | null;
  setResources: (resources: IResources) => void;
  savedResources: ISavedResourceIds;
  addToSavedResources: (
    key: "local_resources" | "video_spotlights" | "quick_tips" | "infographics",
    resourceId: string,
  ) => void;
  removeFromSavedResources: (
    key: "local_resources" | "video_spotlights" | "quick_tips" | "infographics",
    resourceId: string,
  ) => void;
  setSavedResources: (savedResources: ISavedResourceIds) => void;
}

export enum AsyncStorageKeys {
  SAVED_RESOURCES = "savedResources",
  FIRST_LAUNCH = "firstLaunch",
}

const useResourcesStore = create<IResourcesState>()((set, get) => ({
  resources: null,
  setResources: (resources) => set(() => ({ resources })),
  savedResources: {
    local_resources: [],
    video_spotlights: [],
    quick_tips: [],
    infographics: [],
  },
  addToSavedResources: async (key, resourceId) => {
    set((state) => {
      const currentList = state.savedResources[key];
      // Prevent duplicates
      if (currentList.includes(resourceId)) {
        return state;
      }
      const newSavedResources = {
        ...state.savedResources,
        [key]: [...currentList, resourceId],
      };

      // Save to AsyncStorage
      AsyncStorage.setItem(
        AsyncStorageKeys.SAVED_RESOURCES,
        JSON.stringify(newSavedResources),
      ).catch((error) => console.error("Error saving to AsyncStorage:", error));

      return {
        savedResources: newSavedResources,
      };
    });
  },
  removeFromSavedResources: async (key, resourceId) => {
    set((state) => {
      const currentList = state.savedResources[key];
      const newSavedResources = {
        ...state.savedResources,
        [key]: currentList.filter((id) => id !== resourceId),
      };

      // Save to AsyncStorage
      AsyncStorage.setItem(
        AsyncStorageKeys.SAVED_RESOURCES,
        JSON.stringify(newSavedResources),
      ).catch((error) => console.error("Error saving to AsyncStorage:", error));

      return {
        savedResources: newSavedResources,
      };
    });
  },
  setSavedResources: (savedResources) => set({ savedResources }),
}));

// Helper function to load saved resources from AsyncStorage
export const loadSavedResources = async () => {
  try {
    const savedData = await AsyncStorage.getItem(
      AsyncStorageKeys.SAVED_RESOURCES,
    );
    if (savedData) {
      const parsedData: ISavedResourceIds = JSON.parse(savedData);
      useResourcesStore.getState().setSavedResources(parsedData);
    }
  } catch (error) {
    console.error("Error loading from AsyncStorage:", error);
  }
};

export default useResourcesStore;
