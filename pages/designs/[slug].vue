<template>
    <Page :content="content" />
</template>

<script setup>
    const { path } = useRoute();
    let content = await queryContent().where({ _path: path }).findOne();

    useHead({
        title: content.title,
        meta: [
            { name: 'description', content: content.description },
            {
                hid: 'og:image',
                property: 'og:image',
                content: `https://site.com/${content.featuredImage}`,
            },
        ],
    });
</script>
