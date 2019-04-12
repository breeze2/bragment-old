import * as monaco from 'monaco-editor'
import { conf, language } from './language'
import { theme } from './theme'
export const LANGUAGE_ID = 'markdown-fragment'
export const THEME_ID = 'idle-dark'

monaco.languages.register({ id: LANGUAGE_ID })
monaco.languages.setLanguageConfiguration(LANGUAGE_ID, conf)
monaco.languages.setMonarchTokensProvider(LANGUAGE_ID, language)
monaco.editor.defineTheme(THEME_ID, theme)
monaco.editor.setTheme(THEME_ID)

export default monaco
