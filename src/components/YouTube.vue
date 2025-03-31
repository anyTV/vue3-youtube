<template>
    <div :style="wrapperStyle">
        <div ref="youtube" :style="wrapperStyle" />
    </div>
</template>

<script setup lang="ts">
import { StyleValue, computed, onBeforeUnmount, onMounted, readonly, ref, watch } from 'vue';
// issues occurred while trying to import 'get-youtube-id' when using Youtube.vue as a thirdparty module
//import getYouTubeID from 'get-youtube-id';
import { PlayerVars } from './types';
import { useAPI } from './api';

interface Window {
    onYouTubeIframeAPIReadyResolvers?: { (): void }[]
    onYouTubeIframeAPIReady?: { (): void }
}

interface Props {
    src?: string
    height?: number | string
    width?: number | string
    host?: string
    vars?: PlayerVars,
    strictSrc?: boolean
}

interface Emits {
    (event: 'ready', e: any): void
    (event: 'state-change', e: any): void
    (event: 'playback-quality-change', e: any): void
    (event: 'playback-rate-change', e: any): void
    (event: 'error', e: any): void
    (event: 'api-error', e: any): void
    (event: 'api-change', e: any): void
    (event: 'api-load'): void
    (event: 'autoplay-blocked', e: any): void
}

const props = withDefaults(defineProps<Props>(), {
    height: 360,
    width: 640,
    host: 'https://www.youtube.com',
    strictSrc: false
});

const emits = defineEmits<Emits>();

const wrapperStyle = computed<StyleValue>(() => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
    position: 'relative',
}));

const youtube = ref<HTMLElement>();
const player = ref<YT.Player>();
const initiated = ref(false);
const ready = ref(false);

function initPlayer(div: HTMLElement) {
    if (!window.YT) {
        emits('api-error', new ErrorEvent('YouTube API does not exist'));
        return;
    }
    else {
        emits('api-load');
    }

    if (props.strictSrc && !props.src) {
        // do not initialize player if src is empty and strict-src is set to true
        return;
    }

    initiated.value = true
    // @ts-ignore
    // eslint-disable-next-line no-undef
    player.value = new YT.Player(div, {
        height: props.height,
        width: props.width,
        videoId: props.src,
        host: props.host,
        playerVars: props.vars,
        events: {
            onReady: (e: any) => {
                ready.value = true
                setTimeout(() => emits('ready', e))
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
    })
}

function on_mounted(div: HTMLElement) {
    let resolver = () => {};
    const promise = new Promise((resolve: (reason?: any) => void) => resolver = resolve);
    promise.then(() => initPlayer(div));

    if (!(window as Window).onYouTubeIframeAPIReadyResolvers) {
        (window as Window).onYouTubeIframeAPIReadyResolvers = []
    }
    if (!(window as Window).onYouTubeIframeAPIReady) {
        (window as Window).onYouTubeIframeAPIReady = () => {
            // eslint-disable-next-line no-unused-expressions
            (window as Window).onYouTubeIframeAPIReadyResolvers?.forEach((resolver: Function) => {
                resolver()
            })
        }
    }

    const id = 'youtube-iframe-js-api-script'
    let tag = document.getElementById(id) as HTMLScriptElement
    if (!tag) {
        (window as Window).onYouTubeIframeAPIReadyResolvers?.push(resolver);
        tag = document.createElement('script')
        tag.id = id
        tag.src = 'https://www.youtube.com/iframe_api'
        tag.onerror = (e) => emits('api-error', e);
        const firstScriptTag = document.getElementsByTagName('script')[0]
        if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        }
    }
    else {
        resolver();
    }
}

watch(() => props.width, () => {
    player.value?.setSize(+props.width, +props.height);
});

watch(() => props.height, () => {
    player.value?.setSize(+props.width, +props.height);
});

watch(() => props.src, () => {
    if (!initiated.value) {
        initPlayer(<HTMLElement>youtube.value);
    }

    if (initiated.value
        && ready.value
        && Boolean(player.value)
        && props.src
    ) {
        player.value?.loadVideoById(props.src, props.vars?.start ?? 0);
    }
});

onMounted(() => {
    on_mounted(<HTMLElement>youtube.value);
})

onBeforeUnmount(() => {
    player.value?.destroy();
});

defineExpose({
    player: readonly(player),
    initiated: readonly(initiated),
    ready: readonly(ready),
    ...useAPI({ player })
});
</script>
