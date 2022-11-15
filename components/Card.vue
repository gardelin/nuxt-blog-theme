<template>
    <div class="flex flex-col relative z-0">
        <NuxtLink class="flex absolute z-0 w-full h-full top-0 left-0" :to="item._path" />
        <img :src="item.featuredImage" alt="featured image" class="h-56 object-cover mb-4" />
        <h2 class="font-bold text-indigo-900 dark:text-indigo-300 mb-2">
            {{ item.title }}
        </h2>
        <p class="article-description text-base text-indigo-900 dark:text-indigo-50 mb-3">{{ item.description }}</p>
        <div class="flex justify-between align-between gap-2">
            <ul class="flex gap-3 flex-wrap">
                <li v-for="(tag, n) in item.tags" :key="n">
                    <NuxtLink class="relative normal-case z-10 font-semibold tag" :to="$slug(`/tags/${tag}`)"> {{ tag }} </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    let props = defineProps({
        item: {
            type: Object,
            required: true,
        },
    });
</script>
