import board from './board'
import { ipcRenderer, openDirectoryDialog, openExternalUrl } from './electron'
import { debounce, throttle } from './tools'

const Utils = {
    board,

    debounce,
    throttle,

    ipcRenderer,
    openDirectoryDialog,
    openExternalUrl,
}

export default Utils
