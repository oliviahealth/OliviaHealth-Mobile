import { create } from 'zustand';

export interface ILocalResources {
    id: string,
    title: string,
    subtitle: string,
    video_url: string,
    video_id: string,
    video_description: string,
    transcript: string,
    thumbnail_url: string,
    spotlight?: boolean
}

export interface IVideoSpotlights {
    id: string,
    title: string,
    subtitle: string,
    video_url: string,
    video_id: string,
    video_description: string,
    transcript: string,
    thumbnail_url: string,
    spotlight?: boolean
}

export interface IQuickTips {
    id: string,
    title: string,
    video_url: string,
    video_id: string,
    description: string,
    infographic_url: string,
    infographic_description: string,
    thumbnail_url: string,
    spotlight?: boolean
}

export interface IInfographics {
    id: string,
    title: string,
    description: string,
    thumbnail_url: string,
    infographic_url: string,
    spotlight?: boolean
}

export interface IResources {
    local_resources: ILocalResources[],
    video_spotlights: IVideoSpotlights[],
    quick_tips: IQuickTips[],
    infographics: IInfographics[]
}

export interface ISavedResources {
    videos: (IVideoSpotlights | ILocalResources)[],
    infographics: IInfographics[]
}

export interface IResourcesState {
    resources: IResources | null
    setResources: (resources: IResources) => void
}

const useResourcesStore = create<IResourcesState>()((set) => ({
    resources: null,
    setResources: (resources) => set(() => ({ resources }))
}));

export default useResourcesStore;