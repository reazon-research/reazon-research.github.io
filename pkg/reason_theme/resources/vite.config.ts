import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
export default {
    // config
    root: './',
    base: '/',

    build: {
        // output dir for production build
        outDir: '../theme/static',
        emptyOutDir: true,

        // emit manifest so PHP can find the hashed files
        manifest: false,

        // esbuild target
        target: 'es2022',

        // our entry
        rollupOptions: {
            input: {
                main: resolve(__dirname + '/javascripts/main.ts')
            },
            output: {
                format: 'iife',
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            },
        },

        // minifying switch
        minify: true,
        write: true
    },

    server: {

        // required to load scripts from custom host
        cors: true,

        // we need a strict port to match on PHP side
        // change freely, but update in your functions.php to match the same port
        strictPort: true,
        port: 3000,

        // serve over http
        https: false,

        hmr: {
            host: 'localhost',
            //port: 443
        },

    },
}