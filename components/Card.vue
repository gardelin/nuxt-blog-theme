<template>
    <div class="border dark:border-indigo-700/30 rounded p-10 flex flex-col gap-4 relative z-0">
        <NuxtLink class="flex absolute z-0 w-full h-full top-0 left-0" :to="item._path" />
        <h2 class="font-bold">
            {{ item.title }}
        </h2>
        <p class="article-description">{{ item.description }}</p>
        <div class="flex items-center gap-2">
            <p class="article-date" v-if="item.publishDate">
                {{ $formatDate(item.publishDate) }}
            </p>
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
