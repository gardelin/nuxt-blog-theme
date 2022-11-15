import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/image-edge', '@vueuse/nuxt', 'nuxt-icon'],
    content: {
        // https://content.nuxtjs.org/api/configuration
        highlight: {
            theme: 'dracula',
        },
        markdown: {
            toc: {
                depth: 5,
                searchDepth: 5,
            },
        },
    },
    tailwindcss: {
        cssPath: '~/assets/scss/main.scss',
    },
    colorMode: {
        classSuffix: '',
    },
    runtimeConfig: {
        public: {
            getFormId: process.env.SITE_GET_FORM_ID,
            recaptchaKey: process.env.SITE_RECAPTCHA_KEY,
            recaptchaSecret: process.env.SITE_RECAPTCHA_SECRET,
            dribbble: process.env.DRIBBBLE,
            linkedin: process.env.LINKEDIN,
            email: process.env.EMAIL,
            github: process.env.GITHUB,
            soundcloud: process.env.SOUNDCLOUD,
        },
    },
    vite: {
        plugins: [svgLoader()],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
});
