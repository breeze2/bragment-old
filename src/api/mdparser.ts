import HighlightJs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import mdCheckbox from 'markdown-it-checkbox'
import mdContainer from 'markdown-it-container'
import mdEmoji from 'markdown-it-emoji'
import mdIns from 'markdown-it-ins'
import mdMark from 'markdown-it-mark'
import mdSub from 'markdown-it-sub'
import mdSup from 'markdown-it-sup'

const md: MarkdownIt = new MarkdownIt({
    html: true,
    highlight (str, lang) {
        if (lang && HighlightJs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' + HighlightJs.highlight(lang, str, true).value + '</code></pre>'
            } catch (error) {
                console.error(error)
            }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    },
})

md.use(mdSub)
    .use(mdSup)
    .use(mdIns)
    .use(mdMark)
    .use(mdCheckbox)
    .use(mdContainer)
    .use(mdEmoji)

export function mdParser(content: string) {
    const result = md.render(content)
    return result
}
