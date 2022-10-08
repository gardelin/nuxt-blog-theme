<template>
    <main class="mx-auto max-w-3xl w-full">
        <section class="text-center mb-10">
            <h1 class="page-title">Tag: {{ tag }}</h1>
        </section>

        <section class="page-section">
            <div v-if="paginatedArticles.length && total >= limit * page - limit" class="flex flex-col gap-6">
                <Card :item="article" v-for="article in paginatedArticles" :key="article._path" />
                <Pagination :total="total" :limit="limit" />
            </div>

            <p v-else>No articles found!</p>
        </section>
    </main>
</template>

<script setup>
    const route = useRoute();
    const {
        params: { slug },
        query,
    } = useRoute();

    useHead({
        title: `All articles with ${slug}`,
        meta: [{ name: 'description', content: "Here's a list of all articles" }],
    });

    const page = query.page || 1;
    const tag = slug.replace('-', ' ');
    const filter = tag.split(',');

    const limit = perPage().value;
    let total = 0;

    if (!total) {
        const articles = await queryContent('/')
            .where({ tags: { $contains: filter } })
            .only([])
            .find();

        total = articles.length;
    }

    const fetchArticles = async page => {
        return queryContent('/')
            .where({ tags: { $contains: filter } })
            .only(['title', 'description', 'tags', '_path', 'img'])
            .sort({ date: 'desc' })
            .skip(limit * (page - 1))
            .limit(limit)
            .find();
    };

    const paginatedArticles = ref([]);
    paginatedArticles.value = await fetchArticles(page);

    watch(
        () => route.query.page,
        async page => {
            paginatedArticles.value = await fetchArticles(page);
        }
    );
</script>
