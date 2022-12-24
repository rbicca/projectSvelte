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
  let editID;
  let page = 'overview';

  onDestroy(() => {
    destroy();
  });

  const savedMeetup = (event) => {
    editMode = null;
    editID = null;
  }

  const startEdit = (event) => {
    editMode = 'edit';
    editID = event.detail;
  };

  const cancelEdit = ()=> {
    editMode = null;
    editID = null;
  };

  const showDetails = (event) => {
    page = 'details';
    pageID = event.detail;
  };

</script>

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode==='add' || editMode === 'edit'}
      <MeetupEdit id={editID} on:addedd={savedMeetup} on:cancel={cancelEdit}/>
    {/if}
    <MeetupGrid meetups={loadedMeetups}  on:add={() => editMode='add'} on:showDetails={showDetails} on:edit={startEdit}/>
  {:else}
    <MeetupDetail id={pageID} on:close={() => page = 'overview'}/>
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>