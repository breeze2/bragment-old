import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import IAction from '../../schemas/IAction'
import { HomeActionTypes } from '../actions'

export function* selectMenuKeySaga(action: IAction) {
    try {
        yield put({ type: HomeActionTypes.SET_SELECTED_MENU_KEY, payload: action.payload })
    } catch (e) {
        console.error(e)
    }
}

export function* watchSelectMenuKey() {
    yield takeLatest(HomeActionTypes.ASYNC_SELECT_MENU_KEY, selectMenuKeySaga)
}
