import { openBlock as _, createElementBlock as A, normalizeStyle as S, defineComponent as q, computed as R, ref as b, watch as I, onBeforeUnmount as H, readonly as k, createVNode as J } from "vue";
var K = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function W(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var B = { exports: {} };
(function(e, f) {
  (function(d, t) {
    e.exports = t();
  })(K, function(d) {
    return function(t, n) {
      if (n == null && (n = { fuzzy: !0 }), /youtu\.?be/.test(t)) {
        var a, r = [
          /youtu\.be\/([^#\&\?]{11})/,
          // youtu.be/<id>
          /\?v=([^#\&\?]{11})/,
          // ?v=<id>
          /\&v=([^#\&\?]{11})/,
          // &v=<id>
          /embed\/([^#\&\?]{11})/,
          // embed/<id>
          /\/v\/([^#\&\?]{11})/
          // /v/<id>
        ];
        for (a = 0; a < r.length; ++a)
          if (r[a].test(t))
            return r[a].exec(t)[1];
        if (n.fuzzy) {
          var i = t.split(/[\/\&\?=#\.\s]/g);
          for (a = 0; a < i.length; ++a)
            if (/^[^#\&\?]{11}$/.test(i[a]))
              return i[a];
        }
      }
      return null;
    };
  });
})(B);
var X = B.exports;
const Z = /* @__PURE__ */ W(X), ee = {
  props: ["wrapperStyle"],
  mounted() {
    this.$emit("load", { target: this.$el });
  }
}, te = (e, f) => {
  const d = e.__vccOpts || e;
  for (const [t, n] of f)
    d[t] = n;
  return d;
};
function oe(e, f, d, t, n, a) {
  return _(), A("div", {
    style: S(d.wrapperStyle)
  }, null, 4);
}
const ue = /* @__PURE__ */ te(ee, [["render", oe]]), ne = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};
function ae({ player: e }) {
  function f(o, l, c) {
    e.value?.cueVideoById(o, l, c);
  }
  function d(o, l, c) {
    e.value?.loadVideoById(o, l, c);
  }
  function t(o, l, c) {
    e.value?.cueVideoByUrl(o, l, c);
  }
  function n(o, l, c) {
    e.value?.loadVideoByUrl(o, l, c);
  }
  function a(o, l, c, V) {
    e.value?.cuePlaylist(o, l, c, V);
  }
  function r(o, l, c, V) {
    e.value?.loadPlaylist(o, l, c, V);
  }
  function i() {
    e.value?.playVideo();
  }
  function g() {
    e.value?.pauseVideo();
  }
  function y() {
    e.value?.stopVideo();
  }
  function P(o, l) {
    e.value?.seekTo(o, l);
  }
  function p() {
    e.value?.nextVideo();
  }
  function h() {
    e.value?.previousVideo();
  }
  function u(o) {
    e.value?.playVideoAt(o);
  }
  function m() {
    e.value?.mute();
  }
  function T() {
    e.value?.unMute();
  }
  function w() {
    return e.value ? e.value.isMuted() : !1;
  }
  function v(o) {
    e.value?.setVolume(o);
  }
  function s() {
    return e.value ? e.value.getVolume() : 0;
  }
  function E() {
    return e.value ? e.value.getPlaybackRate() : 0;
  }
  function x(o) {
    e.value?.setPlaybackRate(o);
  }
  function U() {
    return e.value ? e.value.getAvailablePlaybackRates() : [];
  }
  function Y(o) {
    e.value?.setLoop(o);
  }
  function C(o) {
    e.value?.setShuffle(o);
  }
  function D() {
    return e.value ? e.value.getVideoLoadedFraction() : 0;
  }
  function N() {
    return e.value ? e.value.getPlayerState() : ne.UNSTARTED;
  }
  function $() {
    return e.value ? e.value.getCurrentTime() : 0;
  }
  function L() {
    return e.value ? e.value.getPlaybackQuality() : "default";
  }
  function z(o) {
    e.value?.setPlaybackQuality(o);
  }
  function Q() {
    return e.value ? e.value.getAvailableQualityLevels() : [];
  }
  function F() {
    return e.value ? e.value.getDuration() : 0;
  }
  function M() {
    return e.value ? e.value.getVideoUrl() : "";
  }
  function j() {
    return e.value ? e.value.getVideoEmbedCode() : "";
  }
  function G() {
    return e.value ? e.value.getPlaylist() : [];
  }
  function O() {
    return e.value ? e.value.getPlaylistIndex() : 0;
  }
  return {
    cueVideoById: f,
    loadVideoById: d,
    cueVideoByUrl: t,
    loadVideoByUrl: n,
    cuePlaylist: a,
    loadPlaylist: r,
    playVideo: i,
    pauseVideo: g,
    stopVideo: y,
    seekTo: P,
    nextVideo: p,
    previousVideo: h,
    playVideoAt: u,
    mute: m,
    unMute: T,
    isMuted: w,
    setVolume: v,
    getVolume: s,
    getPlaybackRate: E,
    setPlaybackRate: x,
    getAvailablePlaybackRates: U,
    setLoop: Y,
    setShuffle: C,
    getVideoLoadedFraction: D,
    getPlayerState: N,
    getCurrentTime: $,
    getPlaybackQuality: L,
    setPlaybackQuality: z,
    getAvailableQualityLevels: Q,
    getDuration: F,
    getVideoUrl: M,
    getVideoEmbedCode: j,
    getPlaylist: G,
    getPlaylistIndex: O
  };
}
const le = /* @__PURE__ */ q({
  __name: "YouTube",
  props: {
    src: {},
    height: { default: 360 },
    width: { default: 640 },
    host: { default: "https://www.youtube.com" },
    vars: {}
  },
  emits: ["ready", "state-change", "playback-quality-change", "playback-rate-change", "error", "api-change", "autoplay-blocked"],
  setup(e, { expose: f, emit: d }) {
    const t = e, n = d, a = R(() => Z(t.src) || t.src), r = R(() => ({
      width: `${t.width}px`,
      height: `${t.height}px`,
      position: "relative"
    }));
    b();
    const i = b(), g = b(!1), y = b(!1);
    b({
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%"
    });
    function P(h) {
      g.value || (g.value = !0, i.value = new YT.Player(h, {
        height: t.height,
        width: t.width,
        videoId: a.value,
        host: t.host,
        playerVars: t.vars,
        events: {
          onReady: (u) => {
            y.value = !0, setTimeout(() => n("ready", u));
          },
          onStateChange: (u) => n("state-change", u),
          onPlaybackQualityChange: (u) => n("playback-quality-change", u),
          onPlaybackRateChange: (u) => n("playback-rate-change", u),
          onError: (u) => n("error", u),
          onApiChange: (u) => n("api-change", u),
          onAutoplayBlocked: (u) => {
            n("autoplay-blocked", u);
          }
        }
      }));
    }
    function p(h) {
      const u = h.target;
      let m = () => {
      };
      new Promise((s) => m = s).then(() => P(u)), window.onYouTubeIframeAPIReadyResolvers || (window.onYouTubeIframeAPIReadyResolvers = []), window.onYouTubeIframeAPIReady || (window.onYouTubeIframeAPIReady = () => {
        window.onYouTubeIframeAPIReadyResolvers?.forEach((s) => {
          s();
        });
      });
      const w = "youtube-iframe-js-api-script";
      let v = document.getElementById(w);
      if (v)
        m();
      else {
        window.onYouTubeIframeAPIReadyResolvers?.push(m), v = document.createElement("script"), v.id = w, v.src = "https://www.youtube.com/iframe_api";
        const s = document.getElementsByTagName("script")[0];
        s && s.parentNode && s.parentNode.insertBefore(v, s);
      }
    }
    return I(() => t.width, () => {
      i.value?.setSize(+t.width, +t.height);
    }), I(() => t.height, () => {
      i.value?.setSize(+t.width, +t.height);
    }), I(() => t.src, () => {
      g.value && i.value && i.value?.loadVideoById(a.value);
    }), H(() => {
      i.value?.destroy();
    }), f({
      player: k(i),
      initiated: k(g),
      ready: k(y),
      ...ae({ player: i })
    }), (h, u) => (_(), A("div", {
      style: S(r.value)
    }, [
      J(ue, {
        wrapperStyle: r.value,
        onLoad: p
      }, null, 8, ["wrapperStyle"])
    ], 4));
  }
});
export {
  le as default
};
