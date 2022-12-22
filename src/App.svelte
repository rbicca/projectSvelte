<script>
  import Header from './UI/Header.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import Button from './UI/Button.svelte';
  import MeetupEdit from './Meetups/MeetupEdit.svelte';
  import meetupsStore from './Meetups/MeetupStore';
  import { onDestroy } from 'svelte';
  import MeetupDetail from './Meetups/MeetupDetail.svelte';

  let loadedMeetups;
  let pageID;

  let destroy = meetupsStore.subscribe(values => {
    loadedMeetups = values;
  });

  let editMode = null;
  let page = 'overview';

  onDestroy(() => {
    destroy();
  });

  const addMeetup = (event) => {
    editMode = null;
  }

  const cancelEdit = ()=> {
    editMode = null;
  };

  const showDetails = (event) => {
    page = 'details';
    pageID = event.detail;
  };

</script>

<Header />

<main>
  {#if page === 'overview'}
    <div class="meetup-controls">
      <Button on:click={()=> editMode='add'}>New MeetUp</Button>
    </div>
    {#if editMode==='add' }
      <MeetupEdit on:addedd={addMeetup} on:cancel={cancelEdit}/>
    {/if}
    <MeetupGrid meetups={loadedMeetups} on:showDetails={showDetails}/>
  {:else}
    <MeetupDetail id={pageID} on:close={() => page = 'overview'}/>
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1 rem;
  }
</style>