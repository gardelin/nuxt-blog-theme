<template>
    <main class="mx-auto max-w-7xl w-full">
        <section class="text-center mb-10">
            <h1 class="page-title">Designs</h1>
        </section>

        <section class="page-section h-full">
            <div v-if="paginatedDesigns.length && total >= limit * page - limit" class="flex flex-col gap-6 h-full">
                <Tags />
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <Card :item="design" v-for="design in paginatedDesigns" :key="design._path" />
                </div>
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
