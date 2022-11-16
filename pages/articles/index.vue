<template>
    <main class="mx-auto max-w-7xl w-full px-14">
        <section class="text-center mb-9">
            <h1 class="page-title">Articles</h1>
        </section>

        <section class="page-section h-full">
            <div v-if="paginatedArticles.length && total >= limit * page - limit" class="flex flex-col gap-6 h-full">
                <Tags />
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <Card :item="article" v-for="article in paginatedArticles" :key="article._path" />
                </div>
                <Pagination :total="total" :limit="limit" />
            </div>

            <p v-else>No articles found!</p>
        </section>
    </main>
</template>

<script setup>
    const route = useRoute();
    const limit = perPage().value;
    const total = totalArticles();
    let page = ref(parseInt(route.query.page || 1));

    if (!total.value) {
        const articles = await queryContent('articles').only([]).find();
        total.value = articles.length;
    }

    const fetchArticles = async page => {
        return queryContent('articles')
            .only(['title', 'description', 'tags', '_path', 'featuredImage', 'date'])
            .sort({ date: 'desc' })
            .skip(limit * (page - 1))
            .limit(limit)
            .find();
    };

    const paginatedArticles = ref([]);
    paginatedArticles.value = await fetchArticles(page.value);

    watch(
        () => route.query.page,
        async param => {
            page.value = parseInt(param);
            paginatedArticles.value = await fetchArticles(param);
        }
    );
</script>
