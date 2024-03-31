import { writable } from 'svelte/store';
import { isMobileDevice$1 } from "../tools/index"
export const isMobile = writable(isMobileDevice$1());
export const toastMessage = writable("")
export const message = writable({
    show: false,
    text: "",
    fn: undefined,
    title: "",
})
let now = isMobileDevice$1()
window.addEventListener("resize", throttle(() => {
    let current = isMobileDevice$1()
    if (now != current) {
        now = current
        isMobile.set(current)
    }
}, 200))

function throttle(func, delay) {
    let timeoutId;
    return function (...args) {
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                func(...args);
                timeoutId = null;
            }, delay);
        }
    };
}