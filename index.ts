import MarkdownIt from 'markdown-it'
import { DirectiveOptions } from 'vue'

export enum MarkdownItPreset {
	Default = 'default',
	Zero = 'zero',
	CommonMark = 'commonmark'
}

type VueMarkdownDirective = DirectiveOptions & { preset?: MarkdownItPreset,  options?: MarkdownIt.Options }

const isPreset = (arg: string | undefined): arg is MarkdownItPreset =>
	(arg != null) && Object.values<string>(MarkdownItPreset).includes(arg)

const toOptions = (modifiers: { [key: string]: boolean }, defaults: MarkdownIt.Options = {}) => {
	const options = Object.assign({}, defaults)
	return Object.keys(modifiers).reduce((opts, key) => {
		const [opt, value] = (key.substring(0, 3) === "no-") ? [key.substring(3), false] : [key, true]
		opts[opt] = value
		return opts
	}, options as { [key: string]: boolean }) as MarkdownIt.Options
}

const vueMarkdownDirective: VueMarkdownDirective = {

	inserted(el, {value, arg, modifiers}) {
		const { preset = MarkdownItPreset.Default,  options } = this
		const presetName = isPreset(arg) ? arg : preset
		const mdOptions = toOptions(modifiers, options)
		const markdownIt = MarkdownIt(presetName, mdOptions)
		const md = (value != null) ? value : el.innerHTML
		markdownIt.render(md)
	}

}

export type VueMarkdownDirectiveOptions = MarkdownIt.Options
export default vueMarkdownDirective
