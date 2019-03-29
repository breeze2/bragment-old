import shortid from 'shortid'
import IBoard, { IBoardBase } from '../schemas/IBoard'
import Utils from '../utils'
import lowdb from './lowdb'
import pouchdb from './pouchdb'

const colors: string[] = [
    'var(--blue)',
    'var(--cyan)',
    'var(--green)',
    'var(--orange)',
    'var(--purple)',
    'var(--red)',
    'var(--yellow)',
    'var(--grey)',
]

const pouch = pouchdb.getBoardPouchDB()
Object.defineProperty(window, 'pouch', {value: pouch})
async function createBoard(board: IBoardBase) {
    // 1. create directory
    await Utils.createDirectory(Utils.joinPath(board.path, '.brag'))
    await Utils.createDirectory(Utils.joinPath(board.path, '.brag', 'assets'))

    // 2. download image
    if (board.image) {
        const background = '.brag' + '/assets/background.jpg'
        Utils.downloadImage(board.image, Utils.joinPath(board.path, background))
        board.image = background
    }

    // 3. check existed
    const time = Date.now()
    const newBoard: any = {
        ...board,
        _id: shortid.generate(),
        created_at: time,
        updated_at: time,
    }
    const oldBoard = await pouch.findOne(
        { path: board.path }, undefined,
        ['path'],
    )
    if (oldBoard) {
        newBoard._id = oldBoard._id
        newBoard._rev = oldBoard._rev
        newBoard.created_at = oldBoard.created_at
    }
    // 4. save in pouch db
    const response = await pouch.put(newBoard)

    // 5. save in low db
    const low = lowdb.getBoardLowDB(newBoard.path).useSyncExecuter()
    low.set('board', newBoard).write()

    return response
}

async function getAllBoards() {
    const boards = await pouch.findAll(
        { path: { $gt: null }, updated_at: { $gt: null } },
        [{updated_at: 'desc'}],
        ['path', 'updated_at'])
    return boards
}

export default {
    colors,
    defaultColor: colors[0],

    createBoard,
    getAllBoards,
}
