import Immutable, { List } from 'immutable'
import IAction from '../../schemas/IAction'
import { AppActionTypes } from '../actions'

const LanguageDefault = 'en-US' || localStorage.getItem('LANGUAGE') || navigator.language
const InitialMenuState = Immutable.fromJS({
    createBoardModalVisible: false,
    language: LanguageDefault,
    onlineStatus: true,
})

const app = (state = InitialMenuState, action: IAction) => {
    switch (action.type) {
        case AppActionTypes.SET_CREATE_BOARD_MODAL_VISIBLE:
            return state.set('createBoardModalVisible', action.payload.visible)
        case AppActionTypes.SET_LANGUAGE:
            localStorage.setItem('LANGUAGE', action.payload.language)
            return state.set('language', action.payload.language)
        case AppActionTypes.SET_ONLINE_STATUS:
            return state.set('onlineStatus', navigator.onLine)
        default:
            return state
    }
}

export default app
