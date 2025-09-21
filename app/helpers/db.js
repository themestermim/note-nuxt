import {openDB} from "idb";

export const db = await openDB('notes-db', 2, {
    upgrade(db, oldVersion, newVersion) {
        if(!db.objectStoreNames.contains('notes')) {
            db.createObjectStore('notes', {keyPath: 'id', autoIncrement: true,})
        }

        if(!db.objectStoreNames.contains('meta')) {
            db.createObjectStore('meta', {keyPath: 'key'})
        }
    }
})


