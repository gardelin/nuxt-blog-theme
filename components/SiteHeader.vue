<template>
    <header
        class="site-header sticky top-0 w-full p-4 bg-transparent z-20 transition-colors"
        :class="{ 'header-sticky': sticky, open: opened, close: !opened }"
    >
        <div class="flex items-center justify-between m-auto">
            <NuxtLink to="/" class="no-underline">
                <figure class="site-logo">
                    <Logo
                        class="text-indigo-200 h-8 w-8"
                        :class="{ 'text-indigo-200': isLightThemeActive(), 'text-indigo-500': isDarkThemeActive() }"
                    />
                </figure>
            </NuxtLink>

            <div class="hamburger absolute top-5 right-5 z-10 lg:hidden" @click="hamburgerClick">
                <span class="bg-indigo-700"></span>
                <span class="bg-indigo-700"></span>
                <span class="bg-indigo-700"></span>
            </div>
            <nav
                class="site-nav absolute lg:relative top-0 right-0 z-5 w-full sm:opacity-0 md:w-1/2 lg:w-fit h-screen lg:h-auto lg:opacity-100 transition"
            >
                <ul
                    class="flex flex-col justify-center align-center gap-5 bg-indigo-400 text-white h-full lg:h-auto text-center lg:flex-row lg:text-indigo-900 lg:dark:text-indigo-200 lg:bg-transparent font-space-mono"
                >
                    <li class="link">
                        <NuxtLink to="/projects" @click="closeHamburger" class="hover:text-indigo-900">Projects</NuxtLink>
                    </li>
                    <li class="link">
                        <NuxtLink to="/articles" @click="closeHamburger" class="hover:text-indigo-900">Articles</NuxtLink>
                    </li>
                    <li class="link">
                        <NuxtLink to="/designs" @click="closeHamburger" class="hover:text-indigo-900">Designs</NuxtLink>
                    </li>
                    <li class="link">
                        <NuxtLink to="/contact" @click="closeHamburger" class="hover:text-indigo-900">Contact</NuxtLink>
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
    import Logo from '../assets/img/logo.svg';

    let sticky = ref(false);
    let opened = ref(false);

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

    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll);
    });

    const isLightThemeActive = () => {
        return useColorMode().value === 'light';
    };

    const isDarkThemeActive = () => {
        return useColorMode().value === 'light';
    };

    const hamburgerClick = e => {
        opened.value = !opened.value;
    };

    const closeHamburger = e => {
        opened.value = false;
    };
</script>

<style scoped lang="scss">
    .header-sticky {
        @apply dark:bg-black dark:bg-opacity-10 backdrop-blur-lg;
    }

    @media screen and (max-width: 1024px) {
        .site-header {
            &.open {
                .site-nav {
                    opacity: 1;

                    ul {
                        display: flex !important;
                    }
                }
            }

            &.close {
                .site-nav ul {
                    display: none !important;
                }
            }
        }
    }

    .hamburger {
        width: 40px;
        height: 45px;
        position: absolute;
        transform: rotate(0deg);
        transition: 0.5s ease-in-out;
        cursor: pointer;

        span {
            display: block;
            position: absolute;
            height: 2px;
            width: 100%;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: 0.25s ease-in-out;

            &:nth-child(1) {
                top: 0px;
                transform-origin: left center;
            }

            &:nth-child(2) {
                top: 12px;
            }

            &:nth-child(3) {
                top: 24px;
                transform-origin: left center;
            }
        }
    }

    .site-header.open .hamburger {
        span:nth-child(1) {
            transform: rotate(45deg);
            top: 0px;
            left: 8px;
        }

        span:nth-child(2) {
            width: 0%;
            opacity: 0;
        }

        span:nth-child(3) {
            transform: rotate(-45deg);
            top: 29px;
            left: 8px;
        }
    }
</style>
