<template>
    <header class="site-header" :class="{ 'header-sticky': sticky }">
        <div class="flex items-center justify-between max-w-7xl m-auto">
            <NuxtLink to="/" class="no-underline">
                <figure class="site-logo">
                    <img v-if="useColorMode().value === 'light'" src="/assets/img/logo.png" style="height: 40px" alt="" />
                    <img v-else src="/assets/img/logo-dark.png" style="height: 40px" alt="" />
                </figure>
            </NuxtLink>

            <nav class="site-nav">
                <ul class="links flex gap-5">
                    <li class="link">
                        <NuxtLink to="/articles" class="no-underline text-slate-900 dark:text-slate-100">Articles</NuxtLink>
                    </li>
                    <li class="link">
                        <NuxtLink to="/designs" class="no-underline text-slate-900 dark:text-slate-100">Designs</NuxtLink>
                    </li>
                    <li class="link">
                        <NuxtLink to="/contact" class="no-underline text-slate-900 dark:text-slate-100">Contact</NuxtLink>
                    </li>
                    <li>
                        <ThemeSwitcher />
                    </li>
                </ul>
            </nav>
        </div>

        <ProgressIndicator v-if="$route.path.includes('articles/') || $route.path.includes('designs/')" />
    </header>
</template>

<script setup>
    const sticky = ref(false);

    onMounted(() => {
        const siteHeader = document.querySelector('.site-header');

        const onScroll = () => {
            if (window.scrollY > siteHeader.offsetHeight) {
                sticky.value = true;
            } else {
                sticky.value = false;
            }
        };

        window.addEventListener('scroll', onScroll);
    });
</script>

<style scoped>
    .site-header {
        @apply sticky top-0 w-full p-4 bg-slate-100 bg-transparent z-20 transition-colors;
        height: 72px;
    }

    .site-logo {
        position: relative;
        top: -3px;
    }

    .header-sticky {
        @apply dark:bg-black dark:bg-opacity-10 backdrop-blur-lg !important;
    }
</style>
