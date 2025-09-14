<template>
    <footer
        ref="footer"
        class="border-t border-t-gray-200 transition-all bg-white fixed bottom-0 inset-x-0 transition-all"
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
        <div class="px-4 pt-3 pb-2 h-full">
            <div class="flex flex-wrap h-full">
                <div class="w-auto flex-1">
                    <input type="text" value="تایتل لیست" id="title" name="title" class="focus:outline-none text-sm font-medium pr-2 mb-1 text-gray-600" />
                    <textarea name="description" id="description" class="transition-all h-11 text-base w-full font-normal placeholder:text-gray-400 border border-gray-200 rounded-lg resize-none py-1 px-2 focus:outline-none" placeholder="یادداشت خود را بنویسید ..."></textarea>
                </div>
                <div :class="{
                    'h-fit': true,
                    'w-20 pr-2': !isMaximizedEditor,
                    'w-full pr-0 mt-2': isMaximizedEditor,
                }">
                    <button type="button" role="button" class="transition-all h-11 w-full rounded-lg flex items-center justify-center px-2 gap-2.5 text-sm bg-brown-500 text-white">
                        <span>ارسال</span>
                    </button>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import {useShared} from "~/store/shared/index.js";

const sharedStore = useShared();
const isMaximizedEditor = computed(() => sharedStore.isMaximizedEditor);

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
</script>