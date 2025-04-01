<template>
    <div :style="wrapperStyle">
        <div ref="youtube" :style="wrapperStyle" />
    </div>
</template>

<script setup lang="ts">
import {
    StyleValue,
    computed,
    onBeforeUnmount,
    onMounted,
    readonly,
    ref,
    watch,
    onBeforeMount,
    Ref
} from 'vue';
// issues occurred while trying to import 'get-youtube-id' when using Youtube.vue as a thirdparty module
//import getYouTubeID from 'get-youtube-id';
import { PlayerVars } from './types';
import { useAPI } from './api';

declare global {
    interface Window {
        onYouTubeIframeAPIReady?: { (): void }

        hbYoutubeIframeAttempts?: number

        YT?: {
            loaded?: boolean
            loading?: boolean
        }

        YTConfig?: {}

        yt_embedsEnableIframeApiSendFullEmbedUrl?: boolean
        yt_embedsEnableAutoplayAndVisibilitySignals?: boolean
    }
}

const props = withDefaults(defineProps<{
    src: string
    height?: number | string
    width?: number | string
    host?: string
    vars?: PlayerVars,
    apiDownloadAttempts?: number,
}>(), {
    height: 360,
    width: 640,
    host: 'https://www.youtube.com',
    apiDownloadAttempts: 3,
});

const emits = defineEmits<{
    (event: 'ready', e: any): void
    (event: 'state-change', e: any): void
    (event: 'playback-quality-change', e: any): void
    (event: 'playback-rate-change', e: any): void
    (event: 'error', e: any): void
    (event: 'autoplay-blocked', e: any): void

    (event: 'api-error', e: any): void

    (event: 'api-change', e: any): void

    (event: 'api-loaded'): void
}>();

const wrapperStyle = computed<StyleValue>(() => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
    position: 'relative',
}));

const youtube = ref<HTMLElement>();

function usePlayer(elementRef: Ref<HTMLElement | undefined>) {
    const youtubeDiv = elementRef;
    const youtubePlayer = ref<YT.Player>();

    const initiated = ref(false);
    const ready = ref(false);
    const loaded = ref(false);

    const youtubeIframeScriptId = 'youtube-iframe-js-api-script';
    const youtubeWidgetScriptId = 'www-widgetapi-script';

    function destroy () {
        if (youtubePlayer.value) {
            youtubePlayer.value.destroy();
        }
    }

    async function createPlayer() {
        try {
            if (!props.src || youtubePlayer.value || !loaded.value) {
                return;
            }

            const playerConfig = {
                height: props.height,
                width: props.width,
                videoId: props.src,
                host: props.host,
                playerVars: props.vars,
                events: {
                    onReady: (e: any) => {
                        ready.value = true;
                        setTimeout(() => emits('ready', e));
                    },
                    onStateChange: (e: any) => emits('state-change', e),
                    onPlaybackQualityChange: (e: any) => emits('playback-quality-change', e),
                    onPlaybackRateChange: (e: any) => emits('playback-rate-change', e),
                    onError: (e: any) => emits('error', e),
                    onApiChange: (e: any) => emits('api-change', e),
                    onAutoplayBlocked: (e: any) => {
                        // NOTE: avoid calling mute() inside of onReady()
                        //       calling mute() inside of onReady() causes onAutoplayBlocked to not trigger, somehow
                        emits('autoplay-blocked', e);
                    },
                },
            };

            youtubePlayer.value = new YT.Player(youtubeDiv.value!, playerConfig);
        } catch (error) {
            emits('api-error', error);
        }

    }

    function updateSize(w: number | string, h: number | string) {
        if (youtubePlayer.value) {
            youtubePlayer.value.setSize(w, h);
        }
    }

    function load (src: string, start: number) {
        if (youtubePlayer.value) {
            youtubePlayer.value.loadVideoById(src, start);
        }
    }

    function attachReadyEvent() {
        if (!window.onYouTubeIframeAPIReady) {
            window.onYouTubeIframeAPIReady = () => {
                loaded.value = true;
                emits('api-loaded');
            };
        }
    }

    function attachScriptToHeader(tag: HTMLScriptElement) {
        const firstScriptTag = document.getElementsByTagName('script')[0];

        // append iframe script as first script
        if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }

    function redownload(tag: HTMLScriptElement) {
        tag.remove();

        // Companion script for iframe_api
        document.getElementById('www-widgetapi-script')?.remove();

        delete window.yt_embedsEnableIframeApiSendFullEmbedUrl;
        delete window.yt_embedsEnableAutoplayAndVisibilitySignals;
        delete window.YTConfig;

        // @ts-expect-error This should be cleared to be able to reload iframe
        delete window['YT'];

        attachScript();
    }

    function createScriptTag(): HTMLScriptElement {

        let tag = document.createElement('script');

        tag.id = youtubeIframeScriptId;

        tag.src = 'https://www.youtube.com/iframe_api'

        tag.onerror = (e) => {

            window.hbYoutubeIframeAttempts = Math
                .max(0, (window.hbYoutubeIframeAttempts ?? props.apiDownloadAttempts) - 1);

            if (window.hbYoutubeIframeAttempts < 1) {
                console.error('failed to download iframe');
                emits('api-error', new Error('YouTube Iframe API was not loaded'));
            }
            else {
                redownload(tag);
            }
        };

        return tag;
    }

    async function attachScript() {
        let widgetScript = document.getElementById(youtubeWidgetScriptId) as HTMLScriptElement

        const propertyCheckList = [
            window['yt_embedsEnableIframeApiSendFullEmbedUrl'],
            window['yt_embedsEnableAutoplayAndVisibilitySignals'],
            window['YT']?.loaded,
            window['YTConfig'],
        ].filter(Boolean).length >= 4;

        if (widgetScript && propertyCheckList) {
            loaded.value = true;
            emits('api-loaded');
            return;
        }

        let tag = createScriptTag();

        attachScriptToHeader(tag);
    }

    return {
        // Variables

        player: youtubePlayer,

        initiated,
        ready,
        loaded,
        youtubeIframeScriptId,

        // Functions
        attachReadyEvent,
        attachScript,

        createPlayer,

        destroy,

        load,
        updateSize,
    };
}

const Player = usePlayer(youtube);

watch(
    [() => props.width, () => props.height, () => props.src],
    async ([newWidth, newHeight, newSrc]) => {
    Player.updateSize(newWidth, newHeight);

    if (!Player.player.value) {
        await Player.createPlayer();
    }

    if (Player.ready.value) {
        Player.load(newSrc, props.vars?.start ?? 0)
    }
});


onBeforeMount(async () => {
    Player.attachReadyEvent();
    // TODO: Dev-5316 Heartbeat > Youtube player > Split into 2 packages
    await Player.attachScript();
});

onMounted(async () => {
    await Player.createPlayer();
})

onBeforeUnmount(() => {
    Player.destroy();
});

defineExpose({
    player: readonly(Player.player),
    initiated: readonly(Player.initiated),
    ready: readonly(Player.ready),
    scriptId: readonly(ref(Player.youtubeIframeScriptId)),
    ...useAPI({ player: Player.player })
});

</script>
