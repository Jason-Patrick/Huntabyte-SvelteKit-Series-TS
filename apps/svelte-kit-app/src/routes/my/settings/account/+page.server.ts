import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    updateEmail: async({ request, locals}) => {
        const data = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('users').requestEmailChange(data.email as string);
        } catch(err: any) {
            throw error(err.code, err.message)
        }

        return {
            success: true,
        }
    },
    updateUsername: async({ request, locals}) => {
        const data = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('users').getFirstListItem(`username="${data.username as string}"`);
        } catch(err: any) {
            if (err.status == 404) {
                try {
                    const { username } = await locals.pb.collection('users').update(locals.user.id, {username: data.username as string});
                    locals.user.username = username;

                    return {
                        success: true,
                    }
                } catch(err: any) {
                    console.log('Error: ', err);
                    throw error(err.status, err.message);
                }
            }
            throw error(err.status, err.message);
        }

        return {
            success: true,
        }
    }
};