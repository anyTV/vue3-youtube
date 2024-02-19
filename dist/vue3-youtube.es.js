import { openBlock as R, createElementBlock as _, normalizeStyle as A, defineComponent as O, computed as T, ref as b, watch as I, onBeforeUnmount as q, createVNode as H } from "vue";
var J = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function K(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var S = { exports: {} };
(function(e, f) {
  (function(s, t) {
    e.exports = t();
  })(J, function(s) {
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
})(S);
var W = S.exports;
const X = /* @__PURE__ */ K(W), Z = {
  props: ["wrapperStyle"],
  mounted() {
    this.$emit("load", { target: this.$el });
  }
}, ee = (e, f) => {
  const s = e.__vccOpts || e;
  for (const [t, n] of f)
    s[t] = n;
  return s;
};
function te(e, f, s, t, n, a) {
  return R(), _("div", {
    style: A(s.wrapperStyle)
  }, null, 4);
}
const oe = /* @__PURE__ */ ee(Z, [["render", te]]), ue = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};
function ne({ player: e }) {
  function f(o, l, c) {
    e.value?.cueVideoById(o, l, c);
  }
  function s(o, l, c) {
    e.value?.loadVideoById(o, l, c);
  }
  function t(o, l, c) {
    e.value?.cueVideoByUrl(o, l, c);
  }
  function n(o, l, c) {
    e.value?.loadVideoByUrl(o, l, c);
  }
  function a(o, l, c, p) {
    e.value?.cuePlaylist(o, l, c, p);
  }
  function r(o, l, c, p) {
    e.value?.loadPlaylist(o, l, c, p);
  }
  function i() {
    e.value?.playVideo();
  }
  function h() {
    e.value?.pauseVideo();
  }
  function w() {
    e.value?.stopVideo();
  }
  function P(o, l) {
    e.value?.seekTo(o, l);
  }
  function V() {
    e.value?.nextVideo();
  }
  function g() {
    e.value?.previousVideo();
  }
  function u(o) {
    e.value?.playVideoAt(o);
  }
  function m() {
    e.value?.mute();
  }
  function k() {
    e.value?.unMute();
  }
  function y() {
    return e.value ? e.value.isMuted() : !1;
  }
  function v(o) {
    e.value?.setVolume(o);
  }
  function d() {
    return e.value ? e.value.getVolume() : 0;
  }
  function B() {
    return e.value ? e.value.getPlaybackRate() : 0;
  }
  function E(o) {
    e.value?.setPlaybackRate(o);
  }
  function x() {
    return e.value ? e.value.getAvailablePlaybackRates() : [];
  }
  function U(o) {
    e.value?.setLoop(o);
  }
  function Y(o) {
    e.value?.setShuffle(o);
  }
  function C() {
    return e.value ? e.value.getVideoLoadedFraction() : 0;
  }
  function D() {
    return e.value ? e.value.getPlayerState() : ue.UNSTARTED;
  }
  function N() {
    return e.value ? e.value.getCurrentTime() : 0;
  }
  function $() {
    return e.value ? e.value.getPlaybackQuality() : "default";
  }
  function L(o) {
    e.value?.setPlaybackQuality(o);
  }
  function z() {
    return e.value ? e.value.getAvailableQualityLevels() : [];
  }
  function Q() {
    return e.value ? e.value.getDuration() : 0;
  }
  function F() {
    return e.value ? e.value.getVideoUrl() : "";
  }
  function M() {
    return e.value ? e.value.getVideoEmbedCode() : "";
  }
  function j() {
    return e.value ? e.value.getPlaylist() : [];
  }
  function G() {
    return e.value ? e.value.getPlaylistIndex() : 0;
  }
  return {
    cueVideoById: f,
    loadVideoById: s,
    cueVideoByUrl: t,
    loadVideoByUrl: n,
    cuePlaylist: a,
    loadPlaylist: r,
    playVideo: i,
    pauseVideo: h,
    stopVideo: w,
    seekTo: P,
    nextVideo: V,
    previousVideo: g,
    playVideoAt: u,
    mute: m,
    unMute: k,
    isMuted: y,
    setVolume: v,
    getVolume: d,
    getPlaybackRate: B,
    setPlaybackRate: E,
    getAvailablePlaybackRates: x,
    setLoop: U,
    setShuffle: Y,
    getVideoLoadedFraction: C,
    getPlayerState: D,
    getCurrentTime: N,
    getPlaybackQuality: $,
    setPlaybackQuality: L,
    getAvailableQualityLevels: z,
    getDuration: Q,
    getVideoUrl: F,
    getVideoEmbedCode: M,
    getPlaylist: j,
    getPlaylistIndex: G
  };
}
const ie = /* @__PURE__ */ O({
  __name: "YouTube",
  props: {
    src: {},
    height: { default: 360 },
    width: { default: 640 },
    host: { default: "https://www.youtube.com" },
    vars: {}
  },
  emits: ["ready", "state-change", "playback-quality-change", "playback-rate-change", "error", "api-change", "autoplay-blocked"],
  setup(e, { expose: f, emit: s }) {
    const t = e, n = s, a = T(() => X(t.src) || t.src), r = T(() => ({
      width: `${t.width}px`,
      height: `${t.height}px`,
      position: "relative"
    }));
    b();
    const i = b(), h = b(!1), w = b(!1);
    b({
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%"
    });
    function P(g) {
      h.value || (h.value = !0, i.value = new YT.Player(g, {
        height: t.height,
        width: t.width,
        videoId: a.value,
        host: t.host,
        playerVars: t.vars,
        events: {
          onReady: (u) => {
            w.value = !0, setTimeout(() => n("ready", u));
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
    function V(g) {
      const u = g.target;
      let m = () => {
      };
      new Promise((d) => m = d).then(() => P(u)), window.onYouTubeIframeAPIReadyResolvers || (window.onYouTubeIframeAPIReadyResolvers = []), window.onYouTubeIframeAPIReady || (window.onYouTubeIframeAPIReady = () => {
        window.onYouTubeIframeAPIReadyResolvers?.forEach((d) => {
          d();
        });
      });
      const y = "youtube-iframe-js-api-script";
      let v = document.getElementById(y);
      if (v)
        m();
      else {
        window.onYouTubeIframeAPIReadyResolvers?.push(m), v = document.createElement("script"), v.id = y, v.src = "https://www.youtube.com/iframe_api";
        const d = document.getElementsByTagName("script")[0];
        d && d.parentNode && d.parentNode.insertBefore(v, d);
      }
    }
    return I(() => t.width, () => {
      i.value?.setSize(+t.width, +t.height);
    }), I(() => t.height, () => {
      i.value?.setSize(+t.width, +t.height);
    }), I(() => t.src, () => {
      h.value && i.value && i.value?.loadVideoById(a.value);
    }), q(() => {
      i.value?.destroy();
    }), f(ne({ player: i })), (g, u) => (R(), _("div", {
      style: A(r.value)
    }, [
      H(oe, {
        wrapperStyle: r.value,
        onLoad: V
      }, null, 8, ["wrapperStyle"])
    ], 4));
  }
});
export {
  ie as default
};
