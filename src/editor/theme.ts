import { editor } from 'monaco-editor'

export const theme: editor.IStandaloneThemeData = {
    "base": "vs-dark",
    "colors": {
        "editor.background": "#323232",
        "editor.foreground": "#FFFFFF",
        "editor.lineHighlightBackground": "#353637",
        "editor.selectionBackground": "#5A647E",
        "editorCursor.foreground": "#91FF00",
        "editorWhitespace.foreground": "#404040",
    },
    "inherit": true,
    "rules": [
        {
            "foreground": "ffffff",
            "token": "text",
        },
        {
            "background": "282828",
            "foreground": "cdcdcd",
            "token": "source",
        },
        {
            "fontStyle": "italic",
            "foreground": "bc9458",
            "token": "comment",
        },
        {
            "foreground": "ffe5bb",
            "token": "meta.tag",
        },
        {
            "foreground": "ffe5bb",
            "token": "declaration.tag",
        },
        {
            "foreground": "ffe5bb",
            "token": "meta.doctype",
        },
        {
            "foreground": "ffc66d",
            "token": "entity.name",
        },
        {
            "foreground": "fff980",
            "token": "source.ruby entity.name",
        },
        {
            "foreground": "b7dff8",
            "token": "variable.other",
        },
        {
            "foreground": "cccc33",
            "token": "support.class.ruby",
        },
        {
            "foreground": "6c99bb",
            "token": "constant",
        },
        {
            "foreground": "6c99bb",
            "token": "support.constant",
        },
        {
            "foreground": "cc7833",
            "token": "keyword",
        },
        {
            "foreground": "d0d0ff",
            "token": "other.preprocessor.c",
        },
        {
            "fontStyle": "italic",
            "token": "variable.parameter",
        },
        {
            "background": "575757",
            "foreground": "ffffff",
            "token": "source comment.block",
        },
        {
            "foreground": "a5c261",
            "token": "string",
        },
        {
            "foreground": "aaaaaa",
            "token": "string constant.character.escape",
        },
        {
            "background": "cccc33",
            "foreground": "000000",
            "token": "string.interpolated",
        },
        {
            "foreground": "cccc33",
            "token": "string.regexp",
        },
        {
            "foreground": "cccc33",
            "token": "string.literal",
        },
        {
            "foreground": "787878",
            "token": "string.interpolated constant.character.escape",
        },
        {
            "fontStyle": "underline",
            "token": "entity.name.class",
        },
        {
            "fontStyle": "italic underline",
            "token": "entity.other.inherited-class",
        },
        {
            "foreground": "b83426",
            "token": "support.function",
        },
        {
            "foreground": "6ea533",
            "token": "markup.list.unnumbered.textile",
        },
        {
            "foreground": "6ea533",
            "token": "markup.list.numbered.textile",
        },
        {
            "fontStyle": "bold",
            "foreground": "c2c2c2",
            "token": "markup.bold.textile",
        },
        {
            "background": "ff0000",
            "foreground": "ffffff",
            "token": "invalid",
        },
        {
            "background": "fff980",
            "foreground": "323232",
            "token": "collab.user1",
        },
    ],
}
