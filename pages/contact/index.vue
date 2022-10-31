<template>
    <section>
        <Script async :src="`https://www.google.com/recaptcha/api.js?render=${config.recaptchaKey}`"></Script>
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <section class="text-center mb-10">
                <h1 class="page-title">Contact</h1>
            </section>
            <p class="mb-8 lg:mb-16 font-light text-center text-indigo-900 dark:text-indigo-200 sm:text-xl">
                If you want to discuss a project you think I’d be a good fit for, or just want to have a chat, fill out my contact form.
            </p>
            <form class="space-y-8" accept-charset="UTF-8" v-on:submit.prevent="onSubmit()" method="POST">
                <input type="hidden" id="captchaResponse" name="g-recaptcha-response" v-model="recaptchaToken" />
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-indigo-300">E-mail</label>
                    <input
                        type="email"
                        v-model="email"
                        id="email"
                        class="block p-3 w-full text-sm text-indigo-900 bg-indigo-50 border border-indigo-50 rounded-lg shadow-sm placeholder-indigo-900 focus:border-indigo-900 dark:bg-indigo-700/10 dark:border-indigo-700/10 dark:placeholder-indigo-400 dark:text-white focus:outline-none dark:focus:border dark:focus:border-indigo-700 dark:shadow-sm-light"
                        placeholder="your@email.com"
                    />
                    <p v-if="errors.email" class="mt-2 text-red-500 text-xs italic">Please provide your email.</p>
                </div>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-indigo-300">Name</label>
                    <input
                        type="text"
                        v-model="name"
                        id="name"
                        class="block p-3 w-full text-sm text-indigo-900 bg-indigo-50 border border-indigo-50 rounded-lg shadow-sm placeholder-indigo-900 focus:border-indigo-900 dark:bg-indigo-700/10 dark:border-indigo-700/10 dark:placeholder-indigo-400 dark:text-white focus:outline-none dark:focus:border dark:focus:border-indigo-700 dark:shadow-sm-light"
                        placeholder="Your full name"
                    />
                    <p v-if="errors.name" class="mt-2 text-red-500 text-xs italic">Please provide your full name.</p>
                </div>
                <div>
                    <label for="subject" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-indigo-300">Subject</label>
                    <input
                        type="text"
                        v-model="subject"
                        id="subject"
                        class="block p-3 w-full text-sm text-indigo-900 bg-indigo-50 border border-indigo-50 rounded-lg shadow-sm placeholder-indigo-900 focus:border-indigo-900 dark:bg-indigo-700/10 dark:border-indigo-700/10 dark:placeholder-indigo-400 dark:text-white focus:outline-none dark:focus:border dark:focus:border-indigo-700 dark:shadow-sm-light"
                        placeholder="Your subject"
                    />
                    <p v-if="errors.subject" class="mt-2 text-red-500 text-xs italic">Please provide subject.</p>
                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-indigo-400">Message</label>
                    <textarea
                        id="message"
                        v-model="message"
                        rows="6"
                        class="block p-3 w-full text-sm text-indigo-900 bg-indigo-50 border border-indigo-50 rounded-lg shadow-sm placeholder-indigo-900 focus:border-indigo-900 dark:bg-indigo-700/10 dark:border-indigo-700/10 dark:placeholder-indigo-400 dark:text-white focus:outline-none dark:focus:border dark:focus:border-indigo-700 dark:shadow-sm-light"
                        placeholder="Your message"
                        type="text"
                    ></textarea>
                    <p v-if="errors.message" class="mt-2 text-red-500 text-xs italic">Please provide message.</p>
                </div>
                <p class="mt-2 text-xs text-indigo-900 dark:text-indigo-400">
                    This site is protected by reCAPTCHA and the
                    <a href="https://policies.google.com/privacy" target="_blank">Google Privacy Policy</a> and
                    <a href="https://policies.google.com/terms" target="_blank">Terms of Service apply.</a>
                </p>
                <button
                    type="submit"
                    class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-indigo-700 sm:w-fit hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:opacity-75"
                    :disabled="loading"
                >
                    <icon v-if="loading" class="mr-2" name="line-md:loading-twotone-loop" />
                    <span>Send message</span>
                </button>
                <div
                    v-if="status === 'error'"
                    :class="`p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800`"
                    role="alert"
                >
                    {{ submitMessage }}
                </div>
                <div
                    v-else-if="status === 'success'"
                    :class="`p-4 text-em text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800`"
                    role="alert"
                >
                    {{ submitMessage }}
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>
    import axios from 'axios';

    const config = useRuntimeConfig();

    let name = ref('');
    let email = ref('');
    let subject = ref('');
    let message = ref('');

    let recaptchaToken = ref('');
    let loading = ref(false);
    let status = ref('');
    let submitMessage = ref('');

    let errors = reactive({
        email: false,
        name: false,
        subject: false,
        message: false,
    });

    const onSubmit = async () => {
        const fieldsVerified = verifyFields();

        if (!fieldsVerified) {
            return;
        }

        loading.value = true;

        const recaptchaVerified = await verifyRecaptcha();

        if (!recaptchaVerified) {
            status.value = 'error';
            submitMessage.value = 'Invalid google recaptcha! Please, try again.';
            loading.value = false;
            return;
        }

        let data = {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
        };

        try {
            const response = await axios.post(`https://getform.io/f/${config.getFormId}`, data, {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.data.success) {
                loading.value = false;
                status.value = 'success';
                submitMessage.value = 'Your message was successfuly sent';
            }
        } catch (error) {
            status.value = 'error';
            message.value = error;
        }
    };

    onMounted(async () => {
        await loadRecaptchScriptAndFillInputValue();
    });

    onUnmounted(() => {
        grecaptcha?.destory;
    });

    const loadRecaptchScriptAndFillInputValue = () => {
        let newScript = document.createElement('script');
        newScript.src = `https://www.google.com/recaptcha/api.js?render=${config.recaptchaKey}`;

        newScript.addEventListener('load', () => {
            grecaptcha.ready(() => {
                grecaptcha.execute(config.recaptchaKey, { action: 'contact' }).then(token => {
                    recaptchaToken.value = token;
                });
            });
        });

        document.body.appendChild(newScript);
    };

    const verifyRecaptcha = async () => {
        const response = await axios.post('/api/verify-recaptcha', { token: recaptchaToken.value });

        if (response.data.success) {
            return true;
        }

        return false;
    };

    const verifyFields = () => {
        !email.value ? (errors.email = true) : (errors.email = false);
        !name.value ? (errors.name = true) : (errors.name = false);
        !subject.value ? (errors.subject = true) : (errors.subject = false);
        !message.value ? (errors.message = true) : (errors.message = false);

        if (email.value && name.value && subject.value && message.value) {
            return true;
        }

        return false;
    };
</script>

<style>
    .grecaptcha-badge {
        visibility: hidden;
    }
</style>
