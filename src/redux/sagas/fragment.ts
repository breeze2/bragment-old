import { List } from 'immutable'
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Api, { LowDBSyncWrapper } from '../../api'
import IAction, { IAsyncAction } from '../../schemas/IAction'
import IBoard from '../../schemas/IBoard'
import IFragment from '../../schemas/IFragment'
import IFragmentColumn from '../../schemas/IFragmentColumn'
import Utils from '../../utils'
import { BoardActionTypes, FragmentActionTypes } from '../actions'
import { handlePromiseWrapper, nerverThrowWrapper } from './helpers'
import { getBoard } from './selectors'
import IFragmentInfo from '../../schemas/IFragmentInfo';

function* moveFragmentSaga(action: IAction) {
    const boardStore = yield select(getBoard)
    const board: IBoard | null = boardStore.get('current')
    const lowdb: LowDBSyncWrapper<any> | null = boardStore.get('lowdb')
    if (lowdb && board) {
        const fromColumnTitle = action.payload.fromColumnTitle
        const fromColumnIndex = action.payload.fromColumnIndex
        const toColumnTitle = action.payload.toColumnTitle
        const toColumnIndex = action.payload.toColumnIndex

        const fragmentColumnList: List<IFragmentColumn> = boardStore.get('fragmentColumns')
        const fragmentColumns: IFragmentColumn[] = fragmentColumnList.toArray()
        const fromFragmentColumn: IFragmentColumn | undefined = fragmentColumns.find(el => el.title === fromColumnTitle)
        const toFragmentColumn: IFragmentColumn | undefined = fragmentColumns.find(el => el.title === toColumnTitle)
        if (fromFragmentColumn && toFragmentColumn) {
            const fragment = fromFragmentColumn.fragments[fromColumnIndex]
            const fragmentTitle = fragment.title
            const oldPath = Utils.joinPath(board.path, fromColumnTitle, fragmentTitle)
            const newPath = Utils.joinPath(board.path, toColumnTitle, fragmentTitle)

            // push to redux store
            toFragmentColumn.fragments.splice(toColumnIndex, 0, fromFragmentColumn.fragments.splice(fromColumnIndex, 1)[0])
            fromFragmentColumn.fragments = fromFragmentColumn.fragments.concat([])
            toFragmentColumn.fragments = toFragmentColumn.fragments.concat([])
            yield put<IAction>({
                payload: { fragmentColumns },
                type: BoardActionTypes.SET_FRAGMENT_COLUMNS,
            })

            const result = (fromColumnTitle === toColumnTitle) || (yield call(Utils.asyncMoveFile, oldPath, newPath))
            if (!result) {
                // undo in redux store
                fromFragmentColumn.fragments.splice(fromColumnIndex, 0, toFragmentColumn.fragments.splice(toColumnIndex, 1)[0])
                fromFragmentColumn.fragments = fromFragmentColumn.fragments.concat([])
                toFragmentColumn.fragments = toFragmentColumn.fragments.concat([])
                yield put<IAction>({
                    payload: { fragmentColumns },
                    type: BoardActionTypes.SET_FRAGMENT_COLUMNS,
                })
            }

            // save in lowdb
            lowdb.set('fragment_columns', fragmentColumns.concat([])).write()
            return result
        }
    }
    return true
}

function* createFragmentSaga(action: IAction) {
    const boardStore = yield select(getBoard)
    const board: IBoard | null = boardStore.get('current')
    const lowdb: LowDBSyncWrapper<any> | null = boardStore.get('lowdb')
    if (lowdb && board) {
        const columnTitle = action.payload.columnTitle
        const fragmentTitle = action.payload.fragmentTitle
        const path = Utils.joinPath(board.path, columnTitle, fragmentTitle)
        const result = yield call(Utils.asyncCreateFile, path)
        if (!result) {
            return false
        }
        const fragment: IFragment = {
            title: fragmentTitle,
        }

        // push to redux store
        const fragmentColumnList: List<IFragmentColumn> = boardStore.get('fragmentColumns')
        const fragmentColumns: IFragmentColumn[] = fragmentColumnList.toArray()
        const fragmentColumn: IFragmentColumn | undefined = fragmentColumns.find(el => el.title === columnTitle)
        if (fragmentColumn) {
            if (!fragmentColumn.fragments.find(el => el.title === fragmentTitle)) {
                fragmentColumn.fragments = fragmentColumn.fragments.concat([fragment])
                yield put<IAction>({
                    payload: { fragmentColumns },
                    type: BoardActionTypes.SET_FRAGMENT_COLUMNS,
                })
            }
        }

        // save in lowdb
        lowdb.set('fragment_columns', fragmentColumns.concat([])).write()
    }
    return true
}

function* featchFragmentInfoSaga(action: IAction) {
    const boardId: string = action.payload.boardId
    const columnTitle: string = action.payload.columnTitle
    const title: string = action.payload.fragmentTitle
    const board: IBoard = yield call(Api.board.getBoard, boardId)
    const path: string = Utils.joinPath(board.path, columnTitle, title)
    const content = yield call(Utils.asyncGetFileContent, path)
    const info: IFragmentInfo = {
        boardId,
        boardPath: board.path,
        boardTitle: board.title,
        columnTitle,
        content,
        title,
    }
    return info
}

const fragmentMethodsMap: { [key: string]: (action: IAction) => IterableIterator<any> } = {
    [FragmentActionTypes.ASYNC_CREATE_FRAGMENT]: createFragmentSaga,
    [FragmentActionTypes.ASYNC_MOVE_FRAGMENT]: moveFragmentSaga,
    [FragmentActionTypes.ASYNC_FETCH_FRAGMENT_INFO]: featchFragmentInfoSaga,
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

export function* watchFetchFragmentInfo() {
    yield takeLatest(FragmentActionTypes.ASYNC_FETCH_FRAGMENT_INFO, fragmentActionsDispatcher)
}

export function* watchMoveFragment() {
    yield takeLatest(FragmentActionTypes.ASYNC_MOVE_FRAGMENT, fragmentActionsDispatcher)
}
