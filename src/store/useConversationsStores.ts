import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    setConversations: (conversations: { [key: string]: IConversation }) => void
    addResponse: (response: IOllieResponse) => void; // Add response to conversation. If conversation record doesn't exist, add it
}

const useConversationsStore = create<IConversationsState>()((set, get) => ({
    conversations: {},
    setConversations: (conversations) => set(() => ({ conversations })),
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


            const updatedConversationHistory = {
                [conversationId]: {
                    ...conversation,
                    date_updated: now,
                    responses: [...conversation.responses, response],
                },
                ...state.conversations,
            }

            AsyncStorage.setItem('conversationHistory', JSON.stringify(updatedConversationHistory))
                .catch(error => console.error('Error saving to AsyncStorage:', error));

            return {
                conversations: updatedConversationHistory,
            };
        });
    },
}))

export const loadSavedConversations = async () => {
    try {
        const savedData = await AsyncStorage.getItem('conversationHistory');
        if (savedData) {
            const parsedData: { [key: string]: IConversation } = JSON.parse(savedData);
            useConversationsStore.getState().setConversations(parsedData);
        }
    } catch (error) {
        console.error('Error loading from AsyncStorage:', error);
    }
};

export default useConversationsStore;