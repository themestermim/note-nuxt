<template>
    <header class="h-14 border-b border-b-gray-200 bg-white">
        <div class="container h-full flex items-center">
            <div class="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <span class="text-sm font-bold">دفترچه یادداشت من</span>
            </div>
        </div>
    </header>
</template>

<script setup>
import {getFetchRequest} from "~/helpers/api.js";
import {getVersion, setVersion} from "~/helpers/shared.js";


const getAppVersion = async () => {
    try {
        const localVersion = await getVersion()
        const response = await getFetchRequest('version');
        const remoteVersion = response.version;

        if (!localVersion) {
            await setVersion(remoteVersion)
        } else if (localVersion.value !== remoteVersion) {
            await setVersion(remoteVersion)
            console.log("نسخه آپدیت شد:", remoteVersion)
            alert("نسخه جدید اپلیکیشن موجود است!")
        }
    } catch (e) {

    }
}

onMounted(() => {
    getAppVersion();
})
</script>