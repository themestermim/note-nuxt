<template>
    <footer
        ref="footer"
        :class="['border-t border-t-gray-200 transition-all bg-white fixed bottom-0 inset-x-0 transition-all footer', isMaximizedEditor && 'open']"
        :style="{height: footerHeight + 'px'}"
        @touchstart="startDrag"
        @touchmove="handleDrag"
        @touchend="endDrag"
        @mousedown="startDrag"
        @mousemove="handleDrag"
        @mouseup="endDrag"
    >
        <button type="button" aria-label="drag"
            class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-400 rounded-full mt-1 cursor-grab touch-none"
        ></button>
        <div class="container flex flex-nowrap gap-2 px-4 pt-3 pb-2 h-full flex-system *:transition-all">
            <div class="w-auto flex-1 flex flex-col gap-0 inputs-col *:transition-all">
                <input type="text" v-model="note.title" id="title" name="title" class="focus:outline-none text-sm font-medium pr-2 text-gray-600 input max-h-0 overflow-hidden" />
                <textarea name="description" v-model="note.description" id="description" class="transition-all h-11 text-base w-full font-normal placeholder:text-gray-400 border border-gray-200 rounded-lg resize-none py-1 px-2 focus:outline-none textarea" placeholder="یادداشت خود را بنویسید ..."></textarea>
            </div>
            <div class="w-20 button-col">
                <button type="button" role="button" @click="addNote" class="transition-all h-11 w-full rounded-lg flex items-center justify-center px-2 gap-2.5 text-sm bg-brown-500 text-white">
                    <span>ارسال</span>
                </button>
            </div>
        </div>
    </footer>
</template>

<script setup>
import {useShared} from "~/store/shared/index.js";
import {useNotes} from "~/store/notes/index.js";

const sharedStore = useShared();
const noteStore = useNotes();
const noteList = computed(() => noteStore.noteList);
const isMaximizedEditor = computed(() => sharedStore.isMaximizedEditor);

const note = reactive({title: '', description: ''});
const footerHeight = ref(64);
const minHeight = 64;
const maxHeight = 200;
const footer = ref(null);
let isDragging = false;
let startY = 0;

const startDrag = event => {
    isDragging = true;
    startY = event.type.includes('touch') ? event.touches[0].clientY : event.clientY;
}

const handleDrag = (event) => {
    if (!isDragging) return;

    const currentY = event.type.includes('touch') ? event.touches[0].clientY : event.clientY;
    const deltaY = startY - currentY;

    if(deltaY > 0) {
        footerHeight.value = maxHeight;
        sharedStore.toggleFooterHeight(true);
    } else {
        footerHeight.value = minHeight;
        sharedStore.toggleFooterHeight(false);
    }
}

const endDrag = () => {
    isDragging = false;
}

const addNote = async () => {
    if(note.title !== '' || note.description !== '') {
        await noteStore.addNote(note);
        note.title = `وظیفه ${noteList.value.length + 1}`;
        note.description = '';
    }
}

onMounted(() => {
    note.title = `وظیفه ${noteList.value.length + 1}`;
})
</script>