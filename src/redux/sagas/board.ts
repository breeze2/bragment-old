import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import IAction, { IAsyncAction } from '../../schemas/IAction'
import IBoard from '../../schemas/IBoard'
import { BoardActionTypes } from '../actions'
import { getBoard } from './selectors'

import Api, { LowDBSyncWrapper } from '../../api'

export function* fetchUnsplashStandbyImages(action: IAction) {
    try {
        const images = yield call(Api.unsplash.getRandomPhoto, 4)
        yield put<IAction>({ type: BoardActionTypes.SET_STANDBY_BG_IMAGES, payload: { images } })
    } catch (e) {
        console.error(e)
    }
}

export function* fetchBoardList(action: IAction) {
    try {
        const boards = yield call(Api.board.getAllBoards)
        yield put<IAction>({ type: BoardActionTypes.SET_BOARD_LIST, payload: { boards } })
        if ((action as IAsyncAction).resolve) {
            (action as IAsyncAction).resolve(true)
        }
    } catch (e) {
        if ((action as IAsyncAction).reject) {
            (action as IAsyncAction).reject(e)
        }
        console.error(e)
    }
}

export function* initCurrentBoard(action: IAction) {
    try {
        const boardStore = yield select(getBoard)
        const newBoard: IBoard | null = action.payload.board
        const oldBoard: IBoard | null = boardStore.get('lowdb')
        if (!newBoard && !oldBoard) {
            // do nothing
        } else if (newBoard && oldBoard && newBoard._id === oldBoard._id) {
            // do nothing
        } else if (newBoard) {
            const lowdb: LowDBSyncWrapper<any> = Api.lowdb.getBoardLowDB(newBoard.path)
            yield put<IAction>({ type: BoardActionTypes.SET_CURRENT_BOARD, payload: { board: newBoard } })
            yield put<IAction>({ type: BoardActionTypes.SET_BOARD_LOWDB, payload: { lowdb } })
        } else {
            yield put<IAction>({ type: BoardActionTypes.SET_CURRENT_BOARD, payload: { board: null } })
            yield put<IAction>({ type: BoardActionTypes.SET_BOARD_LOWDB, payload: { lowdb: null } })
        }

    } catch (e) {
        console.error(e)
    }
}

export function* watchFetchUnsplashStandbyImages() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_STANDBY_BG_IMAGES, fetchUnsplashStandbyImages)
}

export function* watchFetchBoardList() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_BOARD_LIST, fetchBoardList)
}

export function* watchInitCurrentBoard() {
    yield takeLatest(BoardActionTypes.ASYNC_INIT_CURRENT_BOARD, initCurrentBoard)
}
