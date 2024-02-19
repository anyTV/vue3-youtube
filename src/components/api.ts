import { Ref } from 'vue';
import { SuggestedVideoQuality, PlayerState } from './types';

interface APIParams {
    player: Ref<YT.Player | undefined>
}

export function useAPI({ player }: APIParams) {
    /**
         * Queues a video by ID.
         *
         * @param videoId   Video ID.
         * @param startSeconds   Time from which the video should start playing.
         * @param suggestedQuality   Suggested video player quality.
         */
    function cueVideoById(videoId: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void {
        player.value?.cueVideoById(videoId, startSeconds, suggestedQuality)
    }

    /**
     * Loads and plays a video by ID.
     *
     * @param videoId   Video ID.
     * @param startSeconds   Time from which the video should start playing.
     * @param suggestedQuality   Suggested video player quality.
     */
    function loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void {
        player.value?.loadVideoById(videoId, startSeconds, suggestedQuality)
    }

    /**
     * Queues a video by media content URL.
     *
     * @param mediaContentUrl   Fully qualified player URL.
     * @param startSeconds   Time from which the video should start playing.
     * @param suggestedQuality   Suggested video player quality.
     */
    function cueVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void {
        player.value?.cueVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality)
    }

    /**
     * Loads a video by media content URL.
     *
     * @param mediaContentUrl   Fully qualified player URL.
     * @param startSeconds   Time from which the video should start playing.
     * @param suggestedQuality   Suggested video player quality.
     */
    function loadVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void {
        player.value?.loadVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality)
    }

    /**
     * Queues a playlist of videos.
     *
     * @param playlist   Video ID(s) to play.
     * @param index   Start index of the playlist, if not 0.
     * @param startSeconds   Time from which the video should start playing.
     * @param suggestedQuality   Suggested video player quality.
     */
    function cuePlaylist(
        playlist: string | string[],
        index?: number,
        startSeconds?: number,
        suggestedQuality?: SuggestedVideoQuality,
    ): void {
        player.value?.cuePlaylist(playlist, index, startSeconds, suggestedQuality)
    }

    /**
     * Loads a playlist of videos.
     *
     * @param playlist   Video ID(s) to play.
     * @param index   Start index of the playlist, if not 0.
     * @param startSeconds   Time from which the video should start playing.
     * @param suggestedQuality   Suggested video player quality.
     */
    function loadPlaylist(
        playlist: string | string[],
        index?: number,
        startSeconds?: number,
        suggestedQuality?: SuggestedVideoQuality,
    ): void {
        player.value?.loadPlaylist(playlist, index, startSeconds, suggestedQuality)
    }

    /**
     * Plays the currently cued/loaded video.
     */
    function playVideo(): void {
        player.value?.playVideo()
    }

    /**
     * Pauses the currently playing video.
     */
    function pauseVideo(): void {
        player.value?.pauseVideo()
    }

    /**
     * Stops and cancels loading of the current video.
     */
    function stopVideo(): void {
        player.value?.stopVideo()
    }

    /**
     * Seeks to a specified time in the video.
     *
     * @param seconds   Time, in seconds from the beginning of the video.
     * @param allowSeekAhead   Whether the player is allowed to make a new request for unbuffered data.
     */
    function seekTo(seconds: number, allowSeekAhead: boolean): void {
        player.value?.seekTo(seconds, allowSeekAhead)
    }

    /**
     * Loads and plays the next video in the playlist.
     */
    function nextVideo(): void {
        player.value?.nextVideo()
    }

    /**
     * Loads and plays the previous video in the playlist.
     */
    function previousVideo(): void {
        player.value?.previousVideo()
    }

    /**
     * Loads and plays the specified video in the playlist.
     *
     * @param index   Index of the video to play.
     */
    function playVideoAt(index: number): void {
        player.value?.playVideoAt(index)
    }

    /**
     * Mutes the player.
     */
    function mute(): void {
        player.value?.mute()
    }

    /**
     * Unmutes the player.
     */
    function unMute(): void {
        player.value?.unMute()
    }

    /**
     * @returns Whether the player is muted.
     */
    function isMuted(): boolean {
        return player.value ? player.value.isMuted() : false
    }

    /**
     * Sets the player volume.
     *
     * @param volume   An integer between 0 and 100.
     */
    function setVolume(volume: number): void {
        player.value?.setVolume(volume)
    }

    /**
     * @returns The player's current volume, an integer between 0 and 100.
     */
    function getVolume(): number {
        return player.value ? player.value.getVolume() : 0
    }

    /**
     * @returns Playback rate of the currently playing video.
     */
    function getPlaybackRate(): number {
        return player.value ? player.value.getPlaybackRate() : 0
    }

    /**
     * Sets the suggested playback rate for the current video.
     *
     * @param suggestedRate   Suggested playback rate.
     */
    function setPlaybackRate(suggestedRate: number): void {
        player.value?.setPlaybackRate(suggestedRate)
    }

    /**
     * @returns Available playback rates for the current video.
     */
    function getAvailablePlaybackRates(): number[] {
        return player.value ? player.value.getAvailablePlaybackRates() : []
    }

    /**
     * Sets whether the player should continuously play a playlist.
     *
     * @param loopPlaylists   Whether to continuously loop playlists.
     */
    function setLoop(loopPlaylists: boolean): void {
        player.value?.setLoop(loopPlaylists)
    }

    /**
     * Sets whether a playlist's videos should be shuffled.
     *
     * @param shufflePlaylist   Whether to shuffle playlist videos.
     */
    function setShuffle(shufflePlaylist: boolean): void {
        player.value?.setShuffle(shufflePlaylist)
    }

    /**
     * @returns A number between 0 and 1 of how much the player has buffered.
     */
    function getVideoLoadedFraction(): number {
        return player.value ? player.value.getVideoLoadedFraction() : 0
    }

    /**
     * @returns Current player state.
     */
    function getPlayerState(): YT.PlayerState {
        // eslint-disable-next-line no-undef
        return player.value ? player.value.getPlayerState() : PlayerState.UNSTARTED
    }

    /**
     * @returns Elapsed time in seconds since the video started playing.
     */
    function getCurrentTime(): number {
        return player.value ? player.value.getCurrentTime() : 0
    }

    /**
     * @returns Actual video quality of the current video.
     */
    function getPlaybackQuality(): SuggestedVideoQuality {
        return player.value ? player.value.getPlaybackQuality() : 'default'
    }

    /**
     * Sets the suggested video quality for the current video.
     *
     * @param suggestedQuality   Suggested video quality for the current video.
     */
    function setPlaybackQuality(suggestedQuality: SuggestedVideoQuality): void {
        player.value?.setPlaybackQuality(suggestedQuality)
    }

    /**
     * @returns Quality formats in which the current video is available.
     */
    function getAvailableQualityLevels(): SuggestedVideoQuality[] {
        return player.value ? player.value.getAvailableQualityLevels() : []
    }

    /**
     * @returns Duration in seconds of the currently playing video.
     */
    function getDuration(): number {
        return player.value ? player.value.getDuration() : 0
    }

    /**
     * @returns YouTube.com URL for the currently loaded/playing video.
     */
    function getVideoUrl(): string {
        return player.value ? player.value.getVideoUrl() : ''
    }

    /**
     * @returns Embed code for the currently loaded/playing video.
     */
    function getVideoEmbedCode(): string {
        return player.value ? player.value.getVideoEmbedCode() : ''
    }

    /**
     * @returns Video IDs in the playlist as they are currently ordered.
     */
    function getPlaylist(): string[] {
        return player.value ? player.value.getPlaylist() : []
    }

    /**
     * @returns Index of the playlist video that is currently playing.
     */
    function getPlaylistIndex(): number {
        return player.value ? player.value.getPlaylistIndex() : 0
    }

    return {
        cueVideoById,
        loadVideoById,
        cueVideoByUrl,
        loadVideoByUrl,
        cuePlaylist,
        loadPlaylist,
        playVideo,
        pauseVideo,
        stopVideo,
        seekTo,
        nextVideo,
        previousVideo,
        playVideoAt,
        mute,
        unMute,
        isMuted,
        setVolume,
        getVolume,
        getPlaybackRate,
        setPlaybackRate,
        getAvailablePlaybackRates,
        setLoop,
        setShuffle,
        getVideoLoadedFraction,
        getPlayerState,
        getCurrentTime,
        getPlaybackQuality,
        setPlaybackQuality,
        getAvailableQualityLevels,
        getDuration,
        getVideoUrl,
        getVideoEmbedCode,
        getPlaylist,
        getPlaylistIndex,
    }
}