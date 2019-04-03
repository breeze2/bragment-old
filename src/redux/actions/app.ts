import IAction from '../../schemas/IAction'

export const AppActionTypes = {
    SET_BG_IMAGE_TIMESTAMP: 'SET_BG_IMAGE_TIMESTAMP',
    SET_CREATE_BOARD_MODAL_VISIBLE: 'SET_CREATE_BOARD_MODAL_VISIBLE',
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_ONLINE_STATUS: 'SET_ONLINE_STATUS',
}

export const setBgImageTimestampAction = (bgImageTimestamp: number): IAction => ({
    payload: { bgImageTimestamp },
    type: AppActionTypes.SET_BG_IMAGE_TIMESTAMP,
})

export const setCreateBoardModalVisibleAction = (visible: boolean): IAction => ({
    payload: { visible },
    type: AppActionTypes.SET_CREATE_BOARD_MODAL_VISIBLE,
})

export const setLanguageAction = (language: string): IAction => ({
    payload: { language },
    type: AppActionTypes.SET_LANGUAGE,
})

export const setOnlineStatusAction = (): IAction => ({
    payload: null,
    type: AppActionTypes.SET_ONLINE_STATUS,
})