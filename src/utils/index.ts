const NodeJSPath = (window as any).require('path')
const NodeJSFS = (window as any).require('fs')
const NodeJSUrl = (window as any).require('url')
const downloader = (window as any).require('image-downloader')

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

export function createDirectory(path: string) {
    return new Promise((resolve, reject) => {
        NodeJSFS.mkdir(path, { recursive: true }, (error: any) => {
            if (error && error.code !== 'EEXIST') {
                reject(error)
            } else {
                resolve(true)
            }
        })
    })
}

export async function createSubDirectoryRecursively (root: string, path: string) {
    const titles = []
    const dirs = path.split('/')
    let prefix = root
    for (const dir of dirs) {
        const title = dir.trim()
        if (title) {
            prefix = joinPath(prefix, title)
            titles.push(title)
            await createDirectory(prefix)
        }
    }
    return titles.join('/')
}

export function downloadImage(url: string, dest: string): Promise<string> {
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

const Utils = {
    debounce,
    throttle,

    createDirectory,
    createSubDirectoryRecursively,
    downloadImage,
    formatFileUrl,
    getPathBasename,
    joinPath,
}

export default Utils
