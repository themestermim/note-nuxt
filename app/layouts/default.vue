<template>
    <Header />
    <Install />
    <NuxtPage />
    <Footer />
</template>

<script setup>
import Header from "~/components/Header/index.vue";
import Install from "~/components/Header/install.vue";
import Footer from "~/components/Footer/index.vue";

useHead({
    htmlAttrs: {
        lang: 'fa',
        dir: 'rtl',
    }
})

</script>