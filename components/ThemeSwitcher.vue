<template>
    <a href="#" class="text-copy-primary hover:text-gray-600" @click.prevent="onClick">
        <Icon v-if="colorMode.value === 'light'" name="akar-icons:sun" />
        <Icon v-else name="bytesize:moon" />
    </a>
</template>

<script setup>
    const colorMode = useColorMode();

    const onClick = () => {
        colorMode.value === 'light' ? (colorMode.preference = 'dark') : (colorMode.preference = 'light');
    };
</script>
