import { z } from "zod";
import { create } from "zustand";

export const DocumentSchema = z.object({
  id: z.string(),
  filename: z.string(),
  uri: z.union([z.number(), z.string()]), // number for local, string for remote
});
export type IDocument = z.infer<typeof DocumentSchema>;

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  documents: z.array(DocumentSchema),
});
export type ITopic = z.infer<typeof TopicSchema>;

// Sample data
const SAMPLE_TOPICS: ITopic[] = [
  {
    id: "1",
    title: "Safety Protocol",
    documents: [
      DocumentSchema.parse({
        id: "doc-1",
        filename: "Safety_Protocol.pdf",
        uri: require("@/src/Safety_Protocol.pdf"),
      }),
    ],
  },
  {
    id: "2",
    title: "Topic 2",
    documents: [
      DocumentSchema.parse({
        id: "doc-2",
        filename: "Safety_Protocol.pdf",
        uri: require("@/src/Safety_Protocol.pdf"),
      }),
    ],
  },
];

export interface IProfessionalsState {
  topics: ITopic[];
  setTopics: (topics: ITopic[]) => void;

  selectedTopic: ITopic | null;
  setSelectedTopic: (topic: ITopic) => void;

  selectedDocument: IDocument | null;
  setSelectedDocument: (document: IDocument) => void;
}

export const useProfessionalsStore = create<IProfessionalsState>((set) => ({
  topics: SAMPLE_TOPICS,
  setTopics: (topics: ITopic[]) => set({ topics }),

  selectedTopic: null,
  setSelectedTopic: (topic: ITopic) => set({ selectedTopic: topic }),

  selectedDocument: null,
  setSelectedDocument: (document: IDocument) =>
    set({ selectedDocument: document }),
}));
