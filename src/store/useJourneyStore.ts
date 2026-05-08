import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useResourcesStore from './useResourcesStore';

export interface IJourneyProgress {
    islands: {
        id: string;
        subcategories: {
            id: string;
            viewedInfographics: Set<string>;
        }[];
    }[];
}

export interface IJourneyState {
    progress: IJourneyProgress;
}

export enum JourneyStorageKeys {
    JOURNEY_PROGRESS = 'journey_progress',
}

export const fetchSavedProgress = async (): Promise<IJourneyProgress | null> => {
    try {
        const savedProgress = await AsyncStorage.getItem(
            JourneyStorageKeys.JOURNEY_PROGRESS
        );

        if (!savedProgress) return null;

        const parsed = JSON.parse(savedProgress);

        return {
            islands:
                parsed.islands?.map((island: any) => ({
                    id: island.id,
                    subcategories:
                        island.subcategories?.map((subcategory: any) => ({
                            id: subcategory.id,
                            viewedInfographics: new Set<string>(
                                subcategory.viewedInfographics ?? []
                            ),
                        })) || [],
                })) || [],
        };
    } catch (error) {
        console.error('Error loading from AsyncStorage:', error);
        return null;
    }
};

const serializeProgress = (progress: IJourneyProgress) => ({
    islands: progress.islands.map((island) => ({
        id: island.id,
        subcategories: island.subcategories.map((subcategory) => ({
            id: subcategory.id,
            viewedInfographics: Array.from(subcategory.viewedInfographics),
        })),
    })),
});

const createDefaultProgress = (): IJourneyProgress => ({
    islands:
        useResourcesStore.getState().resources?.islands?.map((island) => ({
            id: island.id,
            subcategories:
                island.data?.subcategories?.map((subcategory) => ({
                    id: subcategory.id,
                    viewedInfographics: new Set<string>(),
                })) || [],
        })) || [],
});

const useJourneyStore = create<IJourneyState>()(() => ({
    progress: {
        islands: [],
    },
}));

let hasInitializedProgress = false;

const autoInitializeProgress = async () => {
    if (hasInitializedProgress) return;

    const resources = useResourcesStore.getState().resources;
    if (!resources?.islands?.length) return;

    hasInitializedProgress = true;

    const savedProgress = await fetchSavedProgress();

    if (savedProgress && savedProgress.islands.length > 0) {
        useJourneyStore.setState({ progress: savedProgress });
        return;
    }

    const defaultProgress = createDefaultProgress();

    useJourneyStore.setState({ progress: defaultProgress });

    AsyncStorage.setItem(
        JourneyStorageKeys.JOURNEY_PROGRESS,
        JSON.stringify(serializeProgress(defaultProgress))
    ).catch((error) =>
        console.error('Error saving default progress:', error)
    );
};

useResourcesStore.subscribe(() => {
    autoInitializeProgress();
});

autoInitializeProgress();

export const saveProgress = (
    islandId: string,
    islandSubcategoryId: string,
    infographicId: string
) => {
    const progress = useJourneyStore.getState().progress;

    const updatedProgress: IJourneyProgress = {
        ...progress,
        islands: progress.islands.map((island) => {
            if (island.id !== islandId) return island;

            return {
                ...island,
                subcategories: island.subcategories.map((subcategory) => {
                    if (subcategory.id !== islandSubcategoryId) return subcategory;

                    return {
                        ...subcategory,
                        viewedInfographics: infographicId
                            ? new Set([
                                ...subcategory.viewedInfographics,
                                infographicId,
                            ])
                            : subcategory.viewedInfographics,
                    };
                }),
            };
        }),
    };

    useJourneyStore.setState({ progress: updatedProgress });

    AsyncStorage.setItem(
        JourneyStorageKeys.JOURNEY_PROGRESS,
        JSON.stringify(serializeProgress(updatedProgress))
    ).catch((error) => console.error('Error saving to AsyncStorage:', error));

    return {
        progress: updatedProgress,
    };
};

export default useJourneyStore;