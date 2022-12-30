<script>
    import { createEventDispatcher } from "svelte";
    import customMeetupsStore from "./MeetupStore";
    import Button from "../UI/Button.svelte";
    import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";

    export let id;
    export let title;
    export let subtitle;
    export let imageUrl;
    export let description;
    export let address;
    export let contactEmail;
    export let isFavorite;

    let isLoading = false;

    const dispatch = createEventDispatcher();

    const toggleFavorite = () => {
      isLoading = true;
      //antes para  banco
      fetch(`https://sk-max-svelte-default-rtdb.firebaseio.com/meetups/${id}.json`,{
        method: 'PATCH',
        body: JSON.stringify({isFavorite : !isFavorite}),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        isLoading = false;
        if(!res.ok){
            throw new Error('Error favoriting meetups on Firebase');
          }
          customMeetupsStore.toggleFavorite(id);
      })
      .catch(err => {
        isLoading = false;
        console.log(err);
      });

    };

</script>


<article id={id} >
    <header>
        <h1>
            {title}
            {#if isFavorite}
              <Badge>♥️</Badge>
            {/if}
        </h1>
        <h2>{subtitle}</h2>
        <p>{address}</p>
    </header>
    <div class="image">
        <img src={imageUrl} alt={title}>
    </div>
    <div class="content">
        <p>{description}</p>
    </div>
    <footer>
       <Button type="button" mode="outline" on:click={()=> dispatch('edit', id)}>Edit</Button>
       <Button href="mailto:{contactEmail}" >Contact</Button>
       {#if isLoading}
        <span id="aviso" ><LoadingSpinner /> </span>
       {:else}
        <Button 
              type="button" 
              mode="outline" 
              color={isFavorite ? null : 'success'}
              on:click={toggleFavorite}
          >{isFavorite ? 'unFavorite' : 'Favorite'}</Button>
        <Button type= "button" on:click={() => dispatch('showDetails', id)}>Show Details</Button>
        {/if}
    </footer>
</article>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap');

    article {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      border-radius: 5px;
      background: white;
      margin: 1rem;
    }
  
    header,
    .content,
    footer {
      padding: 1rem;
    }
  
    .image {
      width: 100%;
      height: 14rem;
    }
  
    .image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    h1 {
      font-size: 1.25rem;
      margin: 0.5rem 0;
      font-family: "Roboto Slab", sans-serif;
    }
  
    h1.is-favorite {
      background: #01a129;
      color: white;
      padding: 0 0.5rem;
      border-radius: 5px;
    }
  
    h2 {
      font-size: 1rem;
      color: #808080;
      margin: 0.5rem 0;
    }
  
    p {
      font-size: 1.25rem;
      margin: 0;
    }
  
    div { 
      text-align: right;
    }

    .content {
      height: 4rem;
    }

    #aviso{
      max-height: 4rem;
      zoom: 0.2;
    }
  </style>
