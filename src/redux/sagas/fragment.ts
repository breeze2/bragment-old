import { List } from 'immutable'
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { LowDBSyncWrapper } from '../../api'
import IAction, { IAsyncAction } from '../../schemas/IAction'
import IBoard from '../../schemas/IBoard'
import IFragment from '../../schemas/IFragment'
import IFragmentColumn from '../../schemas/IFragmentColumn'
import Utils from '../../utils'
import { BoardActionTypes, FragmentActionTypes } from '../actions'
import { handlePromiseWrapper, nerverThrowWrapper } from './helpers'
import { getBoard } from './selectors'

function* createFragmentSaga(action: IAction) {
    const boardStore = yield select(getBoard)
    const board: IBoard | null = boardStore.get('current')
    const columnTitle = action.payload.columnTitle
    const fragmentTitle = action.payload.fragmentTitle
    const lowdb: LowDBSyncWrapper<any> | null = boardStore.get('lowdb')
    if (lowdb && board) {
        const path = Utils.joinPath(board.path, columnTitle, fragmentTitle)
        const result = yield call(Utils.asyncCreateFile, path)
        if (!result) {
            return false
        }
        const fragment: IFragment = {
            title: fragmentTitle,
        }

        // push to redux store
        const fragmentColumns: List<IFragmentColumn> = boardStore.get('fragmentColumns')
        const fragmentColumn: IFragmentColumn | undefined = fragmentColumns.find(el => el.title === columnTitle)
        if (fragmentColumn) {
            if (!fragmentColumn.fragments.find(el => el.title === fragmentTitle)) {
                fragmentColumn.fragments = fragmentColumn.fragments.concat([fragment])
                yield put<IAction>({
                    payload: {
                        fragmentColumns: fragmentColumns.toArray(),
                    },
                    type: BoardActionTypes.SET_FRAGMENT_COLUMNS,
                })
            }
        }

        // save in lowdb
        const columns: IFragmentColumn[] = lowdb.get('fragment_columns', []).value()
        const column: IFragmentColumn | undefined = columns.find((el: any) => el.title === columnTitle)
        if (column) {
            if (!column.fragments.find(el => el.title === fragmentTitle)) {
                column.fragments = column.fragments.concat([fragment])
                lowdb.set('fragment_columns', columns).write()
            }
        }
    }
    return true
}

const fragmentMethodsMap: { [key: string]: (action: IAction) => IterableIterator<any> } = {
    [FragmentActionTypes.ASYNC_CREATE_FRAGMENT]: createFragmentSaga,
}

function* fragmentActionsDispatcher(action: IAsyncAction | IAction) {
    const method = fragmentMethodsMap[action.type]
    if (method) {
        if ('reject' in action && 'resolve' in action) {
            yield handlePromiseWrapper(action as IAsyncAction, method)
        } else {
            yield nerverThrowWrapper(action, method)
        }
    }
}

export function* watchCreateFragment() {
    yield takeLatest(FragmentActionTypes.ASYNC_CREATE_FRAGMENT, fragmentActionsDispatcher)
}
