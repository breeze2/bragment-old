import Immutable, { List } from 'immutable'
import IUnsplashPhoto from '../../schemas/IUnsplashPhoto'
import { AppActionTypes, InterfaceAction } from '../actions'

const LanguageDefault = 'en-US' || localStorage.getItem('LANGUAGE') || navigator.language
const InitialMenuState = Immutable.fromJS({
    createBoardModalVisible: false,
    language: LanguageDefault,
    unsplashStandbyImages: [],
    unsplashStandbyImagesUrl: [],
})

const app = (state = InitialMenuState, action: InterfaceAction) => {
    switch (action.type) {
        case AppActionTypes.SET_UNSPLASH_STANDBY_IMAGES:
            return state.set('unsplashStandbyImages', List<IUnsplashPhoto>(action.payload.images))
        case AppActionTypes.SET_CREATE_BOARD_MODAL_VISIBLE:
            return state.set('createBoardModalVisible', action.payload.visible)
        case AppActionTypes.SET_LANGUAGE:
            return state.set('language', action.payload.key)
        default:
            return state
    }
}

export default app
