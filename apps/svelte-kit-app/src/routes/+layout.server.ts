import type { LayoutServerLoad } from './$types';

export type LayoutData = {
    user: any;
};

export const load: LayoutServerLoad = (
    ({locals}) => {
        if (locals.user) {
            return {
                user: locals.user
            } as LayoutData;
        }

        return {
            user: undefined
        } as LayoutData
    }
);
