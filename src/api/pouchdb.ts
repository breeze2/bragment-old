import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import IBoard from '../schemas/IBoard'

PouchDB.plugin(PouchDBFind)

export class PouchDBWrapper<Type> {
    private _db: PouchDB.Database<Type>
    private _createIndexRequestMap: {[key: string]: Promise<PouchDB.Find.CreateIndexResponse<Type>>} = {}
    public constructor (name: string) {
        this._db = new PouchDB<Type>(name, { adapter: 'idb' })
    }
    public setCreateIndexRequestMap(requestMap: {[key: string]: Promise<PouchDB.Find.CreateIndexResponse<Type>>}) {
        this._createIndexRequestMap = requestMap
    }
    public get(id: string) {
        return this._db.get(id)
    }
    public put(doc: Type) {
        return this._db.put(doc)
    }
    public createIndex(options: PouchDB.Find.CreateIndexOptions) {
        return this._db.createIndex(options)
    }
    public async find(options: PouchDB.Find.FindRequest<Type>, indexes: string[]) {
        const requests: Array<Promise<PouchDB.Find.CreateIndexResponse<Type>>> = []
        indexes.forEach(index => {
            if (this._createIndexRequestMap[index]) {
                requests.push(this._createIndexRequestMap[index])
            }
        })
        await Promise.all(requests)
        const result = this._db.find(options)
        return result
    }
    public async findOne(query: PouchDB.Find.Selector, sorts: Array<(string | { [propName: string]: "asc" | "desc" })> | undefined, indexes: string[]) {
        const result = await this.find({
            limit: 1,
            selector: query,
            sort: sorts,
        }, indexes)
        if (result.docs.length) {
            return result.docs[0] as Type
        }
        return null
    }
    public async findAll(query: PouchDB.Find.Selector, sorts: Array<(string | { [propName: string]: "asc" | "desc" })> | undefined, indexes: string[]) {
        const result = await this.find({
            selector: query,
            sort: sorts,
        }, indexes)
        return result.docs as Type[]
    }
}

function getBoardsPouchDB() {
    const pouch = new PouchDBWrapper<IBoard>('board')
    pouch.setCreateIndexRequestMap({
        'path': pouch.createIndex({ index: {
                fields: ['path'], name: 'path',
            },
        }),
        'updated_at': pouch.createIndex({
            index: {
                fields: ['updated_at'], name: 'updated_at',
            },
        }),
    })
    return pouch
}

export default {
    getBoardsPouchDB,
}
