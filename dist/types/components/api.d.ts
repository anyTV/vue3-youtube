/// <reference types="youtube" />
import { Ref } from 'vue';
import { SuggestedVideoQuality, PlayerState } from './types';
interface APIParams {
    player: Ref<YT.Player | undefined>;
}
export declare function useAPI({ player }: APIParams): {
    cueVideoById: (videoId: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality) => void;
    loadVideoById: (videoId: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality) => void;
    cueVideoByUrl: (mediaContentUrl: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality) => void;
    loadVideoByUrl: (mediaContentUrl: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality) => void;
    cuePlaylist: (playlist: string | string[], index?: number, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality) => void;
    loadPlaylist: (playlist: string | string[], index?: number, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality) => void;
    playVideo: () => void;
    pauseVideo: () => void;
    stopVideo: () => void;
    seekTo: (seconds: number, allowSeekAhead: boolean) => void;
    nextVideo: () => void;
    previousVideo: () => void;
    playVideoAt: (index: number) => void;
    mute: () => void;
    unMute: () => void;
    isMuted: () => boolean;
    setVolume: (volume: number) => void;
    getVolume: () => number;
    getPlaybackRate: () => number;
    setPlaybackRate: (suggestedRate: number) => void;
    getAvailablePlaybackRates: () => number[];
    setLoop: (loopPlaylists: boolean) => void;
    setShuffle: (shufflePlaylist: boolean) => void;
    getVideoLoadedFraction: () => number;
    getPlayerState: () => YT.PlayerState;
    getCurrentTime: () => number;
    getPlaybackQuality: () => SuggestedVideoQuality;
    setPlaybackQuality: (suggestedQuality: SuggestedVideoQuality) => void;
    getAvailableQualityLevels: () => SuggestedVideoQuality[];
    getDuration: () => number;
    getVideoUrl: () => string;
    getVideoEmbedCode: () => string;
    getPlaylist: () => string[];
    getPlaylistIndex: () => number;
};
export {};
