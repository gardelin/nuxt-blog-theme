import axios from 'axios';
import { readBody } from 'h3';

export default defineEventHandler(async event => {
    try {
        const { token } = await readBody(event);

        if (!token) {
            return {
                success: false,
                message: 'Invalid token',
            };
        }

        const url = `https://www.google.com/recaptcha/api/siteverify`;
        const data = {
            secret: process.env.SITE_RECAPTCHA_SECRET,
            response: token,
        };

        const response = await axios.post(url, data);

        if (response.status) {
            return {
                success: true,
                message: 'Token verified',
            };
        } else {
            return {
                success: false,
                message: 'Invalid token',
            };
        }
    } catch (e) {
        console.log('ReCaptcha error:', e);

        return {
            success: false,
            message: 'Internal error',
        };
    }
});
