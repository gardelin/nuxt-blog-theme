<template>
    <main class="mx-auto max-w-7xl w-full px-14">
        <section class="text-center mb-12">
            <h1 class="page-title">Projects</h1>
            <p class="page-description font-space-mono">A list of things I've worked on</p>
        </section>

        <section class="page-section h-full">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-black text-indigo-900 dark:text-indigo-200 sm:pl-6 md:pl-0">
                            Year
                        </th>
                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-black text-indigo-900 dark:text-indigo-200">Title</th>
                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-black text-indigo-900 dark:text-indigo-200">Description</th>
                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-black text-indigo-900 dark:text-indigo-200">Made at</th>
                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-black text-indigo-900 dark:text-indigo-200">Build with</th>
                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-black text-indigo-900 dark:text-indigo-200">Link</th>
                    </tr>
                </thead>
                <tbody class="">
                    <tr v-for="project in projects">
                        <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-indigo-900 sm:pl-6 md:pl-0 font-space-mono dark:text-indigo-500"
                        >
                            {{ project.year }}
                        </td>
                        <td class="whitespace-nowrap py-4 px-3 text-sm font-black text-indigo-500 dark:text-indigo-100">{{ project.name }}</td>
                        <td class="whitespace-normal py-4 px-3 text-sm text-indigo-900 dark:text-indigo-100">
                            {{ project.description }}
                        </td>
                        <td class="whitespace-nowrap py-4 px-3 text-sm text-indigo-900 dark:text-indigo-100">{{ project.firm }}</td>
                        <td class="stack whitespace-nowrap py-4 px-3 text-xs text-indigo-900 dark:text-indigo-100 font-space-mono">
                            <span v-for="tag in project.stack" class="mx-1">{{ tag }}</span>
                        </td>
                        <td class="flex whitespace-nowrap py-4 px-3 text-sm text-indigo-900 dark:text-indigo-100">
                            <div v-for="link in project.links">
                                <a :href="link.link" target="_blank">
                                    <icon v-if="link.type === 'website'" name="gridicons:domains" />
                                    <icon v-if="link.type === 'github'" name="eva:github-outline" />
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- More people... -->
                </tbody>
            </table>
        </section>
    </main>
</template>

<script setup>
    const config = useAppConfig();
    const projects = config.projects;
</script>

<style scoped>
    .stack span:after {
        content: '\00B7';
        padding-left: 5px;
    }

    .stack span:last-child:after {
        content: '';
    }
</style>
