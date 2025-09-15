<template>
    <main :class="{
        'h-[calc(100vh-56px)] overflow-auto transition-all': true,
        'pb-50': isMaximizedEditor,
        'pb-16': !isMaximizedEditor,
    }">
        <div class="container h-full bg-brown-50/75">
            <ul class="h-full overflow-auto space-y-4">
                <li class="relative bg-white rounded-lg py-2 px-4 first:mt-4 last:mb-4" v-for="note in noteList" :key="note.id">
                    <div class="flex items-start justify-between gap-4 pb-1 border-b border-b-brown-50">
                        <span class="block text-xs font-bold text-brown-500" v-text="note.title"></span>
                        <span class="block text-xs font-medium text-brown-500" v-text="formatDate(note.createdAt)"></span>
                    </div>
                    <p class="block text-sm font-medium text-brown-400 mt-2" v-text="note.title"></p>
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup>
import {useShared} from "~/store/shared/index.js";
import {useNotes} from "~/store/notes/index.js";
import {formatDate} from "~/helpers/shared.js";

const sharedStore = useShared();
const noteStore = useNotes();
const isMaximizedEditor = computed(() => sharedStore.isMaximizedEditor);
const noteList = computed(() => noteStore.noteList);

noteStore.loadNotes();

</script>