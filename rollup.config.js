import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from "autoprefixer";
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

console.log("@@@@@@@@@@@@ production ", production);
console.log("@@@@@@@@@@@@ API_URL ", process.env.API_URL);
function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev', '--port', '3030', "--host"], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

const config = [{
	input: 'src/main.ts',
	output: {
		sourcemap: false,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		replace({
			preventAssignment: true,
			"IS_DEV": !production,
			"API_URL_MOD": JSON.stringify(process.env.API_URL)
		}),
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: false,
				postcss: {
					plugins: [autoprefixer],
				},
			}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			onwarn(warning, handler) {
				const list = [
					'a11y-missing-attribute'
				]
				if (list.includes(warning.code)) {
					return;
				} else {
					console.log(warning);
				}
				handler(warning);
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: false,
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
},
];

if (production) {
	config.push({
		input: 'src/second_main.ts',
		output: {
			sourcemap: false,
			format: 'iife',
			name: 'app',
			file: 'public/build/bundle_second.js'
		},
		plugins: [
			replace({
				preventAssignment: true,
				"IS_DEV": !production,
				"API_URL_MOD": JSON.stringify(process.env.API_URL)
			}),
			svelte({
				preprocess: sveltePreprocess({
					sourceMap: false,
					postcss: {
						plugins: [autoprefixer],
					},
				}),
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production
				},
				onwarn(warning, handler) {
					const list = [
						'a11y-missing-attribute'
					]
					if (list.includes(warning.code)) {
						return;
					} else {
						console.log(warning);
					}
					handler(warning);
				}
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'bundle.css' }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte'],
				exportConditions: ['svelte']
			}),
			commonjs(),
			typescript({
				sourceMap: false,
			}),
		],
		watch: {
			clearScreen: false
		}
	})
}

export default config;