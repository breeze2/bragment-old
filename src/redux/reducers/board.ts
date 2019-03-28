import Immutable, { List } from 'immutable'
import Api from '../../api'
import IUnsplashPhoto from '../../schemas/IUnsplashPhoto'
import { BoardActionTypes, IAction } from '../actions'

const InitialMenuState = Immutable.fromJS({
    standbyBgColors: Api.board.colors,
    standbyBgImages: [],
})

const app = (state = InitialMenuState, action: IAction) => {
    switch (action.type) {
        case BoardActionTypes.SET_STANDBY_BG_IMAGES:
            const images: IUnsplashPhoto[] = action.payload.images
            return state.set('standbyBgImages', List<IUnsplashPhoto>(images))
        default:
            return state
    }
}

export default app
