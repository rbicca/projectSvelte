<script>
  import { createEventDispatcher } from "svelte";
  import { isEmpty, validateEmail } from "../helpers/validation";
  import customMeetupsStore from "./MeetupStore";

  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import TextInput from "../UI/TextInput.svelte";

  export let id = null;

  let title = ''; let titleValid = true;
  let subtitle = ''; let subtitleValid = true;
  let description = ''; let descriptionValid = true;
  let imageUrl = ''; let imageUrlValid = true;
  let address = ''; let addressValid = true;
  let contactEmail = ''; let contactEmailValid = true;
  let formIsValid = false;
 
  let dispatch = createEventDispatcher();

  if(id){
    let unscribeStore = customMeetupsStore.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      description = selectedMeetup.description;
      imageUrl = selectedMeetup.imageUrl;
      address = selectedMeetup.address;
      contactEmail = selectedMeetup.contactEmail;
    });
    unscribeStore();
  }

  $: titleValid = !isEmpty(title);  
  $: subtitleValid = !isEmpty(subtitle);  
  $: descriptionValid = !isEmpty(description);  
  $: imageUrlValid = !isEmpty(imageUrl);  
  $: addressValid = !isEmpty(address);  
  $: contactEmailValid = validateEmail(contactEmail);  
  $: formIsValid = titleValid && subtitleValid && descriptionValid && imageUrlValid && addressValid && contactEmailValid;

  const mySubmit = () => {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description : description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: contactEmail,
      isFavorite: false
    };

    if(id){
      customMeetupsStore.updateMeetup(id, meetupData);
    } else {
      customMeetupsStore.addMeetup(meetupData);
    }
    dispatch('addedd');
  };

  const deleteMeetup = () => {
    customMeetupsStore.removeMeetup(id);
    dispatch('addedd');
  };
  
</script>

<Modal title="Meetup" on:cancel>
    <form on:submit|preventDefault={mySubmit}>
        <TextInput id="title" label="Title" value={title} on:input={e => (title = e.target.value) } valid={titleValid} validityMessage="Inform the Meetup title" />
        <TextInput id="subtitle" label="Subtitle" value={subtitle} on:input={e => (subtitle = e.target.value) } valid={subtitleValid} validityMessage="Inform the subtile"/>
        <TextInput id="address" label="Address" value={address} on:input={e => (address = e.target.value) } valid={addressValid} validityMessage="Inform the address"/>
        <TextInput id="imageUrl" label="Image URL" value={imageUrl} on:input={e => (imageUrl = e.target.value) } valid={imageUrlValid} validityMessage="Inform the image URL"/>
        <TextInput id="contact Email" label="E-mail" value={contactEmail} on:input={e => (contactEmail = e.target.value)} type="email" valid={contactEmailValid} validityMessage="Tell us the e-mail"/>
        <TextInput id="description" label="Description" value={description} on:input={e => (description = e.target.value)} controlType="textarea" rows="3" valid={descriptionValid} validityMessage="Inform the description"/>
        <!-- <Button type="submit">Save</Button> -->
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={()=> dispatch('cancel')}>Cancel</Button>
        <Button type="button" on:click={mySubmit} disabled={!formIsValid}>Save</Button>
        {#if id}
          <Button type="button" on:click={deleteMeetup}>Delete</Button>
        {/if}
    </div>
</Modal>

<style>
    form {
        width: 100%;
    }
</style>