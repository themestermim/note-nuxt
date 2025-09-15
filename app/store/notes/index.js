import { defineStore } from 'pinia';

export const useNotes = defineStore('Notes', {
    state: () => {
        return {
            noteList: [],
        }
    },
    actions: {

    },
})
