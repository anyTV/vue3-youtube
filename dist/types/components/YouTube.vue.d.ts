/// <reference types="youtube" />
import { PlayerVars } from './types';
interface Props {
    src: string;
    height?: number | string;
    width?: number | string;
    host?: string;
    vars?: PlayerVars;
}
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    height: number;
    width: number;
    host: string;
}>, {
    cueVideoById: (videoId: string, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined) => void;
    loadVideoById: (videoId: string, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined) => void;
    cueVideoByUrl: (mediaContentUrl: string, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined) => void;
    loadVideoByUrl: (mediaContentUrl: string, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined) => void;
    cuePlaylist: (playlist: string | string[], index?: number | undefined, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined) => void;
    loadPlaylist: (playlist: string | string[], index?: number | undefined, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined) => void;
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
    getPlaybackQuality: () => YT.SuggestedVideoQuality;
    setPlaybackQuality: (suggestedQuality: YT.SuggestedVideoQuality) => void;
    getAvailableQualityLevels: () => YT.SuggestedVideoQuality[];
    getDuration: () => number;
    getVideoUrl: () => string;
    getVideoEmbedCode: () => string;
    getPlaylist: () => string[];
    getPlaylistIndex: () => number;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    ready: (e: any) => void;
    "state-change": (e: any) => void;
    "playback-quality-change": (e: any) => void;
    "playback-rate-change": (e: any) => void;
    error: (e: any) => void;
    "api-change": (e: any) => void;
    "autoplay-blocked": (e: any) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    height: number;
    width: number;
    host: string;
}>>> & {
    onError?: ((e: any) => any) | undefined;
    onReady?: ((e: any) => any) | undefined;
    "onState-change"?: ((e: any) => any) | undefined;
    "onPlayback-quality-change"?: ((e: any) => any) | undefined;
    "onPlayback-rate-change"?: ((e: any) => any) | undefined;
    "onApi-change"?: ((e: any) => any) | undefined;
    "onAutoplay-blocked"?: ((e: any) => any) | undefined;
}, {
    height: string | number;
    width: string | number;
    host: string;
}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
