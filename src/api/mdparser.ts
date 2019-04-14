import { markdownItAll } from 'markdown-it-all'

const md = markdownItAll()
export function mdParser(content: string) {
    const result = md.render(content)
    return result
}
