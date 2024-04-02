import App from './App.svelte';
let tt = localStorage.getItem('terminal') === "true";
if (tt || location.search.includes('terminal')) {
	localStorage.setItem("terminal", "true")
	if (typeof eruda.init === "function") {
		eruda.init()
	}
}

const app = new App({
	target: document.body,
	props: {
		theSecond: true
	}
});
export default app;