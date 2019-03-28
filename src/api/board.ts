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
        const background = Utils.joinPath(board.path, '.brag', 'assets/background.jpg')
        Utils.downloadImage(board.image, background)
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
    const result = await pouch.find({
        selector: {path: board.path},
    })
    if (result.docs.length) {
        const oldBoard: IBoard = result.docs[0]
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

export default {
    colors,
    createBoard,
    defaultColor: colors[0],
}
