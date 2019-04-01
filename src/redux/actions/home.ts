import IAction from '../../schemas/IAction'

export const HomeActionTypes = {
    ASYNC_SELECT_MENU_KEY: 'ASYNC_SELECT_MENU_KEY',
    SET_SELECTED_MENU_KEY: 'SET_SELECTED_MENU_KEY',
}

export const setSelectedMenuKeyAction = (key: string): IAction => ({
    payload: { key },
    type: HomeActionTypes.SET_SELECTED_MENU_KEY,
})

export const asyncSelectMenuKeyAction = (key: string): IAction => ({
    payload: { key },
    type: HomeActionTypes.ASYNC_SELECT_MENU_KEY,
})
