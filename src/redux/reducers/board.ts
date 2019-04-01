import Immutable, { List } from 'immutable'
import Api, { LowDBSyncWrapper } from '../../api'
import IAction from '../../schemas/IAction'
import IBoard from '../../schemas/IBoard'
import IUnsplashPhoto from '../../schemas/IUnsplashPhoto'
import { BoardActionTypes } from '../actions'

function getLocalRecentlyViewedBoards(): IBoard[] {
    let localRecentlyViewedBoards = []
    try {
        const temp = localStorage.getItem('RECENTLY_VIEWED_BOARDS')
        if (temp) {
            localRecentlyViewedBoards = JSON.parse(temp)
        }
    } catch {
        localRecentlyViewedBoards = []
    }
    if (!Array.isArray(localRecentlyViewedBoards)) {
        localRecentlyViewedBoards = []
    }
    return localRecentlyViewedBoards as IBoard[]
}

const InitialBoardState = Immutable.fromJS({
    current: null,
    fragmentColumns: [],
    list: [],
    lowdb: null,
    recentlyViewed: getLocalRecentlyViewedBoards(),
    standbyBgColors: Api.board.colors,
    standbyBgImages: [],
})

const app = (state = InitialBoardState, action: IAction) => {
    switch (action.type) {
        case BoardActionTypes.ADD_RECENTLY_VIEWED_BOARD:
            let newRecentlyViewed: IBoard[] = [action.payload.board]
            const oldRecentlyViewed: List<IBoard> = state.get('recentlyViewed')
            oldRecentlyViewed.forEach(board => {
                if (board._id !== newRecentlyViewed[0]._id) {
                    newRecentlyViewed.push(board)
                }
            })
            newRecentlyViewed = newRecentlyViewed.slice(0, 4)
            localStorage.setItem('RECENTLY_VIEWED_BOARDS', JSON.stringify(newRecentlyViewed))
            return state.set('recentlyViewed', List<IBoard>(newRecentlyViewed))

        case BoardActionTypes.SET_BOARD_LIST:
            const boards: IBoard[] = action.payload.boards
            return state.set('list', List<IBoard>(boards))

        case BoardActionTypes.SET_CURRENT_BOARD:
            const newBoard: IBoard | null = action.payload.board
            const oldBoard: IBoard | null = state.get('lowdb')
            if (!newBoard && !oldBoard) {
                return state
            } else if (newBoard && oldBoard && newBoard._id === oldBoard._id) {
                return state
            } else if (newBoard) {
                const lowdb: LowDBSyncWrapper<any> = Api.lowdb.getBoardLowDB(newBoard.path)
                return state.set('current', newBoard).set('lowdb', lowdb)
            } else {
                return state.set('current', null).set('lowdb', null)
            }

        case BoardActionTypes.SET_STANDBY_BG_IMAGES:
            const images: IUnsplashPhoto[] = action.payload.images
            return state.set('standbyBgImages', List<IUnsplashPhoto>(images))

        default:
            return state
    }
}

export default app
