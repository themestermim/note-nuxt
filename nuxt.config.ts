import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    app: {
        head: {
            title: 'Zuma',
            link: [
                { rel: 'manifest', href: '/manifest.webmanifest' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }
            ],
            meta: [
                {name: 'description', content: 'زوما دفترچه‌ی دیجیتالی توست؛ هر جا، هر زمان، بدون نیاز به اپلیکیشن سنگین'},
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
        },
    },
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/image', '@pinia/nuxt', '@vite-pwa/nuxt'],
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
        build: {
            chunkSizeWarningLimit: 600,
        },
    },
    ssr: false,
    pwa: {
        strategies: 'injectManifest',
        srcDir: '../public/',
        filename: 'sw.js',
        manifest: {
            name: 'Zuma App',
            short_name: 'Zuma',
            description: 'زوما دفترچه‌ی دیجیتالی توست؛ هر جا، هر زمان، بدون نیاز به اپلیکیشن سنگین',
            start_url: '/',
            display: 'standalone',
            lang: 'fa',
            dir: 'rtl',
            scope: "/",
            orientation: 'natural',
            background_color: '#f7f7f7',
            theme_color: '#b65c00',
            icons: [
                {
                    src: "/favicon/web-app-manifest-144x144.png",
                    sizes: "144x144",
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: "/favicon/web-app-manifest-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: "/favicon/web-app-manifest-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/favicon/web-app-manifest-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: "/favicon/web-app-manifest-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable"
                },
            ],
            screenshots: [
                {
                    src: "/screenshot-wide.png",
                    sizes: "1920x1080",
                    type: "image/png",
                    form_factor: "wide",
                }
            ],
            id: "https://zuma-app.vercel.app/",
            categories: ["education"],
            prefer_related_applications: false,
            display_override: ["fullscreen", "standalone", "minimal-ui"],
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
            runtimeCaching: [
                {
                    urlPattern: 'https://zuma-app.vercel.app/.*',
                    handler: 'CacheFirst',
                    method: 'GET',
                    options: {
                        cacheName: 'cdn-cache',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 روز
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                },
                {
                    urlPattern: 'https://zuma-app.vercel.app/.*',
                    handler: 'NetworkFirst',
                    method: 'GET',
                    options: {
                        cacheName: 'site-cache',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 روز
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                }
            ]
        },
        injectManifest: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        },
        devOptions: {
            enabled: true,
        }
    },
    experimental: {
        payloadExtraction: true,
    },
    plugins: [
        {src: '~/plugins/registerServiceWorker.js', mode: "client"},
    ],
    runtimeConfig: {
        public: {
            apiBase: 'https://note-app-backend-theta.vercel.app',
        }
    }
})