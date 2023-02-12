<script lang="ts">
    export let value: string = '';
    export let placeholder: string = '';
    export let id: string;
    export let label: string;
    export let type: string = 'text';
    export let disabled = false;
    export let required = false;
</script>

<div class="form-control w-full max-w-lg mb-2">
    <label for={id} class="label font-medium pb-1">
        <span class="label-text">{label}</span>
    </label>
    <input class="input input-bordered w-full max-w-lg"
        {type}
        {placeholder}
        {required}
        {disabled}
        {id}
        name={id}
        {value}
    />
</div>

