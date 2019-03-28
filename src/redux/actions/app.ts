export const AppActionTypes = {
    SET_CREATE_BOARD_MODAL_VISIBLE: 'SET_CREATE_BOARD_MODAL_VISIBLE',
    SET_LANGUAGE: 'SET_LANGUAGE',
}

export const setCreateBoardModalVisible = (visible: boolean) => ({
    payload: { visible },
    type: AppActionTypes.SET_CREATE_BOARD_MODAL_VISIBLE,
})

export const setLanguageAction = (key: string) => ({
    payload: { key },
    type: AppActionTypes.SET_LANGUAGE,
})
