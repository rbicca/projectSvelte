<script>
    import Button from "../UI/Button.svelte";
    import MeetupFilter from "./MeetupFilter.svelte";
    import MeetupItem from "./MeetupItem.svelte";
    import { createEventDispatcher } from "svelte";

    export let meetups;
    
    $: filteredMeetups = favsOlny ? meetups.filter(i => i.isFavorite) : meetups;
    
    let favsOlny = false;
    const dispatch = createEventDispatcher();

    const setFilter = (event) => {
        favsOlny = event.detail === 1;
    };

</script>


<section id="meetup-controls">
    <MeetupFilter on:select={setFilter}/>
    <Button on:click={()=> dispatch('add')}>New MeetUp</Button>
</section>

<section id="meetups">
    {#each filteredMeetups as meetup, i (meetup.id)}
        <MeetupItem {...meetup}  on:showDetails on:edit/>
    {/each}
</section>

<style>
    #meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    #meetup-controls {
        margin: 1 rem;
        display: flex;
        justify-content: space-between;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }

</style>