<template>
    <section class="flex justify-center mt-4 space-x-2">
        <ul v-if="total">
            <li class="prev">
                <NuxtLink :class="{ disabled: !showPrev }" :to="{ query: { page: parseInt($route.query.page) - 1 } }">Prev</NuxtLink>
            </li>
            <li v-if="Math.ceil(total / limit) > 1" v-for="n in Math.ceil(total / limit)">
                <NuxtLink :class="{ active: isActive(n) }" :to="{ query: { page: n } }">{{ n }}</NuxtLink>
            </li>
            <li class="next">
                <NuxtLink :class="{ disabled: !showNext }" :to="{ query: { page: parseInt($route.query.page) + 1 } }">Next</NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup>
    const props = defineProps({
        total: {
            type: Number,
            default: 0,
        },
        limit: {
            type: Number,
            default: 0,
        },
    });

    const route = useRoute();
    const page = parseInt(route.query.page || 1);
    let showPrev = ref(page > 1);
    let showNext = ref(page < props.total / props.limit);

    const isActive = n => {
        let page = route.query.page || 1;

        if (page == n) {
            return true;
        }

        return false;
    };

    watch(
        () => route.query.page,
        page => {
            if (page > 1) {
                showPrev.value = true;
            } else {
                showPrev.value = false;
            }

            if (page < props.total / props.limit) {
                showNext.value = true;
            } else {
                showNext.value = false;
            }
        }
    );
</script>

<style scoped>
    ul {
        @apply flex gap-3;
    }

    a {
        @apply px-2 py-2 hover:text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 dark:bg-zinc-800 bg-zinc-100 rounded-full transition-colors;
        text-decoration: none;
        height: 35px;
        max-height: 35px;
        width: 35px;
        max-width: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a.active {
        @apply bg-indigo-700 text-white;
    }

    .next a,
    .prev a {
        width: 60px;
        max-width: 60px;
    }

    .disabled {
        @apply invisible text-white bg-white dark:bg-zinc-900 dark:text-zinc-900 cursor-not-allowed pointer-events-none;
    }
</style>
