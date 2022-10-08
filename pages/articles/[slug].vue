<template>
    <main id="main" class="m-auto max-w-6xl flex flex-col gap-12">
        <header v-if="data.article">
            <div v-if="data.article.featuredImage" class="img-cont h-72 mb-12">
                <img :src="`${data.article.featuredImage}`" :alt="data.article.title" class="rounded-2xl" />
            </div>
            <h1 class="font-extrabold text-5xl mb-6">{{ data.article.title }}</h1>
            <p v-if="data.article.description" class="font-medium text-lg mb-6">{{ data.article.description }}</p>
            <ul v-if="data.article.tags" class="flex gap-3 flex-wrap">
                <li class="relative normal-case z-10 font-semibold tag" v-for="(tag, n) in data.article.tags" :key="n">{{ tag }}</li>
            </ul>
        </header>
        <hr class="dark:border-white/10" />
        <section class="grid grid-cols-8">
            <aside class="col-span-full md:col-span-2 row-start-1 w-full">
                <Toc :links="data.article.body.toc.links" />
            </aside>
            <article
                class="col-span-full md:col-span-6 md:col-start-1 md:row-start-1 w-full max-w-4xl pr-4 prose prose-img:rounded-xl prose-headings:font-extrabold prose-headings-a:no-underline prose-a:text-blue-600 prose-indigo prose-lg dark:prose-invert prose-pre:bg-zinc-900 dark:prose-pre:bg-white/10"
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
