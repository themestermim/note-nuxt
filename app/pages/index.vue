<template>
    <main :class="{
        'h-[calc(100vh-56px)] overflow-auto': true,
        'pb-50': isMaximizedEditor,
        'pb-16': !isMaximizedEditor,
    }">
        <div class="container h-full bg-brown-50"></div>
    </main>
</template>

<script setup>
import {useShared} from "~/store/shared/index.js";

const sharedStore = useShared();
const isMaximizedEditor = computed(() => sharedStore.isMaximizedEditor);

</script>