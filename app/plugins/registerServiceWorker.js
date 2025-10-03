export default defineNuxtPlugin((nuxtApp) => {
    if (process.client && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                // console.log('ServiceWorker registration successful with scope: ', registration);
            }).catch((error) => {
            // console.log('ServiceWorker registration failed: ', error);
        });
    }
});