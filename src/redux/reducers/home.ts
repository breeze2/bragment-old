import Immutable from 'immutable'
import IAction from '../../schemas/IAction'
import { HomeActionTypes } from '../actions'

const MenuKeyDefault = 'BOARDS'
const InitialMenuState = Immutable.fromJS({
    selectedMenuKey: MenuKeyDefault,
})

const home = (state = InitialMenuState, action: IAction) => {
    switch (action.type) {
        case HomeActionTypes.SET_SELECTED_MENU_KEY:
            return state.set('selectedMenuKey', action.payload.key)
        default:
            return state
    }
}

export default home
