import { z } from "zod";

export const JourneyDetailSchema = z.object({
  title: z.string(),
  progress: z.number().min(0).max(100),
  borderColor: z.string(),
  fillColor: z.string(),
  icon: z.string(), // Will be cast to Ionicons.glyphMap[keyof Ionicons.glyphMap] when using it
});
export type IJourneyDetail = z.infer<typeof JourneyDetailSchema>;
