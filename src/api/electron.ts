interface InterfaceElectron {
    remote: any
    ipcRenderer: any
    shell: any
}
const electron: InterfaceElectron = (window as any).require('electron')
const ipcRenderer = electron.ipcRenderer
const remote = electron.remote
const shell = electron.shell

function openExternalUrl(url: string): boolean {
    return shell.openExternal(url)
}

function openDirectoryDialog(): string[] | undefined {
    return remote.dialog.showOpenDialog({
        properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
    })
}

export default {
    openDirectoryDialog,
    openExternalUrl,
    remote,
    shell,
}
