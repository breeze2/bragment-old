export const AppActionTypes = {
    SET_CREATE_BOARD_MODAL_VISIBLE: 'SET_CREATE_BOARD_MODAL_VISIBLE',
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_ONLINE_STATUS: 'SET_ONLINE_STATUS',
}

export const setCreateBoardModalVisible = (visible: boolean) => ({
    payload: { visible },
    type: AppActionTypes.SET_CREATE_BOARD_MODAL_VISIBLE,
})

export const setLanguageAction = (language: string) => ({
    payload: { language },
    type: AppActionTypes.SET_LANGUAGE,
})

export const setOnlineStatusAction = () => ({
    payload: null,
    type: AppActionTypes.SET_ONLINE_STATUS,
})