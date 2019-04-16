import cheerio from 'cheerio'

interface IHtmlParserResult {
    content: string
    toc: string
}

export function htmlSecureParser(html: string): IHtmlParserResult {
    const $ = cheerio.load('<div class="TEMPORARY_WRAPPER">' + html + '</div>')
    $('img').each((i, el) => {
        el.attribs['data-src'] = el.attribs.src
        delete el.attribs.src
    })
    $('a').each((i, el) => {
        el.attribs['data-href'] = el.attribs.href
        el.attribs.href = 'javascript:;'
    })
    $('script').remove()

    let content = $('.TEMPORARY_WRAPPER').html()
    let toc = $('.toc').remove().html()

    content = content || ''
    toc = toc ? '<ul class="toc">' + toc + '</ul>' : ''
    return {
        content,
        toc,
    }
}
