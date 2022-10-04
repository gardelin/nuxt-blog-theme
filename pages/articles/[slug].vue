<template>
    <main id="main" class="p-4 max-w-5xl m-auto">
        <header v-if="data.article" class="p-4 pb-12">
            <div v-if="data.article.img" class="img-cont h-72 mb-12">
                <img :src="`${data.article.img}`" :alt="data.article.title" class="rounded-2xl" />
            </div>
            <h1 class="font-extrabold text-5xl">{{ data.article.title }}</h1>
            <p class="font-medium text-lg">{{ data.article.description }}</p>
            <ul class="flex gap-3 flex-wrap">
                <li class="relative normal-case z-10 font-semibold tag" v-for="(tag, n) in data.article.tags" :key="n">{{ tag }}</li>
            </ul>
        </header>
        <hr />
        <section class="grid grid-cols-8">
            <aside class="col-span-full md:col-span-2 row-start-1 w-full pt-14">
                <Toc :links="data.article.body.toc.links" />
            </aside>
            <article
                class="col-span-full md:col-span-6 md:col-start-1 md:row-start-1 prose dark:prose-invert prose-pre:bg-zinc-900 dark:prose-pre:bg-white/10 w-full p-4 max-w-3xl m-auto"
            >
                <ContentRenderer :value="data.article">
                    <ContentRendererMarkdown :value="data.article" />
                    <template #empty>
                        <p>No content found.</p>
                    </template>
                </ContentRenderer>
            </article>
        </section>
    </main>
</template>

<script setup>
    const { path } = useRoute();
    const { data } = await useAsyncData(`content-${path}`, async () => {
        let article = queryContent().where({ _path: path }).findOne();

        return {
            article: await article,
        };
    });

    useHead({
        title: data.value.article.title,
        meta: [
            { name: 'description', content: data.value.article.description },
            {
                hid: 'og:image',
                property: 'og:image',
                content: `https://site.com/${data.value.article.img}`,
            },
        ],
    });
</script>
