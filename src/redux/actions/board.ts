import { LowDBSyncWrapper } from '../../api'
import IAction from '../../schemas/IAction'
import IBoard, { IBoardBase } from '../../schemas/IBoard'
import IFragmentColumn from '../../schemas/IFragmentColumn'
import IUnsplashPhoto from '../../schemas/IUnsplashPhoto'

export const BoardActionTypes = {
    ASYNC_CREATE_BOARD: 'ASYNC_CREATE_BOARD',
    ASYNC_FETCH_BOARD_LIST: 'ASYNC_FETCH_BOARD_LIST',
    ASYNC_FETCH_FRAGMENT_COLUMNS: 'ASYNC_FETCH_FRAGMENT_COLUMNS',
    ASYNC_FETCH_STANDBY_BG_IMAGES: 'ASYNC_FETCH_STANDBY_BG_IMAGES',
    ASYNC_INIT_CURRENT_BOARD: 'ASYNC_INIT_CURRENT_BOARD',
    ASYNC_MOVE_IN_FRAGMENT_COLUMNS: 'ASYNC_MOVE_IN_FRAGMENT_COLUMNS',
    ASYNC_PUSH_IN_FRAGMENT_COLUMNS: 'ASYNC_PUSH_IN_FRAGMENT_COLUMNS',

    ADD_RECENTLY_VIEWED_BOARD: 'ADD_RECENTLY_VIEWED_BOARD',
    SET_BOARD_LIST: 'SET_BOARD_LIST',
    SET_BOARD_LOWDB: 'SET_BOARD_LOWDB',
    SET_CURRENT_BOARD: 'SET_CURRENT_BOARD',
    SET_FRAGMENT_COLUMNS: 'SET_FRAGMENT_COLUMNS',
    SET_STANDBY_BG_IMAGES: 'SET_STANDBY_BG_IMAGES',
}

export const addRecentlyViewedBoard = (board: IBoard): IAction => ({
    payload: { board },
    type: BoardActionTypes.ADD_RECENTLY_VIEWED_BOARD,
})

export const setBoardList = (boards: IBoard[]): IAction => ({
    payload: { boards },
    type: BoardActionTypes.SET_BOARD_LIST,
})

export const setBoardLowDB = (lowdb: LowDBSyncWrapper<any>): IAction => ({
    payload: { lowdb },
    type: BoardActionTypes.SET_BOARD_LIST,
})

export const setCurrentBoard = (board: IBoard | null): IAction => ({
    payload: { board },
    type: BoardActionTypes.SET_CURRENT_BOARD,
})

export const setStandbyBgImages = (images: IUnsplashPhoto[]): IAction => ({
    payload: { images },
    type: BoardActionTypes.SET_STANDBY_BG_IMAGES,
})

export const asyncCreateBoard = (board: IBoardBase): IAction => ({
    payload: { board },
    type: BoardActionTypes.ASYNC_CREATE_BOARD,
})

export const asyncFetchBoardList = (): IAction => ({
    payload: null,
    type: BoardActionTypes.ASYNC_FETCH_BOARD_LIST,
})

export const asyncFetchFragmentColumns = (): IAction => ({
    payload: null,
    type: BoardActionTypes.ASYNC_FETCH_FRAGMENT_COLUMNS,
})

export const asyncFetchStandbyBgImages = (): IAction => ({
    payload: null,
    type: BoardActionTypes.ASYNC_FETCH_STANDBY_BG_IMAGES,
})

export const asyncInitCurretnBoard = (board: IBoard | null): IAction => ({
    payload: { board },
    type: BoardActionTypes.ASYNC_INIT_CURRENT_BOARD,
})

export const asyncMoveInFragmentColumns = (from: number, to: number): IAction => ({
    payload: { from, to },
    type: BoardActionTypes.ASYNC_MOVE_IN_FRAGMENT_COLUMNS,
})

export const asyncPushInFragmentColumns = (fragmentColumn: IFragmentColumn): IAction => ({
    payload: { fragmentColumn },
    type: BoardActionTypes.ASYNC_PUSH_IN_FRAGMENT_COLUMNS,
})
