import { LowDBSyncWrapper } from '../../api'
import IAction from '../../schemas/IAction'
import IBoard from '../../schemas/IBoard'
import IUnsplashPhoto from '../../schemas/IUnsplashPhoto'

export const BoardActionTypes = {
    ASYNC_FETCH_BOARD_LIST: 'ASYNC_FETCH_BOARD_LIST',
    ASYNC_FETCH_FRAGMENT_COLUMN: 'ASYNC_FETCH_FRAGMENT_COLUMN',
    ASYNC_FETCH_STANDBY_BG_IMAGES: 'ASYNC_FETCH_STANDBY_BG_IMAGES',
    ASYNC_INIT_CURRENT_BOARD: 'ASYNC_INIT_CURRENT_BOARD',

    ADD_RECENTLY_VIEWED_BOARD: 'ADD_RECENTLY_VIEWED_BOARD',
    SET_BOARD_LIST: 'SET_BOARD_LIST',
    SET_BOARD_LOWDB: 'SET_BOARD_LOWDB',
    SET_CURRENT_BOARD: 'SET_CURRENT_BOARD',
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

export const asyncFetchBoardList = (): IAction => ({
    payload: null,
    type: BoardActionTypes.ASYNC_FETCH_BOARD_LIST,
})

export const asyncFetchFragmentColumn = (): IAction => ({
    payload: null,
    type: BoardActionTypes.ASYNC_FETCH_FRAGMENT_COLUMN,
})

export const asyncFetchStandbyBgImages = (): IAction => ({
    payload: null,
    type: BoardActionTypes.ASYNC_FETCH_STANDBY_BG_IMAGES,
})

export const asyncInitCurretnBoard = (board: IBoard | null): IAction => ({
    payload: { board },
    type: BoardActionTypes.ASYNC_INIT_CURRENT_BOARD,
})
