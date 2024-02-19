<template>
    <div :style="wrapperStyle">
        <!--
            ref="" somehow didn't work,
            Vdiv is a work around to get the element
        -->
        <Vdiv :wrapperStyle="wrapperStyle" @load="on_load" />
    </div>
</template>

<script setup lang="ts">
import { StyleValue, computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, readonly, ref, watch } from 'vue';
import getYouTubeID from 'get-youtube-id';
import Vdiv from './Vdiv.vue';
import { PlayerVars } from './types';
import { useAPI } from './api';
import { read } from 'fs';

interface Window {
    onYouTubeIframeAPIReadyResolvers?: { (): void }[]
    onYouTubeIframeAPIReady?: { (): void }
}

interface Props {
    src: string
    height?: number | string
    width?: number | string 
    host?: string
    vars?: PlayerVars,
}

interface Emits {
    (event: 'ready', e: any): void
    (event: 'state-change', e: any): void
    (event: 'playback-quality-change', e: any): void
    (event: 'playback-rate-change', e: any): void
    (event: 'error', e: any): void
    (event: 'api-change', e: any): void
    (event: 'api-change', e: any): void
    (event: 'autoplay-blocked', e: any): void
}

const props = withDefaults(defineProps<Props>(), {
    height: 360,
    width: 640,
    host: 'https://www.youtube.com',
});

const emits = defineEmits<Emits>();

const id = computed(() => getYouTubeID(props.src) || props.src);
const wrapperStyle = computed<StyleValue>(() => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
    position: 'relative',
}));

const youtube = ref<HTMLElement>();
const player = ref<YT.Player>();
const initiated = ref(false);
const ready = ref(false);
const iframeStyle = ref({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
});

function initPlayer(div: HTMLElement) {
    if (initiated.value) {
        return;
    }
    initiated.value = true
    // @ts-ignore
    // eslint-disable-next-line no-undef
    player.value = new YT.Player(div, {
        height: props.height,
        width: props.width,
        videoId: id.value,
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

function on_load(e: any) {
    const div = e.target;
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
    if (initiated.value && player.value) {
        player.value?.loadVideoById(id.value)
    }
});

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
