import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
	input: pkg.module,
	output: {
		file: pkg.main,
		name: 'VueMarkdownDirective',
		format: 'umd',
		sourcemap: true,
		sourcemapExcludeSources: true
	},
	plugins: [ resolve(), terser() ]
}
