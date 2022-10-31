<template>
    <footer class="footer flex">
        <div class="flex w-full items-center justify-between mx-auto max-w-6xl">
            <p>© {{ new Date().getFullYear() }} rlab</p>
            <div class="flex gap-6">
                <a v-if="config?.email" :href="`mailto:${config.email}`" target="_blank">
                    <Icon name="ic:outline-email" />
                </a>
                <a v-if="config?.dribbble" :href="config.dribbble" target="_blank">
                    <Icon name="fa-brands:dribbble" />
                </a>
                <a v-if="config?.github" :href="config.github" target="_blank">
                    <Icon name="fa-brands:github" />
                </a>
                <a v-if="config?.linkedin" :href="config.linkedin" target="_blank">
                    <Icon name="fa-brands:linkedin" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>
    const config = useRuntimeConfig();
</script>
