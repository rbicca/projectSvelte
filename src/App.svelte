<script>
  import Header from './UI/Header.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import Button from './UI/Button.svelte';
  import MeetupEdit from './Meetups/MeetupEdit.svelte';
  import meetupsStore from './Meetups/MeetupStore';
  import { onDestroy } from 'svelte';
  import MeetupDetail from './Meetups/MeetupDetail.svelte';
  import LoadingSpinner from './UI/LoadingSpinner.svelte';
  import Error from './UI/Error.svelte';

  let loadedMeetups;
  let pageID;
  let isLoading = true;
  let error;


  //Putz. Alemão relaxado não está buscando no onMount
  fetch('https://sk-max-svelte-default-rtdb.firebaseio.com/meetups.json')
    .then(res =>{
      setTimeout(() => {}, 3000);
      if (!res.ok){
        isLoading = false;
        throw new Error('Error getting data on Firebase');
      }
      return res.json();
    })
    .then(data => {
      //console.log(data);
      const savedMitas = [];
      for(const key in data){
        savedMitas.push({...data[key], id: key});
      }
      meetupsStore.setMeetups(savedMitas);
      isLoading = false;
    })
    .catch(err => {
      isLoading = false;
      error = err;
      console.log(err);
    });


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

  const clearError = () => {
    error = null;
  };

</script>

<Header />

{#if error}
  <Error message={error.message} on:cancel={clearError}/>
{/if}

<main>
  {#if page === 'overview'}
    {#if editMode==='add' || editMode === 'edit'}
      <MeetupEdit id={editID} on:addedd={savedMeetup} on:cancel={cancelEdit}/>
    {/if}
    
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid meetups={loadedMeetups}  on:add={() => editMode='add'} on:showDetails={showDetails} on:edit={startEdit}/>
    {/if}

  {:else}
    <MeetupDetail id={pageID} on:close={() => page = 'overview'}/>
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>