import MarkdownIt from 'markdown-it'
import { DirectiveOptions } from 'vue'

const vueMarkdownDirective: DirectiveOptions = {
	inserted(el, {value, arg, modifiers}) {
		const markdownIt = MarkdownIt()
		const md = (value != null) ? value : el.innerHTML
		markdownIt.render(md)
	}
}


export default vueMarkdownDirective
