import { z } from "zod";
import { create } from "zustand";
import { IProfessionalItem, ProfessionalItemSchema } from "./useResourcesStore";

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  professionalItems: z.array(ProfessionalItemSchema),
});
export type ITopic = z.infer<typeof TopicSchema>;

export interface IProfessionalsState {
  topics: ITopic[];
  setTopics: (topics: ITopic[]) => void;

  selectedTopic: ITopic | null;
  setSelectedTopic: (topic: ITopic) => void;

  selectedProfessionalItem: IProfessionalItem | null;
  setSelectedProfessionalItem: (item: IProfessionalItem) => void;
}

export const useProfessionalsStore = create<IProfessionalsState>((set) => ({
  topics: [],
  setTopics: (topics: ITopic[]) => set({ topics }),

  selectedTopic: null,
  setSelectedTopic: (topic: ITopic) => set({ selectedTopic: topic }),

  selectedProfessionalItem: null,
  setSelectedProfessionalItem: (item: IProfessionalItem) =>
    set({ selectedProfessionalItem: item }),
}));
