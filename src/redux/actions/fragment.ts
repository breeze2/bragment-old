import IAction from '../../schemas/IAction'

export const FragmentActionTypes = {
    ASYNC_CREATE_FRAGMENT: 'ASYNC_CREATE_FRAGMENT',
    ASYNC_FETCH_FRAGMENT_INFO: 'ASYNC_FETCH_FRAGMENT_INFO',
    ASYNC_MOVE_FRAGMENT: 'ASYNC_MOVE_FRAGMENT',
}

export const asyncCreateFragmentAction = (columnTitle: string, fragmentTitle: string): IAction => ({
    payload: { columnTitle, fragmentTitle },
    type: FragmentActionTypes.ASYNC_CREATE_FRAGMENT,
})

export const asyncMoveFragmentAction = (fromColumnTitle: string, fromColumnIndex: number, toColumnTitle: string, toColumnIndex: number): IAction => ({
    payload: { fromColumnTitle, fromColumnIndex, toColumnTitle, toColumnIndex },
    type: FragmentActionTypes.ASYNC_MOVE_FRAGMENT,
})

export const asyncFetchFragmentInfoAction = (boardId: string, columnTitle: string, fragmentTitle: string): IAction => ({
    payload: { boardId, columnTitle, fragmentTitle },
    type: FragmentActionTypes.ASYNC_FETCH_FRAGMENT_INFO,
})
