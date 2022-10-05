<template>
    <main class="mx-auto max-w-3xl w-full">
        <section class="text-center mb-10">
            <h1 class="page-title">Designs</h1>
            <p>Follow our mission to make the easiest and most fun framework for building modern websites & apps that are fast by default.</p>
        </section>

        <section class="page-section">
            <div v-if="paginatedDesigns.length && total >= limit * page - limit" class="flex flex-col gap-6">
                <Tags />
                <Card :item="design" v-for="design in paginatedDesigns" :key="design._path" />
                <Pagination :total="total" :limit="limit" />
            </div>

            <p v-else>No designs found!</p>
        </section>
    </main>
</template>

<script setup>
    const route = useRoute();
    const limit = perPage().value;
    const total = totalDesigns();
    let page = ref(1);

    if (!total.value) {
        const designs = await queryContent('designs').only([]).find();
        total.value = designs.length;
    }

    const fetchDesigns = async page => {
        return queryContent('designs')
            .only(['title', 'description', 'tags', '_path', 'featuredImage'])
            .sort({ date: 'desc' })
            .skip(limit * (page - 1))
            .limit(limit)
            .find();
    };

    const paginatedDesigns = ref([]);
    paginatedDesigns.value = await fetchDesigns(page);

    watch(
        () => route.query.page,
        async param => {
            page.value = parseInt(param);
            paginatedDesigns.value = await fetchDesigns(param);
        }
    );
</script>
