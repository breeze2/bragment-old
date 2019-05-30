import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import IAction, { IAsyncAction } from '../../schemas/IAction'
import { HomeActionTypes } from '../actions'
import { sagaWorkersDispatcher } from './helpers'

function* selectMenuKeySaga(action: IAction) {
    yield put({ type: HomeActionTypes.SET_SELECTED_MENU_KEY, payload: action.payload })
}

const worker = sagaWorkersDispatcher({
    [HomeActionTypes.ASYNC_SELECT_MENU_KEY]: selectMenuKeySaga,
})

export function* watchSelectMenuKey() {
    yield takeLatest(HomeActionTypes.ASYNC_SELECT_MENU_KEY, worker)
}
