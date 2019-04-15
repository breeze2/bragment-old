const NodeJSPath = (window as any).require('path')
const NodeJSFS = (window as any).require('fs')
const NodeJSUrl = (window as any).require('url')
const downloader = (window as any).require('image-downloader')

interface IDirent {
    name: string
    isFile: () => boolean
}

export function joinPath(...paths: string[]) {
    return NodeJSPath.join(...paths)
}

export function formatFileUrl(...paths: string[]) {
    const pathname = joinPath(...paths)
    const url = NodeJSUrl.format({
        pathname,
        protocol: 'file',
        slashes: true,
    })
    return url
}

export function getPathBasename (path: string) {
    return NodeJSPath.basename(path)
}

export function asyncListDirectoryFile(path: string, suffix: string = '') {
    return new Promise<string[]>((resolve, reject) => {
        NodeJSFS.readdir(path, { withFileTypes: true }, (error: any, files: IDirent[]) => {
            if (error) {
                return reject(error)
            }
            const results: string[] = []
            const slen = suffix.length
            files.forEach(file => {
                const fileName = file.name
                const flen = file.name.length
                if (file.isFile() && slen < flen && fileName.substr(flen - slen, slen) === suffix) {
                    results.push(fileName)
                }
            })
            return resolve(results)
        })
    })
}

export function asyncCreateDirectory(path: string) {
    return new Promise<boolean>((resolve, reject) => {
        NodeJSFS.mkdir(path, { recursive: true }, (error: any) => {
            if (error && error.code !== 'EEXIST') {
                return reject(error)
            }
            return resolve(true)
        })
    })
}

export async function asyncCreateSubDirectoryRecursively (root: string, path: string) {
    const titles = []
    const dirs = path.split('/')
    let prefix = root
    for (const dir of dirs) {
        const title = dir.trim()
        if (title) {
            prefix = joinPath(prefix, title)
            titles.push(title)
            await asyncCreateDirectory(prefix)
        }
    }
    return titles.join('/')
}

export function asyncMoveFile(oldPath: string, newPath: string) {
    return new Promise<boolean>((resolve, reject) => {
        if (NodeJSFS.existsSync(newPath)) {
            return resolve(false)
        } else {
            NodeJSFS.rename(oldPath, newPath, (err: any) => {
                if (err) {
                    return reject(err)
                }
                return resolve(true)
            })
        }
    })
}

export function asyncGetFileContent(path: string) {
    return new Promise<string>((resolve, reject) => {
        NodeJSFS.readFile(path, 'utf8', (err: any, data: string) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(data)
            }
        })
    })
}

export function asyncCreateFile(path: string, content: string = '') {
    return new Promise<boolean>((resolve, reject) => {
        if (NodeJSFS.existsSync(path)) {
            return resolve(false)
        } else {
            NodeJSFS.writeFile(path, content, (err: any) => {
                if (err) {
                    return reject(err)
                }
                return resolve(true)
            })
        }
    })
}

export function asyncDownloadImage(url: string, dest: string): Promise<string> {
    return downloader.image({ url, dest }) as Promise<string>
}

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
    let timeoutID: number
    const wrapper = function (this: any, ...args: any[]) {
        if (!this && !args.length) {
            return
        }
        window.clearTimeout(timeoutID)
        timeoutID = window.setTimeout(() => fn.apply(this, args), delay)
    } as F
    return wrapper
}

export function throttle<F extends (...params: any[]) => void>(fn: F, delay: number) {
    let isThrottled: boolean
    let lastThis: any
    let lastArgs: any[]
    const wrapper = function (this: any, ...args: any[]) {
        if (!this && !args.length) {
            return
        }
        if (isThrottled) {
            lastThis = this
            lastArgs = args
            return
        }
        isThrottled = true
        fn.apply(this, args)
        window.setTimeout(() => {
            isThrottled = false
            wrapper.apply(lastThis, lastArgs)
        }, delay)
    } as F
    return wrapper
}

export function asyncSmoothScrollWrapper(scroll: (position: number) => any, from: number, to: number, time: number) {
    return new Promise((resolve, reject) => {
        const diff = to - from
        const animateScroll = (elapsedTime: number, increment: number = 20) => {
            elapsedTime += increment
            const position = easeInOut(elapsedTime, from, diff, time)
            scroll(position)
            if (elapsedTime < time) {
                setTimeout(() => {
                    animateScroll(elapsedTime)
                }, increment)
            } else {
                resolve()
            }
        }
        animateScroll(0)
    })
    function easeInOut(currentTime: number, start: number, change: number, duration: number) {
        currentTime /= duration / 2
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start
        }
        currentTime -= 1
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start
    }
}

const Utils = {
    debounce,
    throttle,

    asyncCreateDirectory,
    asyncCreateFile,
    asyncCreateSubDirectoryRecursively,
    asyncDownloadImage,
    asyncGetFileContent,
    asyncListDirectoryFile,
    asyncMoveFile,
    asyncSmoothScrollWrapper,

    formatFileUrl,
    getPathBasename,
    joinPath,
}

export default Utils
