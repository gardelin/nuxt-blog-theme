<template>
    <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>

    <div class="nuxt">
        <SiteHeader />
        <NuxtPage />
        <Footer />
    </div>
</template>

<script setup>
    useHead({
        script: [
            {
                children:
                    'if (window.netlifyIdentity) { window.netlifyIdentity.on("init", user => { if (!user) { window.netlifyIdentity.on("login", () => { document.location.href = "/admin/"; }); } }); }',
                body: true,
            },
        ],
    });
</script>
