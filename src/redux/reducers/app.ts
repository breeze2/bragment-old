import Immutable from 'immutable'
import { AppActionTypes, InterfaceAction } from '../actions'

const LanguageDefault = 'en-US' || localStorage.getItem('LANGUAGE') || navigator.language
const InitialMenuState = Immutable.fromJS({
    language: LanguageDefault,
})

const app = (state = InitialMenuState, action: InterfaceAction) => {
    switch (action.type) {
        case AppActionTypes.SET_LANGUAGE:
            return state.set('language', action.payload.key)
        default:
            return state
    }
}

export default app
