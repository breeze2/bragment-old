import Immutable, { List } from 'immutable'
import Api, { LowDBSyncWrapper } from '../../api'
import IAction from '../../schemas/IAction'
import IBoard from '../../schemas/IBoard'
import IFragmentColumn from '../../schemas/IFragmentColumn'
import IUnsplashPhoto from '../../schemas/IUnsplashPhoto'
import { BoardActionTypes } from '../actions'

function getLocalRecentlyViewedBoards() {
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
    return List<IBoard>(localRecentlyViewedBoards)
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

const board = (state = InitialBoardState, action: IAction) => {
    switch (action.type) {
        case BoardActionTypes.ADD_RECENTLY_VIEWED_BOARD:
            const recentlyViwedBoard: IBoard = action.payload.board
            const oldRecentlyViewed: List<IBoard> = state.get('recentlyViewed')
            let newRecentlyViewed: IBoard[] = [recentlyViwedBoard]
            oldRecentlyViewed.forEach(el => {
                if (el._id !== recentlyViwedBoard._id) {
                    newRecentlyViewed.push(el)
                }
            })
            newRecentlyViewed = newRecentlyViewed.slice(0, 4)
            localStorage.setItem('RECENTLY_VIEWED_BOARDS', JSON.stringify(newRecentlyViewed))
            return state.set('recentlyViewed', List<IBoard>(newRecentlyViewed))

        case BoardActionTypes.SET_BOARD_LIST:
            const boards: IBoard[] = action.payload.boards
            return state.set('list', List<IBoard>(boards))

        case BoardActionTypes.SET_BOARD_LOWDB:
            return state.set('lowdb', action.payload.lowdb)

        case BoardActionTypes.SET_CURRENT_BOARD:
            return state.set('current', action.payload.board)

        case BoardActionTypes.SET_FRAGMENT_COLUMNS:
            const fragmentColumns: IFragmentColumn[] = action.payload.fragmentColumns
            return state.set('fragmentColumns', List<IFragmentColumn>(fragmentColumns))

        case BoardActionTypes.SET_STANDBY_BG_IMAGES:
            const images: IUnsplashPhoto[] = action.payload.images
            return state.set('standbyBgImages', List<IUnsplashPhoto>(images))

        default:
            return state
    }
}

export default board
