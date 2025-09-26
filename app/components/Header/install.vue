<template>
    <div v-show="showInstallPrompt" class="fixed top-8 w-80 sm:w-96 bg-white shadow-xl border border-zinc-200 rounded-lg px-4 py-2 left-1/2 -translate-x-1/2 z-4">
        <p class="text-sm leading-6 text-gray-900 font-medium mb-2"> وب اپلیکیشن زوما را به صفحه
            اصلی خود اضافه کنید. </p>
        <div class="flex items-center gap-2">
            <button @click="installApp" type="button" role="button" aria-label="نصب"
                    class="text-white bg-brown-700 hover:bg-rown-800 focus:ring-4 focus:ring-brown-300 font-medium rounded-lg text-sm px-5 py-2 focus:outline-none">
                نصب
            </button>
            <button @click="dismissInstall" type="button" role="button" aria-label="نه" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-[13px] px-5 py-2"> فعلا نه </button>
        </div>
    </div>
</template>

<script setup>
    const showInstallPrompt = ref(false);
    const deferredPrompt = ref(null);

    const installPromptDismissed = useCookie('installPromptDismissed', {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const beforeInstallPromptHandler = (e) => {
        console.log('e')
        e.preventDefault();
        deferredPrompt.value = e;
        showInstallPrompt.value = true;
    };

    onMounted(() => {
        const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

        if (isInStandaloneMode) return;
        if (installPromptDismissed.value != null) return;
        if (installPromptDismissed.value === true || installPromptDismissed.value === false) return;

        window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    })

    const installApp = () => {
        showInstallPrompt.value = false;
        if (!deferredPrompt.value) return;

        deferredPrompt.value.prompt();
        deferredPrompt.value.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                installPromptDismissed.value = true;
            } else {
                installPromptDismissed.value = false;
            }
            window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
            deferredPrompt.value = null;
        });
    };

    const dismissInstall = () => {
        showInstallPrompt.value = false;
        installPromptDismissed.value = false;
        window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
        deferredPrompt.value = null;
    }

</script>