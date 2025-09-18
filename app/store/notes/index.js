import { defineStore } from 'pinia';
import {db} from "~/helpers/db.js";

export const useNotes = defineStore('Notes', {
    state: () => {
        return {
            noteList: [],
        }
    },
    actions: {
        async loadNotes() {
            this.noteList = await db.getAll('notes');
            console.log(this.noteList);
        },
        async addNote(note) {
            // console.log(note);
            const plainNote = { ...toRaw(note), createdAt: Date.now() }
            const id = await db.add('notes', plainNote);
            this.noteList.push({...plainNote, id});
        },
        async deleteNote(id) {
            await db.delete('notes', id)
            this.noteList = this.noteList.filter(n => n.id !== id)
        },
        async updateNote(id, updates) {
            const index = this.noteList.findIndex(n => n.id === id);
            if(index == -1) return;

            const updated = {...this.noteList[index], ...toRaw(updates), editedAt: Date.now(),};
            console.log(updated);

            await db.put('notes', updated);

            this.noteList.splice(index, 1, updated)
        }
    },
})
