<template>
    <main :class="{
        'h-[calc(100vh-56px)] overflow-auto transition-all': true,
        'pb-50': isMaximizedEditor,
        'pb-16': !isMaximizedEditor,
    }">
        <div class="container h-full bg-brown-50/75">
            <ul class="h-full overflow-auto space-y-4">
                <Note v-for="note in noteList.slice().reverse()" :key="note.id" :note="note" />
            </ul>
        </div>
    </main>
</template>

<script setup>
import {useShared} from "~/store/shared/index.js";
import {useNotes} from "~/store/notes/index.js";
import Note from "~/components/Home/NoteList/Note/index.vue";

const sharedStore = useShared();
const noteStore = useNotes();
const isMaximizedEditor = computed(() => sharedStore.isMaximizedEditor);
const noteList = computed(() => noteStore.noteList);

noteStore.loadNotes();

</script>