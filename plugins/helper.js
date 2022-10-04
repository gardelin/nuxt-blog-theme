/**
 * Generate slug from given string.
 *
 * @param {String} text
 * @returns {String}
 */
const slug = text => {
    return text.toLowerCase().replace(/ /g, '-').replace(/-$/, '');
};

/**
 * String date to locale date string
 *
 * @param {String} date
 * @returns {String}
 */
const formatDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(date).toLocaleDateString('en', options);
};

export default defineNuxtPlugin(() => {
    return {
        provide: {
            slug,
            formatDate,
        },
    };
});
