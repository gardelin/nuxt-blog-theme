<template>
    <div class="progress-indicator-wrapper">
        <div class="progress-indicator" :style="{ width: `${progress}%` }"></div>
    </div>
</template>

<script setup>
    let progress = ref(0);

    const updateProgressIndicator = () => {
        const { documentElement, body } = document;
        let windowScroll = body.scrollTop || documentElement.scrollTop;
        let height = documentElement.scrollHeight - documentElement.clientHeight;

        progress.value = (windowScroll / height) * 100;
    };

    onMounted(() => {
        useEventListener(window, 'scroll', updateProgressIndicator);
    });
</script>

<style>
    .progress-indicator-wrapper {
        position: absolute;
        bottom: -1px;
        left: 0;
        background-color: transparent;
        width: 100%;
    }

    .progress-indicator {
        background-image: linear-gradient(160deg, #aaaaff 0%, #5d5dff 100%);
        height: 1px;
    }
</style>
