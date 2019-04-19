import IAction from '../../schemas/IAction'

export const FragmentActionTypes = {
    ASYNC_CREATE_FRAGMENT: 'ASYNC_CREATE_FRAGMENT',
    ASYNC_FETCH_FRAGMENT_INFO: 'ASYNC_FETCH_FRAGMENT_INFO',
    ASYNC_MOVE_FRAGMENT: 'ASYNC_MOVE_FRAGMENT',
    ASYNC_RENAME_FRAGMENT: 'ASYNC_RENAME_FRAGMENT',
    ASYNC_SAVE_FRAGMENT_CONTENT: 'ASYNC_SAVE_FRAGMENT_CONTENT',
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

export const asyncSaveFragmentContentAction = (fragmentPath: string, fragmentContent: string): IAction => ({
    payload: { fragmentContent, fragmentPath },
    type: FragmentActionTypes.ASYNC_SAVE_FRAGMENT_CONTENT,
})

export const asyncRenameFragmentAction = (boardId: string, columnTitle: string, fragmentTitle: string, newFragmentTitle: string): IAction => ({
    payload: { boardId, columnTitle, fragmentTitle, newFragmentTitle },
    type: FragmentActionTypes.ASYNC_RENAME_FRAGMENT,
})