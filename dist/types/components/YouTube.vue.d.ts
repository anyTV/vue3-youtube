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
    player: Readonly<import("vue").Ref<{
        readonly cueVideoById: {
            (videoId: string, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined): void;
            (args: YT.VideoByIdSettings): void;
        };
        readonly loadVideoById: {
            (videoId: string, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined): void;
            (args: YT.VideoByIdSettings): void;
        };
        readonly cueVideoByUrl: {
            (mediaContentUrl: string, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined): void;
            (args: YT.VideoByMediaContentUrlSettings): void;
        };
        readonly loadVideoByUrl: {
            (mediaContentUrl: string, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined): void;
            (args: {
                mediaContentUrl: string;
                startSeconds?: number | undefined;
                endSeconds?: number | undefined;
                suggestedQuality?: YT.SuggestedVideoQuality | undefined;
            }): void;
        };
        readonly cuePlaylist: {
            (playlist: string | string[], index?: number | undefined, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined): void;
            (args: YT.IPlaylistSettings): void;
        };
        readonly loadPlaylist: {
            (playlist: string | string[], index?: number | undefined, startSeconds?: number | undefined, suggestedQuality?: YT.SuggestedVideoQuality | undefined): void;
            (args: YT.IPlaylistSettings): void;
        };
        readonly playVideo: () => void;
        readonly pauseVideo: () => void;
        readonly stopVideo: () => void;
        readonly seekTo: (seconds: number, allowSeekAhead: boolean) => void;
        readonly nextVideo: () => void;
        readonly previousVideo: () => void;
        readonly playVideoAt: (index: number) => void;
        readonly mute: () => void;
        readonly unMute: () => void;
        readonly isMuted: () => boolean;
        readonly setVolume: (volume: number) => void;
        readonly getVolume: () => number;
        readonly setSize: (width: number, height: number) => void;
        readonly getPlaybackRate: () => number;
        readonly setPlaybackRate: (suggestedRate: number) => void;
        readonly getAvailablePlaybackRates: () => number[];
        readonly setLoop: (loopPlaylists: boolean) => void;
        readonly setShuffle: (shufflePlaylist: boolean) => void;
        readonly getVideoLoadedFraction: () => number;
        readonly getPlayerState: () => YT.PlayerState;
        readonly getCurrentTime: () => number;
        readonly getPlaybackQuality: () => YT.SuggestedVideoQuality;
        readonly setPlaybackQuality: (suggestedQuality: YT.SuggestedVideoQuality) => void;
        readonly getAvailableQualityLevels: () => YT.SuggestedVideoQuality[];
        readonly getDuration: () => number;
        readonly getVideoUrl: () => string;
        readonly getSphericalProperties: () => YT.SphericalProperties;
        readonly setSphericalProperties: (option: YT.SphericalProperties) => void;
        readonly getVideoEmbedCode: () => string;
        readonly getPlaylist: () => string[];
        readonly getPlaylistIndex: () => number;
        readonly addEventListener: <TEvent extends YT.PlayerEvent>(eventName: keyof YT.Events, listener: (event: TEvent) => void) => void;
        readonly removeEventListener: <TEvent_1 extends YT.PlayerEvent>(eventName: keyof YT.Events, listener: (event: TEvent_1) => void) => void;
        readonly getIframe: () => HTMLIFrameElement;
        readonly destroy: () => void;
    } | undefined>>;
    initiated: Readonly<import("vue").Ref<boolean>>;
    ready: Readonly<import("vue").Ref<boolean>>;
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
