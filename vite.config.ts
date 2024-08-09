// https://dev.to/peshanghiwa/publishing-a-vue-3-typescript-component-library-to-github-packages-46ec
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";

import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
    plugins: [vue(), cssInjectedByJsPlugin()],
    resolve: {
        alias: {
            "@/": new URL("./src/", import.meta.url).pathname,
            "vue": resolve('node_modules/vue'),
        },
    },

    ssr: {
        noExternal: [/\.vue$/],
    },

    build: {
        cssCodeSplit: true,
        target: "esnext",
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "GithubPackagesUiLibrary",
            fileName: (format) => `vue3-youtube.${format}.js`,
        },

        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});
