import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from "zod";
import { create } from 'zustand';

import ConceptionIcon from "@/assets/images/journey_icons/conception.svg";
import FirstTrimesterIcon from "@/assets/images/journey_icons/first_trimester.svg";
import LaborAndDeliveryIcon from "@/assets/images/journey_icons/labor_and_delivery.svg";
import NewbornIcon from "@/assets/images/journey_icons/newborn.svg";
import PostpartumIcon from "@/assets/images/journey_icons/postpartum.svg";
import PreconceptionIcon from "@/assets/images/journey_icons/preconception.svg";
import PrematureBirthIcon from "@/assets/images/journey_icons/premature_birth.svg";
import SecondTrimesterIcon from "@/assets/images/journey_icons/second_trimester.svg";
import ThirdTrimesterIcon from "@/assets/images/journey_icons/third_trimester.svg";
import YearOneIcon from "@/assets/images/journey_icons/year1.svg";
import YearTwoIcon from "@/assets/images/journey_icons/year2.svg";
import YearThreeIcon from "@/assets/images/journey_icons/year3.svg";

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

export const IslandSubcategorySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  infographics: z.array(z.string()).optional(),
});
export type IIslandSubcategories = z.infer<typeof IslandSubcategorySchema>;

export const IslandSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: z
    .object({
      name: z.string().optional(),
      icon: z.string().optional(),
      description: z.string().optional(),
      secondary_name: z.string().optional(),
      color: z.string().optional(),
      order: z.number().optional(),
      subcategories: z.array(IslandSubcategorySchema).optional(),
    })
    .optional(),
});
export type IIslands = z.infer<typeof IslandSchema>;

export const JourneyDetailSchema = IslandSubcategorySchema.extend({
  progress: z.number().min(0).max(100),
});

export type IJourneyDetail = z.infer<typeof JourneyDetailSchema>;

/** ========= Collection schemas ========= */

export const ResourcesSchema = z.object({
  local_resources: z.array(LocalResourceSchema),
  video_spotlights: z.array(VideoSpotlightSchema),
  quick_tips: z.array(QuickTipSchema),
  infographics: z.array(InfographicSchema),
  islands: z.array(IslandSchema)
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
  resources: IResources | null;
  setResources: (resources: IResources) => void;
  savedResources: ISavedResourceIds;
  icon_map: Record<string, any>
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

export enum ResourceStorageKeys {
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
  icon_map: {
    "shooting star": PreconceptionIcon,
    sparkle: ConceptionIcon,
    acorn: FirstTrimesterIcon,
    "plant pot": SecondTrimesterIcon,
    "growing plant": ThirdTrimesterIcon,
    flower: LaborAndDeliveryIcon,
    nest: PostpartumIcon,
    sunrise: PrematureBirthIcon,
    "hatching egg": NewbornIcon,
    "newborn bird": YearOneIcon,
    "young bird": YearTwoIcon,
    bird: YearThreeIcon,
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
        ResourceStorageKeys.SAVED_RESOURCES,
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
        ResourceStorageKeys.SAVED_RESOURCES,
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
      ResourceStorageKeys.SAVED_RESOURCES,
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
