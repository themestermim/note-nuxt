import { defineStore } from 'pinia';

export const useShared = defineStore('Shared', {
    state: () => {
        return {
            isMaximizedEditor: false,
        }
    },
    actions: {
        toggleFooterHeight(state) {
            this.isMaximizedEditor = state;
        }
    },
})
