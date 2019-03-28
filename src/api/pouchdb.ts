import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import IBoard, { IBoardBase } from '../schemas/IBoard'

PouchDB.plugin(PouchDBFind)

function getBoardPouchDB() {
    const pouch = new PouchDB<IBoard>('board', { adapter: 'idb' })
    console.log(pouch)
    pouch.createIndex({
        index: {
            fields: ['path'],
            name: 'board_path',
        },
    })
    return pouch
}

export default {
    getBoardPouchDB,
}
