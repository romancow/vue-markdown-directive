# vue-markdown-directive

A Vue 2.0 directive to render markdown using the [markdown-it](https://github.com/markdown-it/markdown-it) parser.

## Installation

Add a scope mapping for the GitHub npm package manager by adding a `.npmrc` file with the line:
```
@romancow:registry=https://npm.pkg.github.com/
```

Then install the package:
```bash
npm install @romancow/vue-markdown-directive
```
or
```bash
yarn add @romancow/vue-markdown-directive
```

More info on using the GitHub npm package registry [here](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#installing-a-package).

## Usage

Add the directive to your app or component how you would any custom directive:
```javascript
import VueMarkdownDirective from '@romancow/vue-markdown-directive'

new Vue({
	el: '#myMarkdown',
	data: {
		content: "# My Markdown\n\nThis is my *markdown* content...\n\nAny questions?"
	},
	directives: {
		markdown: VueMarkdownDirective
	}
})
```

or register it globally:
```javascript
import VueMarkdownDirective from '@romancow/vue-markdown-directive'

Vue.directive('markdown', VueMarkdownDirective)
```

And to use it, just set the directive's value to your markdown property:
```html
<div v-markdown="content"></div>
```

Or, if the directive does not have a value, it will use its element's content:
```html
<div v-markdown>
{{content}}

## More Content
- Sam Beckett
- Al Calavicci
- Ziggy

[Click here!](https://quantumleap.fandom.com/)
</div>
```

### Presets & Options

You can set a global markdown-it [preset or options](https://github.com/markdown-it/markdown-it#init-with-presets-and-options) on the imported directive:
```javascript
import VueMarkdownDirective from '@romancow/vue-markdown-directive'

VueMarkdownDirective.preset = "commonmark"
VueMarkdownDirective.options = {
	html: true,
	linkify: true
}
```

You can also set/change the preset and options for each use of the directive. Set a preset using the directive's argument and options using modifiers:
```html
<div v-markdown:commonmark.html.linkify="content"></div>
```

**Note**: Setting options via modifiers only works for true/false values. To set an option to false, just prefix its name with "`no-`":
```html
<div v-markdown.no-linkify="content"></div>
```

### Plugins & Rules

Currently there is no way to add [plugins](https://github.com/markdown-it/markdown-it#plugins-load) or enable/disable [rules](https://github.com/markdown-it/markdown-it#manage-rules) (#2, #4).
