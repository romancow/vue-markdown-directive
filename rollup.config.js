import pkg from './package.json'
import builtins from 'rollup-plugin-node-builtins'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
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
	plugins: [ builtins(), resolve(), commonjs(), json(), terser() ]
}
