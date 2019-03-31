import lowdb, { AdapterSync, LowdbSync } from 'lowdb'
import Utils from '../utils'

const FileSync = (window as any).require('lowdb/adapters/FileSync')
// const FileAsync = (window as any).require('lowdb/adapters/FileAsync')

export class LowDBSyncWrapper<Type = any> {
    private _db: LowdbSync<Type>
    public constructor(path: string) {
        const adapter: AdapterSync<Type> = new FileSync(path)
        this._db = lowdb(adapter)
    }
    public set(key: string, value: any) {
        return this._db.set(key, value)
    }
    public get(key: string, defaultValue?: any) {
        return this._db.get(key, defaultValue)
    }
}

function pushBoardColumn(db: LowDBSyncWrapper<any>, title: string) {

}

function getBoardLowDB(boardPath: string) {
    const path = Utils.joinPath(boardPath, '.brag/lowdb.json')
    const db = new LowDBSyncWrapper<any>(path)
    return db
}

export default {
    getBoardLowDB,
    pushBoardColumn,
}
