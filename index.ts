import MarkdownIt from 'markdown-it'
import { DirectiveOptions } from 'vue'

export enum MarkdownItPreset {
	Default = 'default',
	Zero = 'zero',
	CommonMark = 'commonmark'
}
type VueMarkdownDirective = DirectiveOptions & { preset?: MarkdownItPreset,  options?: MarkdownIt.Options }

const vueMarkdownDirective: VueMarkdownDirective = {

	inserted(el, {value, arg, modifiers}) {
		const { preset = MarkdownItPreset.Default,  options } = this
		const markdownIt = MarkdownIt(preset, options)
		const md = (value != null) ? value : el.innerHTML
		markdownIt.render(md)
	}

}

export type VueMarkdownDirectiveOptions = MarkdownIt.Options
export default vueMarkdownDirective
