import { z } from "zod";
import { create } from "zustand";

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  documents: z.array(z.string()),
});
export type ITopic = z.infer<typeof TopicSchema>;

export interface IProfessionalsState {
  topics: ITopic[];
  setTopics: (topics: ITopic[]) => void;

  selectedTopic: ITopic | null;
  setSelectedTopic: (topic: ITopic) => void;
}

// Sample data
const SAMPLE_TOPICS: ITopic[] = [
  {
    id: "1",
    title: "Safety Protocol",
    documents: ["Safety_Protocol.pdf"],
  },
  {
    id: "2",
    title: "Topic 2",
    documents: ["Safety_Protocol.pdf"],
  },
];

export const useProfessionalsStore = create<IProfessionalsState>((set) => ({
  topics: SAMPLE_TOPICS,
  setTopics: (topics: ITopic[]) => set({ topics }),

  selectedTopic: null,
  setSelectedTopic: (topic: ITopic) => set({ selectedTopic: topic }),
}));
