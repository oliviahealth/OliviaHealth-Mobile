import { z } from 'zod';
import { ResourceItemSchema } from '../store/useResourcesStore';

export const LocationSchema = z.object({
    id: z.string(),
    address: z.string(),
    addressLink: z.string().optional(),
    description: z.string(),
    name: z.string(),
    phone: z.string(),
    website: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    rating: z.any(),
    hoursOfOperation: z.array(z.record(z.string(), z.string())),
    isSaved: z.boolean(),
});
export type ILocation = z.infer<typeof LocationSchema>

export const OllieResponseSchema = z.object({
    userQuery: z.string(),
    response: z.string(),
    response_type: z.enum(["location", "direct"]),
    locations: z.array(LocationSchema),
    documents: z.array(z.string()),
    sources: z.array(
        z.object({
            doc: ResourceItemSchema,
            type: z.string(),
        })
    ).optional(),
    dateCreated: z.number(),
    conversationId: z.string()
});
export type IOllieResponse = z.infer<typeof OllieResponseSchema>;