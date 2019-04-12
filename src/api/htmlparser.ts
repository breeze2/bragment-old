import cheerio from 'cheerio'
// (window as any).cheerio = cheerio
export function htmlSecureParser(html: string) {
    const $ = cheerio.load('<div class="TEMPORARY_WRAPPER">' + html + '</div>')
    $('img').each((i, el) => {
        el.attribs['data-src'] = el.attribs.src
        delete el.attribs.src
    })
    $('a').each((i, el) => {
        el.attribs['data-href'] = el.attribs.href
        delete el.attribs.href
    })
    $('script').remove()
    return $('.TEMPORARY_WRAPPER').html() || ''
}
