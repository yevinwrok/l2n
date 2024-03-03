import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess(),
  kit: {
    env: {
      API_URL: process.env.API_URL,
    },
  }
};
