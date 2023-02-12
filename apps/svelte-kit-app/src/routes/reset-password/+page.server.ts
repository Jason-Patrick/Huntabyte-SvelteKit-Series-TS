import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    resetPassword: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('users').requestPasswordReset(body.email as string);
            return {
                success: true
            };
        } catch (err) {
            console.error('Error: ', err);
            throw error(500, "Could not send password reset email");
        }
    }
};