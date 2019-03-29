import lowdb from 'lowdb'

const FileSync = (window as any).require('lowdb/adapters/FileSync')
const FileAsync = (window as any).require('lowdb/adapters/FileAsync')

class LowDBWrapper {
    private path: string
    public constructor(path: string) {
        this.path = path
    }
    public useSyncExecuter() {
        const adapter: lowdb.AdapterSync = new FileSync(this.path)
        return lowdb(adapter)
    }
    public useAsyncExecuter() {
        const adapter: lowdb.AdapterAsync = new FileAsync(this.path)
        return lowdb(adapter)
    }
}

function getBoardLowDB(boardPath: string) {
    const db = new LowDBWrapper(boardPath + '/.brag/lowdb.json')
    return db
}

export default {
    getBoardLowDB,
}