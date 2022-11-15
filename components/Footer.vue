<template>
    <p class="fixed bottom-3 right-3 [writing-mode:vertical-lr] font-mono-space">{{ new Date().getFullYear() }} rlab ©</p>
    <div class="flex fixed bottom-3 left-3 gap-6 [writing-mode:vertical-lr] text-indigo-900 dark:text-indigo-200">
        <a v-if="config?.email" :href="`mailto:${config.email}`" target="_blank" class="hover:text-indigo-700 hover:dark:text-indigo-700 transition">
            <Icon name="ic:round-alternate-email" />
        </a>
        <a v-if="config?.dribbble" :href="config.dribbble" target="_blank" class="hover:text-indigo-700 hover:dark:text-indigo-700 transition">
            <Icon name="fa-brands:dribbble" />
        </a>
        <a v-if="config?.github" :href="config.github" target="_blank" class="hover:text-indigo-700 hover:dark:text-indigo-700 transition">
            <Icon name="eva:github-outline" />
        </a>
        <a v-if="config?.soundcloud" :href="config.soundcloud" target="_blank" class="hover:text-indigo-700 hover:dark:text-indigo-700 transition">
            <Icon name="simple-line-icons:social-soundcloud" />
        </a>
        <a v-if="config?.linkedin" :href="config.linkedin" target="_blank" class="hover:text-indigo-700 hover:dark:text-indigo-700 transition">
            <Icon name="eva:linkedin-outline" />
        </a>
    </div>
</template>

<script setup>
    const config = useRuntimeConfig();
</script>
