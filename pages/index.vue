<template>
    <section class="mx-auto max-w-6xl flex flex-col align-center justify-center px-12">
        <p class="font-black text-indigo-500 dark:text-indigo-400 font-normal font-space-mono mb-10">Hi, my name is</p>
        <h1 class="font-black text-7xl text-indigo-700 dark:text-white mb-5">Roko Labrović.</h1>
        <h1 class="font-black text-7xl text-indigo-400 dark:text-indigo-200 mb-5">I build things for the web.</h1>
        <p class="text-indigo-500 mb-10 font-space-mono">
            I’m a software engineer specializing in building (and occasionally <br />designing) exceptional digital experiences.
        </p>
        <NuxtLink
            class="border border-indigo-700 dark:border-indigo-400 px-7 py-4 mb-5 w-72 text-indigo-700 dark:text-indigo-400 no-underline text-center font-space-mono hover:bg-indigo-400 hover:text-white hover:dark:text-white transition"
            to="/articles"
        >
            Checkout my articles!</NuxtLink
        >
    </section>
</template>
