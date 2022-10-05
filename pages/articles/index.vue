<template>
    <main class="mx-auto max-w-3xl w-full">
        <section class="text-center mb-10">
            <h1 class="page-title">Articles</h1>
            <p>Follow our mission to make the easiest and most fun framework for building modern websites & apps that are fast by default.</p>
        </section>

        <section class="page-section">
            <div v-if="paginatedArticles.length && total >= limit * page - limit" class="flex flex-col gap-6">
                <Tags />
                <Card :item="article" v-for="article in paginatedArticles" :key="article._path" />
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
    let page = ref(1);

    if (!total.value) {
        const articles = await queryContent('articles').only([]).find();
        total.value = articles.length;
    }

    const fetchArticles = async page => {
        return queryContent('articles')
            .only(['title', 'description', 'tags', '_path', 'featuredImage'])
            .sort({ date: 'desc' })
            .skip(limit * (page - 1))
            .limit(limit)
            .find();
    };

    const paginatedArticles = ref([]);
    paginatedArticles.value = await fetchArticles(page);

    watch(
        () => route.query.page,
        async param => {
            page.value = parseInt(param);
            paginatedArticles.value = await fetchArticles(param);
        }
    );
</script>
