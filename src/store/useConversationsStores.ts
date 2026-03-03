import { create } from 'zustand';

import { z } from 'zod';
import { IOllieResponse, OllieResponseSchema } from '../utils/interfaces';

export const ConversationSchema = z.object({
    id: z.string(),
    title: z.string(),
    date_created: z.date(),
    date_updated: z.date(),
    responses: z.array(OllieResponseSchema)
});
export type IConversation = z.infer<typeof ConversationSchema>;

export interface IConversationsState {
    conversations: { [key: string]: IConversation };
    addResponse: (response: IOllieResponse) => void; // Add response to conversation. If conversation record doesn't exist, add it
}

const useConversationsStore = create<IConversationsState>()((set, get) => ({
    conversations: {},
    addResponse: (response) => {
        const { conversationId } = response;

        set((state) => {
            const existing = state.conversations[conversationId];

            const now = new Date();

            const conversation: IConversation =
                existing ??
                ({
                    id: conversationId,
                    title: response.userQuery,
                    date_created: now,
                    date_updated: now,
                    responses: [],
                } as IConversation);

            return {
                conversations: {
                    ...state.conversations,
                    [conversationId]: {
                        ...conversation,
                        date_updated: now,
                        responses: [...conversation.responses, response],
                    },
                },
            };
        });
    },
}))

export default useConversationsStore;