<script>
    import { slide } from 'svelte/transition';
</script>

<span transition:slide>
    <slot />
</span>


<style>
    span {
        display: inline-block;
        margin: 0 0.25 rem;
        border-radius: 3px;
        border: 1 solid white;
        background: white;
        color: #cf0056;
        padding: 0 0.5rem;
    }
</style>