export const HomeActionTypes = {
    ASYNC_SELECT_MENU_KEY: 'ASYNC_SELECT_MENU_KEY',
    SET_SELECTED_MENU_KEY: 'SET_SELECTED_MENU_KEY',
}

export const setSelectedMenuKeyAction = (key: string) => ({
    payload: { key },
    type: HomeActionTypes.SET_SELECTED_MENU_KEY,
})

export const asyncSelectMenuKeyAction = (key: string) => ({
    payload: { key },
    type: HomeActionTypes.ASYNC_SELECT_MENU_KEY,
})
