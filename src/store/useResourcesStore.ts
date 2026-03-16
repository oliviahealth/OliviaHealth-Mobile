import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { z } from "zod";

export const LocalResourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  video_url: z.string(),
  video_id: z.string(),
  video_description: z.string(),
  transcript: z.string(),
  thumbnail_url: z.string(),
  spotlight: z.boolean().optional(),
});
export type ILocalResources = z.infer<typeof LocalResourceSchema>;

export const VideoSpotlightSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  video_url: z.string(),
  video_id: z.string(),
  video_description: z.string(),
  transcript: z.string(),
  thumbnail_url: z.string(),
  spotlight: z.boolean().optional(),
});
export type IVideoSpotlights = z.infer<typeof VideoSpotlightSchema>;

export const QuickTipSchema = z.object({
  id: z.string(),
  title: z.string(),
  video_url: z.string(),
  video_id: z.string(),
  description: z.string(),
  infographic_url: z.string(),
  infographic_description: z.string(),
  transcript: z.string(),
  thumbnail_url: z.string(),
  spotlight: z.boolean().optional(),
});
export type IQuickTips = z.infer<typeof QuickTipSchema>;

export const InfographicSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnail_url: z.string(),
  infographic_url: z.string(),
  spotlight: z.boolean().optional(),
});
export type IInfographics = z.infer<typeof InfographicSchema>;

/** ========= Collection schemas ========= */

export const ResourcesSchema = z.object({
  local_resources: z.array(LocalResourceSchema),
  video_spotlights: z.array(VideoSpotlightSchema),
  quick_tips: z.array(QuickTipSchema),
  infographics: z.array(InfographicSchema),
});
export type IResources = z.infer<typeof ResourcesSchema>;

/** Union of any single resource item (runtime + type) */
export const ResourceItemSchema = z.union([
  LocalResourceSchema,
  VideoSpotlightSchema,
  QuickTipSchema,
  InfographicSchema,
]);
export type IResourceItem = z.infer<typeof ResourceItemSchema>;

/** ========= Saved IDs + State schemas ========= */

export const SavedResourceIdsSchema = z.object({
  local_resources: z.array(z.string()),
  video_spotlights: z.array(z.string()),
  quick_tips: z.array(z.string()),
  infographics: z.array(z.string()),
});
export type ISavedResourceIds = z.infer<typeof SavedResourceIdsSchema>;

export interface IResourcesState {
    resources: IResources | null
    setResources: (resources: IResources) => void
    savedResources: ISavedResourceIds
    addToSavedResources: (key: "local_resources" | "video_spotlights" | "quick_tips" | "infographics", resourceId: string) => void
    removeFromSavedResources: (key: "local_resources" | "video_spotlights" | "quick_tips" | "infographics", resourceId: string) => void
    setSavedResources: (savedResources: ISavedResourceIds) => void
}

export enum AsyncStorageKeys {
    SAVED_RESOURCES = 'savedResources',
    FIRST_LAUNCH = 'firstLaunch'
}

const useResourcesStore = create<IResourcesState>()((set, get) => ({
    resources: null,
    setResources: (resources) => set(() => ({ resources })),
    savedResources: { local_resources: [], video_spotlights: [], quick_tips: [], infographics: [] },
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
            AsyncStorage.setItem(AsyncStorageKeys.SAVED_RESOURCES, JSON.stringify(newSavedResources))
                .catch(error => console.error('Error saving to AsyncStorage:', error));

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
            AsyncStorage.setItem(AsyncStorageKeys.SAVED_RESOURCES, JSON.stringify(newSavedResources))
                .catch(error => console.error('Error saving to AsyncStorage:', error));

            return {
                savedResources: newSavedResources,
            };
        });
    },
    setSavedResources: (savedResources) => set({ savedResources })
}));

// Helper function to load saved resources from AsyncStorage
export const loadSavedResources = async () => {
    try {
        const savedData = await AsyncStorage.getItem(AsyncStorageKeys.SAVED_RESOURCES);
        if (savedData) {
            const parsedData: ISavedResourceIds = JSON.parse(savedData);
            useResourcesStore.getState().setSavedResources(parsedData);
        }
    } catch (error) {
        console.error('Error loading from AsyncStorage:', error);
    }
};

export default useResourcesStore;