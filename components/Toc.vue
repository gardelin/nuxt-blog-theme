<template>
    <nav class="pl-4 pt-4 max-h-[calc(100vh-6rem)] overflow-auto sticky top-20">
        <header class="pb-2 mb-2">
            <h3 class="text-md font-bold">Table of contents</h3>
        </header>
        <ul class="flex flex-col gap-2">
            <li v-for="link of flattenLinks(links)" :key="link.id" :class="`text-slate-500 _${link.depth}`">
                <a class="no-underline" :class="{ active: activeHeadings.includes(link.id) }" :href="`#${link.id}`">
                    {{ link.text }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    let props = defineProps(['links']);

    const flattenLinks = links => {
        let _links = links
            .map(link => {
                let _link = [link];

                if (link.children) {
                    let flattened = flattenLinks(link.children);
                    _link = [link, ...flattened];
                }

                return _link;
            })
            .flat(1);

        return _links;
    };

    let activeHeadings = ref([]);

    onMounted(() => {
        // https://github.com/nuxt/framework/issues/3587
        setTimeout(() => {
            document.querySelectorAll('h2[id], h3[id]').forEach(heading => {
                useIntersectionObserver(heading, ([{ isIntersecting }]) => {
                    const id = heading.getAttribute('id');

                    if (isIntersecting) {
                        activeHeadings.value.push(id);
                    } else {
                        activeHeadings.value = activeHeadings.value.filter(item => ![id].includes(item));
                    }
                });
            }, 100);
        });
    });
</script>

<style scoped>
    ._3 {
        @apply pl-3;
    }

    ._4 {
        @apply pl-6;
    }

    ._undefined {
        @apply pl-8;
    }

    .active {
        @apply text-indigo-400;
    }
</style>
