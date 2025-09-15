<template>
    <li class="relative bg-white rounded-lg py-2 px-4 first:mt-4 last:mb-4">
        <div class="contents" v-if="!editing">
            <div class="flex items-start justify-between gap-4 pb-1 border-b border-b-brown-50">
                <span class="block text-sm font-bold text-gray-700 mt-0.5" v-text="note.title"></span>
                <div class="flex items-center gap-4 *:cursor-pointer *:p-0.5">
                    <button type="button" role="button" aria-label="ویرایش" @click="canEdit(true)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button type="button" role="button" aria-label="حذف" @click="noteStore.deleteNote(note.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
            <p class="block text-sm font-medium text-brown-400 mt-2 whitespace-pre-line" v-text="note.description"></p>
            <time class="block text-xs font-medium text-brown-500 mt-4 text-left" v-text="formatDate(note.createdAt)"></time>
        </div>
        <div class="contents" v-else>
            <div class="flex items-start justify-between gap-4 pb-1 border-b border-b-brown-50">
                <input type="text" class="block text-sm font-bold text-gray-700 w-full border border-gray-200 px-2 py-0.5 rounded" v-model="note.title" />
                <div class="flex items-center gap-4 *:cursor-pointer *:p-0.5">
                    <button type="button" role="button" aria-label="ویرایش" @click="canEdit(true)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-blue-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button type="button" role="button" aria-label="حذف" @click="noteStore.deleteNote(note.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
            <textarea class="block text-sm font-medium text-brown-400 mt-2 w-full" v-model="note.description"></textarea>
            <time class="block text-xs font-medium text-brown-500 mt-4 text-left" v-text="formatDate(note.createdAt)"></time>
        </div>
    </li>
</template>

<script setup>
import {useNotes} from "~/store/notes/index.js";
import {formatDate} from "~/helpers/shared.js";

const props = defineProps({
    note: {
        type: Object,
        default: () => ({})
    },
})

const editing = ref(false);

const noteStore = useNotes();

const canEdit = (state) => {
    editing.value = state;
}
</script>