<template>
    <footer class="footer flex">
        <div class="flex w-full items-center justify-between mx-auto max-w-6xl">
            <p>© {{ new Date().getFullYear() }} rlab</p>
            <div class="flex gap-6">
                <a v-if="appConfig.socials?.dribbble" :href="appConfig.socials.dribbble" target="_blank">
                    <Icon name="fa-brands:dribbble" />
                </a>
                <a v-if="appConfig.socials?.github" :href="appConfig.socials.github" target="_blank">
                    <Icon name="fa-brands:github" />
                </a>
                <a v-if="appConfig.socials?.linkedin" :href="appConfig.socials.linkedin" target="_blank">
                    <Icon name="fa-brands:linkedin" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>
    const appConfig = useAppConfig();
</script>
