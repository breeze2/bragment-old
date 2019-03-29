import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { BoardActionTypes, IAction } from '../actions'

import Api from '../../api'

export function* fetchUnsplashStandbyImages(action: IAction) {
    try {
        const images = yield call(Api.unsplash.getRandomPhoto, 4)
        yield put({ type: BoardActionTypes.SET_STANDBY_BG_IMAGES, payload: { images } })
    } catch (e) {
        console.error(e)
    }
}

export function* fetchBoardList(action: IAction) {
    try {
        const boards = yield call(Api.board.getAllBoards)
        yield put({ type: BoardActionTypes.SET_BOARD_LIST, payload: { boards } })
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
