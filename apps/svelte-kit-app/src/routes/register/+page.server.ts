import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { randomBytes } from 'crypto';


export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

const generateUsername = (name: string) => {
    const id = randomBytes(2).toString('hex')
    return `${name.slice(0, 5)}${id}`
}


export const actions: Actions = {
    register: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
        let username = generateUsername((body.name as string).split(' ').join('')).toLowerCase();

        try {
            await locals.pb.collection('users').create({ username, ...body});
            // await locals.pb.collection('users').requestVerification(body.email as string);
        } catch (err) {
            console.error('Error: ', err);
            throw error(500, 'something went wrong registering');
        }

        throw redirect(303, '/login');
    }
};