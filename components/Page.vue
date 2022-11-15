<template>
    <main id="main" class="mx-auto max-w-7xl flex flex-col gap-12 px-14">
        <div v-if="content.featuredImage" class="img-cont h-80 w-full">
            <img :src="`${content.featuredImage}`" :alt="content.title" />
        </div>
        <header v-if="content">
            <h1 class="font-extrabold text-5xl mb-6 text-center">{{ content.title }}</h1>
            <!-- <p v-if="content.description" class="font-medium text-lg mb-6 text-center">{{ content.description }}</p> -->
            <div v-if="content.date" class="flex align-center justify-center">
                <Icon name="ic:sharp-date-range" class="mr-2 text-indigo-700" />
                <span class="text-sm uppercase">
                    {{ $formatDate(content.date) }}
                </span>
                <ul v-if="content.tags" class="flex gap-3 flex-wrap justify-center">
                    <li class="relative normal-case z-10 font-semibold tag" v-for="(tag, n) in content.tags" :key="n">{{ tag }}</li>
                </ul>
            </div>
        </header>
        <hr class="dark:border-white/10" />
        <section class="grid grid-cols-8">
            <aside class="col-span-full md:col-span-2 row-start-1 w-full">
                <Toc :links="content.body.toc.links" />
            </aside>
            <article
                class="col-span-full md:col-span-6 md:col-start-1 md:row-start-1 w-full max-w-4xl pr-4 prose prose-lg prose-indigo prose-headings:font-extrabold prose-headings-a:no-underline prose-a:dark:text-indigo-500 dark:prose-invert prose-pre:bg-zinc-900 dark:prose-pre:bg-indigo-400/10"
            >
                <ContentRenderer :value="content">
                    <ContentRendererMarkdown :value="content" />
                    <template #empty>
                        <p>No content found.</p>
                    </template>
                </ContentRenderer>
            </article>
        </section>
    </main>
</template>

<script setup>
    const props = defineProps({
        content: {
            type: Object,
            required: true,
        },
    });
</script>
