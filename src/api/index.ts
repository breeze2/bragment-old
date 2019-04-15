import board from './board'
import electron from './electron'
import lowdb from './lowdb'
import { createMonacoEditor } from './monaco-editor'
import pouchdb from './pouchdb'
import unsplash from './unsplash'

import { htmlSecureParser } from './htmlparser'
import { mdParser } from './mdparser'

export * from './lowdb'
export * from './pouchdb'

const Api = {
    board,
    electron,
    lowdb,
    pouchdb,
    unsplash,

    createMonacoEditor,
    htmlSecureParser,
    mdParser,
}

export default Api
