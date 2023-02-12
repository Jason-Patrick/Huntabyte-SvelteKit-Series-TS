import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    updatePassword: async({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('users').update(locals.user.id, data);
            locals.pb.authStore.clear();
        } catch (err: any) {
            console.log('Error: ', err);
            throw error(err.status, err.message);
        }

        throw redirect(303, '/login');
    }
};