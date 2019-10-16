import MarkdownIt from 'markdown-it'
import { DirectiveOptions } from 'vue'

export enum MarkdownItPreset {
	Default = 'default',
	Zero = 'zero',
	CommonMark = 'commonmark'
}

const isPreset = (arg: string | undefined): arg is MarkdownItPreset =>
	(arg != null) && Object.values<string>(MarkdownItPreset).includes(arg)

const toOptions = (modifiers: { [key: string]: boolean }) => {
	return Object.keys(modifiers).reduce((opts, key) => {
		const [opt, value] = (key.substring(0, 3) === "no-") ? [key.substring(3), false] : [key, true]
		opts[opt] = value
		return opts
	}, {} as { [key: string]: boolean }) as MarkdownIt.Options
}

export type VueMarkdownDirective = DirectiveOptions & {
	preset?: MarkdownItPreset,
	options?: MarkdownIt.Options
}

const vueMarkdownDirective: VueMarkdownDirective = {
	options: {},

	inserted(el, {value, arg, modifiers}) {
		const preset = [value.preset, arg, this.preset].find(isPreset) || MarkdownItPreset.Default
		const options = Object.assign({}, value.options, toOptions(modifiers), this.options)
		const markdown = [value.markdown, value, el.innerText].find(md => typeof md === 'string')
		const markdownIt = MarkdownIt(preset, options)
		el.innerHTML = markdownIt.render(markdown)
	}
}

export type VueMarkdownDirectiveOptions = MarkdownIt.Options
export default vueMarkdownDirective
