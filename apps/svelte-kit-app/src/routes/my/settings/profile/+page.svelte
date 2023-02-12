<script lang="ts">
    import type { PageData } from './$types';
    import {Icon, Pencil} from 'svelte-hero-icons';
    import { Input } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

    export let data: PageData;
    let loading: boolean;

    $: loading = false;

    const showPreview = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files as FileList;

        if (files.length > 0) {
            const src = URL.createObjectURL(files[0]);
            const preview = <HTMLImageElement>document.getElementById("avatar-preview");
            preview.src = src;
        }
    }

    const submitUpdateProfile: SubmitFunction = () => {
        loading = true;
        return async ({ result }) => {
            switch (result.type) {
                case 'success':
                    await invalidateAll();
                    break;
                case 'error':
                    break;
                default:
                    await applyAction(result);
                    break;
            }
            loading = false;
        }
    }
</script>

<div class="flex flex-col w-full h-full">
    <form
        enctype="multipart/form-data"
        action="?/updateProfile"
        method="POST"
        class="flex flex-col space-y-2 w-full"
        use:enhance={submitUpdateProfile}
    >
        <h3 class="text-2xl font-medium">Update Profile</h3>
        <div class="form-control w-full max-w-lg">
            <label for="avatar" class="label font-medium pb-1">
                <span class="label-text">Profile Picture</span>
            </label>
            <label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
                <label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
                    <span class="btn btn-circle btn-sm btn-secondary">
                        <Icon src={Pencil} class="w-4 h-4" />
                    </span>
                </label>
                <div class="w-32 rounded-full">
                    <img
                    src={ data.user?.avatar
                        ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
                        : `https://ui-avatars.com/?name=${data.user?.name}`
                    }
                    alt="user avatar"
                    id="avatar-preview"/>
                </div>
            </label>
            <input
                type="file"
                name="avatar"
                id="avatar"
                value=""
                accept="image/*"
                hidden
                on:change={showPreview}
                disabled={loading}
            />
        </div>
        <Input id="name" label="Name" value={data?.user?.name}  disabled={loading}/>
        <div class="w-full max-w-lg pt-3">
            <button type="submit" class="btn btn-primary w-full max-w-lg" disabled={loading}>Update Profile</button>
        </div>
    </form>
</div>