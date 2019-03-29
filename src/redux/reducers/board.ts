import Immutable, { List } from 'immutable'
import Api from '../../api'
import IBoard from '../../schemas/IBoard'
import IUnsplashPhoto from '../../schemas/IUnsplashPhoto'
import { BoardActionTypes, IAction } from '../actions'

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

const InitialMenuState = Immutable.fromJS({
    current: null as (IBoard | null),
    list: [] as IBoard[],
    recentlyViewed: getLocalRecentlyViewedBoards(),
    standbyBgColors: Api.board.colors as string[],
    standbyBgImages: [] as IUnsplashPhoto[],
})

const app = (state = InitialMenuState, action: IAction) => {
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
            return state.set('current', action.payload.board)

        case BoardActionTypes.SET_STANDBY_BG_IMAGES:
            const images: IUnsplashPhoto[] = action.payload.images
            return state.set('standbyBgImages', List<IUnsplashPhoto>(images))

        default:
            return state
    }
}

export default app
