import { writable } from "svelte/store";

const meetupsList = writable([]);

const customMeetupsStore = {
    subscribe: meetupsList.subscribe,
    setMeetups: (meetupData) => {
        meetupsList.set(meetupData);
    }, 
    addMeetup: (meetupData) => {
        const newMeetup = {
            ...meetupData,
        }

        meetupsList.update(items => {
            return [newMeetup, ...items];
        });
    } ,
    updateMeetup: (id, meetupData) => {
        meetupsList.update(items => {
            const ix = items.findIndex(i => i.id === id);
            const updatedMeetup = { ...items[ix], ...meetupData};
            items[ix] = updatedMeetup;
            return [...items];
        });
    },
    removeMeetup: (id) => {
        meetupsList.update(items => {
            return items.filter(i => i.id !== id);
        });
    },
    toggleFavorite: (id) => { 
        meetupsList.update(items => {
            const ix = items.findIndex(m => m.id === id);
            items[ix].isFavorite = !items[ix].isFavorite;
            return[...items];
        });
    } 
};

export default customMeetupsStore;
