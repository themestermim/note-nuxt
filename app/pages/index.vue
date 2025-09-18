<template>
    <main :class="{
        'h-[calc(100vh-56px)] overflow-auto transition-all': true,
        'pb-50': isMaximizedEditor,
        'pb-16': !isMaximizedEditor,
    }">
        <div class="container h-full bg-brown-50/75">
            <ul class="h-full overflow-auto space-y-4" v-if="noteList.length">
                <Note v-for="note in noteList.slice().reverse()" :key="note.id" :note="note" />
            </ul>
            <div class="h-full py-4" v-else>
                <section class="border border-brown-100 shadow-xs shadow-brown-100 bg-white px-4 py-6 rounded-2xl w-full">
                    <span class="text-5xl block text-center">🖐️</span>
                    <span class="text-sm text-center text-gray-600 block mt-4">هنوز هیچ پادداشتی ثبت نکردی</span>
                    <p class="text-sm text-center text-gray-400 block mt-2">برای شروع صفحه رو بکش بالا و اولین یادداشتتو بنویس</p>
                </section>
            </div>
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