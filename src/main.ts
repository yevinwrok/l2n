import App from './App.svelte';
// import 'bulma/css/bulma.css';
const app = new App({
	target: document.body,
	props: {
		theSecond: false
	}
});


export default app;