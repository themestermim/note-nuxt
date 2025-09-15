import {openDB} from "idb";

export const db = await openDB('notes-db', 1, {
    upgrade(db) {
        if(!db.objectStoreNames.contains('notes')) {
            db.createObjectStore('notes', {keyPath: 'id', autoIncrement: true,})
        }
    }
})