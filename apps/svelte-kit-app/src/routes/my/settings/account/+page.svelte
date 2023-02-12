<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import {Input, Modal} from "$lib/components";
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

    let emailModalOpen: boolean;
    $: emailModalOpen = false;

    let usernameModalOpen: boolean;
    $: usernameModalOpen = false;

    let loading: boolean;
    $: loading = false;

    export let form: ActionData;
    export let data: PageData;

    const submitUpdateEmail: SubmitFunction = () => {
        loading = true;
        emailModalOpen = true;
        return async ({ result }) => {
            switch (result.type) {
                case 'success':
                    await invalidateAll();
                    emailModalOpen = false;
                    break;
                case 'error':
                    break;
                default:
                    await applyAction(result);
            }
            loading = false;
        }
    }

    const submitUpdateUsername: SubmitFunction = () => {
        loading = true;
        usernameModalOpen = true;
        return async ({ result }) => {
            switch (result.type) {
                case 'success':
                    await invalidateAll();
                    usernameModalOpen = false;
                    break;
                case 'error':
                    break;
                default:
                    await applyAction(result);
            }
            loading = false;
        }
    }

</script>

<div class="flex flex-col w-full h-full space-y-12">
    <div class="w-full">
        <h3 class="text-2xl font-medium">Change Email</h3>
        <div class="divider"></div>
        <Modal label="change-email" checked={emailModalOpen}>
            <span slot="trigger" class="btn btn-primary">
                Change Email
            </span>
            <h3 slot="heading">Change Your Email</h3>
            <form action="?/updateEmail" use:enhance={submitUpdateEmail} method="post" class="space-y-2">
                <Input
                    id="email"
                    type="email"
                    required={true}
                    value={form?.success ? data?.user?.email : ''}
                    label="Enter your new email address"
                    disabled={loading}
                />
                <button type="submit" class="btn btn-primary w-full" disabled={loading}>Change my email</button>
            </form>
        </Modal>
    </div>
    <div class="w-full">
        <div class="divider mb-0.5"></div>
        <h3 class="text-2xl font-medium">Change Username</h3>
        <Input
            id="username"
            label="Username"
            value={data?.user?.username}
            disabled
        />
        <Modal label="change-username" checked={usernameModalOpen}>
            <span slot="trigger" class="btn btn-primary">
                Change Username
            </span>
            <h3 slot="heading">Change Your Username</h3>
            <form use:enhance={submitUpdateUsername} action="?/updateUsername" method="post" class="space-y-2">
                <Input
                    id="username"
                    type="text"
                    required={true}
                    value={form?.success? data?.user?.username: ''}
                    label="Enter your new username"
                    disabled={loading}
                />
                <button type="submit" disabled={loading} class="btn btn-primary w-full">Change my username</button>
            </form>
        </Modal>
    </div>
</div>