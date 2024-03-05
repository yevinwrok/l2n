import App from './App.svelte';


const app = new App({
	target: document.body,
	props: {
		theSecond: true
	}
});
export default app;