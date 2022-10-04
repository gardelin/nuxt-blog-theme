<template>
    <div class="flex items-center gap-2 border border-transparent rounded-lg" :class="{ active: expanded }">
        <div
            @click="toggleExpand"
            class="flex items-center gap-2 pr-3 p-1.5 px-2 cursor-pointer bg-slate-100 dark:bg-indigo-700/10 border dark:border-0 border-slate-200 font-semibold rounded-lg transition-all hover:-translate-y-0.5 focus:bg-slate-100 active:translate-y-0.5 active:shadow-inner"
        >
            <TagIcon class="icon solid" />
            <span>Tags</span>
        </div>
        <Transition name="bounce">
            <ul v-if="expanded" class="flex flex-wrap gap-3" :class="{ expanded: expanded }">
                <li v-for="(tag, n) in tags" :key="n">
                    <NuxtLink class="tag" :to="$slug(`/tags/${tag}`)"> {{ tag }} </NuxtLink>
                </li>
            </ul>
        </Transition>
    </div>
</template>

<script setup>
    import { TagIcon } from "@heroicons/vue/solid";

    const expanded = ref(false);
    const { path } = useRoute();

    /**
     * helper function to flatten array by key
     *
     * @param {Array} tags
     * @param {String} key
     */
    const flatten = (tags, key) => {
        let _tags = tags
            .map((tag) => {
                let _tag = tag;

                if (tag[key]) {
                    let flattened = flatten(tag[key]);
                    _tag = flattened;
                }

                return _tag;
            })
            .flat(1);

        return _tags;
    };

    const toggleExpand = () => {
        expanded.value = !expanded.value;
    };

    let tags = ref([]);
    const contentToSearch = path.includes("/articles") ? "articles" : "designs";
    let data = await queryContent(contentToSearch).only(["tags"]).find();

    data = data.filter((tag) => {
        return !!tag["tags"];
    });

    tags.value = [...new Set(flatten(data, "tags"))];
</script>

<style scoped>
    .bounce-enter-active {
        animation: bounce-in 0.5s;
    }

    .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
