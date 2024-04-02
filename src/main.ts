import App from './App.svelte';
// import 'bulma/css/bulma.css';

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
		theSecond: false
	}
});


export default app;