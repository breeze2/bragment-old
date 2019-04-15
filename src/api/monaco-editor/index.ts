import { editor as Editor, languages as Languages } from 'monaco-editor'
import { conf, language } from './language'
import { theme } from './theme'
export const LANGUAGE_ID = 'markdown-fragment'
export const THEME_ID = 'idle-dark'

Languages.register({ id: LANGUAGE_ID })
Languages.setLanguageConfiguration(LANGUAGE_ID, conf)
Languages.setMonarchTokensProvider(LANGUAGE_ID, language)
Editor.defineTheme(THEME_ID, theme)
Editor.setTheme(THEME_ID)

export function createMonacoEditor(el: HTMLElement, value: string = '') {
    return Editor.create(el, {
        automaticLayout: true,
        fontSize: 14,
        language: LANGUAGE_ID,
        minimap: {
            enabled: false,
        },
        value,
        wordWrap: 'off',
    })
}
