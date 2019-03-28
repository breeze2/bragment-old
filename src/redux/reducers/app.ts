import Immutable, { List } from 'immutable'
import { AppActionTypes, IAction } from '../actions'

const LanguageDefault = 'en-US' || localStorage.getItem('LANGUAGE') || navigator.language
const InitialMenuState = Immutable.fromJS({
    createBoardModalVisible: false,
    language: LanguageDefault,
})

const app = (state = InitialMenuState, action: IAction) => {
    switch (action.type) {
        case AppActionTypes.SET_CREATE_BOARD_MODAL_VISIBLE:
            return state.set('createBoardModalVisible', action.payload.visible)
        case AppActionTypes.SET_LANGUAGE:
            return state.set('language', action.payload.key)
        default:
            return state
    }
}

export default app
