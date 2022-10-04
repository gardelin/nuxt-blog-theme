<!-- https://github.com/nuxt/image/discussions/548#discussioncomment-3548425 -->

<template>
    <NuxtImg :src="src" :alt="alt" :width="width" :height="height" :placeholder="placeholder" />
</template>

<script setup>
    const props = defineProps({
        src: {
            type: String,
            default: '',
        },
        alt: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '',
        },
        height: {
            type: [String, Number],
            default: undefined,
        },
        placeholder: {
            type: [String, Number],
            default: undefined,
        },
    });

    // This is needed due to Markdown unable to pass array
    const placeholder = computed(() => {
        if (typeof props.placeholder !== 'string') {
            return props.placeholder;
        }

        if (!props.placeholder.match(/\d+(,\d){1,2}/)) {
            return props.placeholder;
        }

        return props.placeholder.split(',').map(s => s.trim());
    });
</script>
