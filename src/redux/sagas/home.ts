import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import IAction, { IAsyncAction } from '../../schemas/IAction'
import { HomeActionTypes } from '../actions'
import { handlePromiseWrapper, nerverThrowWrapper } from './helpers'

function* selectMenuKeySaga(action: IAction) {
    yield put({ type: HomeActionTypes.SET_SELECTED_MENU_KEY, payload: action.payload })
}

const homeMethodsMap: { [key: string]: (action: IAction) => IterableIterator<any> } = {
    [HomeActionTypes.ASYNC_SELECT_MENU_KEY]: selectMenuKeySaga,
}

function* homeActionsDispatcher(action: IAsyncAction | IAction) {
    const method = homeMethodsMap[action.type]
    if (method) {
        if ('reject' in action && 'resolve' in action) {
            yield handlePromiseWrapper(action as IAsyncAction, method)
        } else {
            yield nerverThrowWrapper(action, method)
        }
    }
}

export function* watchSelectMenuKey() {
    yield takeLatest(HomeActionTypes.ASYNC_SELECT_MENU_KEY, homeActionsDispatcher)
}
