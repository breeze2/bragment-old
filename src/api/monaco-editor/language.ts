import { languages } from 'monaco-editor'

export const conf: languages.LanguageConfiguration & any = {
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
        { open: '<', close: '>', notIn: ['string'] },
    ],
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
    ],
    comments: {
        blockComment: ['<!--', '-->'],
    },
    folding: {
        markers: {
            end: new RegExp('^\\s*<!--\\s*#?endregion\\b.*-->'),
            start: new RegExp('^\\s*<!--\\s*#?region\\b.*-->'),
        },
    },
    surroundingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '`', close: '`' },
    ],
}

export const language: languages.IMonarchLanguage & any = {
    defaultToken: '',
    tokenPostfix: '.md',

    // escape codes
    control: /[\\`*_\[\]{}()#+\-\.!]/,
    escapes: /\\(?:@control)/,
    noncontrol: /[^\\`*_\[\]{}()#+\-\.!]/,

    // escape codes for javascript/CSS strings
    jsescapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,

    // non matched elements
    empty: [
        'area', 'base', 'basefont', 'br', 'col', 'frame',
        'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param',
    ],

    tokenizer: {
        root: [

            // headers (with #)
            [/^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/, ['white', 'md-heading', 'md-heading', 'md-heading']],

            // headers (with =)
            [/^\s*(=+|\-+)\s*$/, 'keyword'],

            // headers (with ***)
            [/^\s*((\*[ ]?)+)\s*$/, 'meta.separator'],

            // quote
            [/^(\s*)(>+)(.*)/, ['white', 'md-comment.tag', 'md-comment.content']],

            // list (starting with * or number)
            [/^\s*([\*\-+:]|\d+\.)\s/, 'keyword'],

            // code block (4 spaces indent)
            [/^(\t|[ ]{4})[^ ].*$/, 'string'],

            // code block (3 tilde)
            [/^\s*~~~\s*((?:\w|[\/\-#])+)?\s*$/, { token: 'string', next: '@codeblock' }],

            // github style code blocks (with backticks and language)
            // [/^\s*```\s*((?:\w|[\/\-#])+).*$/, { token: 'string', next: '@codeblockgh', nextEmbedded: '$1' }],
            [/^\s*```\s*((?:\w|[\/\-#])+)?\s*$/, { token: 'string', next: '@codeblock' }],

            // github style code blocks (with backticks but no language)
            [/^\s*```\s*$/, { token: 'string', next: '@codeblock' }],

            [/\b__(?!\s)([^_]|@escapes|_(?!_))+(?!\s)__\b/, 'strong'],

            // markup within lines
            { include: '@linecontent' },
        ],

        codeblock: [
            [/^\s*~~~\s*$/, { token: 'string', next: '@pop' }],
            [/^\s*```\s*$/, { token: 'string', next: '@pop' }],
            [/.*$/, 'variable.source'],
        ],

        // github style code blocks
        // codeblockgh: [
        //     [/```\s*$/, { token: 'variable.source', next: '@pop', nextEmbedded: '@pop' }],
        //     [/[^`]+/, 'variable.source'],
        // ],

        linecontent: [

            // escapes
            [/&\w+;/, 'string.escape'],
            [/@escapes/, 'escape'],

            // various markup
            [/\b__(?!\s)([^\\_]|@escapes|_(?!_))+(?!\s)__\b/, 'strong'],
            [/\b_(?!\s).+(?!\s)_\b/, 'emphasis'],
            // [/\*\*(?!\s)([^\\*]|@escapes|\*(?!\*))+(?!\s)\*\*/, 'strong'],
            [/\*(?!\s)([^\\*]|@escapes)+(?!\s)\*/, 'emphasis'],
            [/\*\*(?!\s).+(?!\s)\*\*/, 'strong'],
            // [/\*(?!\s)([^\\*]|@escapes)+(?!\s)\*/, 'emphasis'],
            [/`([^\\`]|@escapes)+`/, 'md-variable'],
            [/(~~)((?!\s)(?:~?!~|@escapes|[^\\~])+(?!\s))(~~)/, ['md-deleting.tag', 'md-deleting.content', 'md-deleting.tag']],
            [/(==)((?!\s)(?:=?!=|@escapes|[^\\=])+(?!\s))(==)/, ['md-marking.tag', 'md-marking.content', 'md-marking.tag']],
            [/(\+\+)((?!\s)(?:\+?!\+|@escapes|[^\\\+])+(?!\s))(\+\+)/, ['md-inserting.tag', 'md-inserting.content', 'md-inserting.tag']],

            // links
            [/\{+[^}]+\}+/, 'string.target'],
            [/(!?\[)((?:[^\]\\]|@escapes)*)(\]\([^\)]+\))/, ['string.link', '', 'string.link']],
            [/(!?\[)((?:[^\]\\]|@escapes)*)(\])/, 'string.link'],

            // or html
            { include: 'html' },
        ],

        // Note: it is tempting to rather switch to the real HTML mode instead of building our own here
        // but currently there is a limitation in Monarch that prevents us from doing it: The opening
        // '<' would start the HTML mode, however there is no way to jump 1 character back to let the
        // HTML mode also tokenize the opening angle bracket. Thus, even though we could jump to HTML,
        // we cannot correctly tokenize it in that mode yet.
        html: [
            // html tags
            [/<(\w+)\/>/, 'tag'],
            [/<(\w+)/, {
                cases: {
                    '@default': { token: 'tag', next: '@tag.$1' },
                    '@empty': { token: 'tag', next: '@tag.$1' },
                },
            }],
            [/<\/(\w+)\s*>/, { token: 'tag' }],

            [/<!--/, 'comment', '@comment'],
        ],

        comment: [
            [/[^<\-]+/, 'comment.content'],
            [/-->/, 'comment', '@pop'],
            [/<!--/, 'comment.content.invalid'],
            [/[<\-]/, 'comment.content'],
        ],

        // Almost full HTML tag matching, complete with embedded scripts & styles
        tag: [
            [/[ \t\r\n]+/, 'white'],
            ([/(type)(\s*=\s*)(")([^"]+)(")/, ['attribute.name.html', 'delimiter.html', 'string.html',
                { token: 'string.html', switchTo: '@tag.$S2.$4' },
                'string.html']] as languages.IMonarchLanguageRule),
            ([/(type)(\s*=\s*)(')([^']+)(')/, ['attribute.name.html', 'delimiter.html', 'string.html',
                { token: 'string.html', switchTo: '@tag.$S2.$4' },
                'string.html']] as languages.IMonarchLanguageRule),
            [/(\w+)(\s*=\s*)("[^"]*"|'[^']*')/, ['attribute.name.html', 'delimiter.html', 'string.html']],
            [/\w+/, 'attribute.name.html'],
            [/\/>/, 'tag', '@pop'],
            [/>/, {
                cases: {
                    '$S2==script': {
                        cases: {
                            '$S3': { token: 'tag', switchTo: 'embeddedScript', nextEmbedded: '$S3' },
                            '@default': { token: 'tag', switchTo: 'embeddedScript', nextEmbedded: 'text/javascript' },
                        },
                    },
                    '$S2==style': { token: 'tag', switchTo: 'embeddedStyle', nextEmbedded: 'text/css' },
                    '@default': { token: 'tag', next: '@pop' },
                },
            }],
        ],

        embeddedStyle: [
            [/[^<]+/, ''],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
            [/</, ''],
        ],

        embeddedScript: [
            [/[^<]+/, ''],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
            [/</, ''],
        ],
    },
}
