import Immutable from 'immutable'
import { HomeActionTypes, IAction } from '../actions'

const MenuKeyDefault = 'BOARDS'
const InitialMenuState = Immutable.fromJS({
    selectedMenuKey: MenuKeyDefault as string,
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
