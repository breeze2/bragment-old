import { List } from 'immutable'
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Api, { LowDBSyncWrapper } from '../../api'
import IAction, { IAsyncAction } from '../../schemas/IAction'
import IBoard, { IBoardBase } from '../../schemas/IBoard'
import IFragment from '../../schemas/IFragment'
import IFragmentColumn from '../../schemas/IFragmentColumn'
import Utils from '../../utils'
import { BoardActionTypes } from '../actions'
import { handlePromiseWrapper, nerverThrowWrapper } from './helpers'
import { getBoard } from './selectors'

function* fetchUnsplashStandbyImagesSaga() {
    const images = yield call(Api.unsplash.getRandomPhoto, 4)
    yield put<IAction>({ type: BoardActionTypes.SET_STANDBY_BG_IMAGES, payload: { images } })
    return images
}

function* createBoardSaga(action: IAction) {
    const board: IBoardBase = action.payload.board
    const id: string = yield call(Api.board.createBoard, board)
    yield put<IAction>({ type: BoardActionTypes.ASYNC_FETCH_BOARD_LIST, payload: null })
    return id
}

function* fetchBoardListSaga(action: IAction) {
    const boards = yield call(Api.board.getAllBoards)
    yield put<IAction>({ type: BoardActionTypes.SET_BOARD_LIST, payload: { boards } })
    return boards
}

function* moveInFragmentColumnsSaga(action: IAction) {
    const from: number = action.payload.from
    const to: number = action.payload.to
    const boardStore = yield select(getBoard)
    const lowdb: LowDBSyncWrapper<any> | null = boardStore.get('lowdb')
    if (lowdb) {
        const iFragmentColumns: List<IFragmentColumn> = boardStore.get('fragmentColumns')
        const fragmentColumns = iFragmentColumns.toArray()

        // push to redux store
        if (from < fragmentColumns.length && to < fragmentColumns.length) {
            fragmentColumns.splice(to, 0, fragmentColumns.splice(from, 1)[0])
            yield put<IAction>({ type: BoardActionTypes.SET_FRAGMENT_COLUMNS, payload: { fragmentColumns } })
        }
        // save in lowdb
        const columns = lowdb.get('fragment_columns', []).value()
        if (from < columns.length && to < columns.length) {
            columns.splice(to, 0, columns.splice(from, 1)[0])
            lowdb.set('fragment_columns', columns).write()
        }
    }
    return true
}

function* pushInFragmentColumnsSaga(action: IAction) {
    const boardStore = yield select(getBoard)
    const lowdb: LowDBSyncWrapper<any> | null = boardStore.get('lowdb')
    const board: IBoard | null = boardStore.get('current')
    const fragmentColumn: IFragmentColumn = action.payload.fragmentColumn
    if (lowdb && board) {
        const title: string = yield call(Utils.asyncCreateSubDirectoryRecursively, board.path, fragmentColumn.title)
        const path = Utils.joinPath(board.path, title)
        const fragments: IFragment[] = yield call(Api.board.parseFragments, path, fragmentColumn.fragments || [])
        fragmentColumn.title = title
        fragmentColumn.fragments = fragments

        // push to redux store
        const fragmentColumns: List<IFragmentColumn> = boardStore.get('fragmentColumns')
        yield put<IAction>({
            payload: {
                fragmentColumns: fragmentColumns.toArray().concat([fragmentColumn]),
            }, type: BoardActionTypes.SET_FRAGMENT_COLUMNS
        })

        // save in lowdb
        const columns = lowdb.get('fragment_columns', []).value()
        if (!columns.find((el: any) => {
            return el.title === title
        })) {
            columns.push(fragmentColumn)
            lowdb.set('fragment_columns', columns).write()
        }
    }
    return true
}

function* fetchFragmentColumnsSaga() {
    const boardStore = yield select(getBoard)
    const lowdb: LowDBSyncWrapper<any> | null = boardStore.get('lowdb')
    const board: IBoard | null = boardStore.get('current')
    if (board && lowdb) {
        const localFragmentColumns: IFragmentColumn[] = lowdb.get('fragment_columns', []).value()
        const fragmentColumns: IFragmentColumn[] = yield call(Api.board.parseFragmentColumns, board, localFragmentColumns)
        yield put<IAction>({ type: BoardActionTypes.SET_FRAGMENT_COLUMNS, payload: { fragmentColumns } })
        lowdb.set('fragment_columns', fragmentColumns).write()
        return fragmentColumns
    }
    return []
}

function* initCurrentBoardSaga(action: IAction) {
    const boardStore = yield select(getBoard)
    const newBoard: IBoard | null = action.payload.board
    const oldBoard: IBoard | null = boardStore.get('lowdb')
    if (!newBoard && !oldBoard) {
        // do nothing
        return false
    } else if (newBoard && oldBoard && newBoard._id === oldBoard._id) {
        // do nothing
        return false
    } else if (newBoard) {
        const lowdb: LowDBSyncWrapper<any> = Api.lowdb.getBoardLowDB(newBoard.path)
        yield all([put<IAction>({ type: BoardActionTypes.SET_CURRENT_BOARD, payload: { board: newBoard } }),
        put<IAction>({ type: BoardActionTypes.SET_BOARD_LOWDB, payload: { lowdb } })])
        yield put<IAction>({ type: BoardActionTypes.ASYNC_FETCH_FRAGMENT_COLUMNS, payload: null })
    } else {
        yield all([put<IAction>({ type: BoardActionTypes.SET_CURRENT_BOARD, payload: { board: null } }),
        put<IAction>({ type: BoardActionTypes.SET_BOARD_LOWDB, payload: { lowdb: null } })])
    }
    return true
}

const boardMethodsMap: { [key: string]: (action: IAction) => IterableIterator<any> } = {
    [BoardActionTypes.ASYNC_CREATE_BOARD]: createBoardSaga,
    [BoardActionTypes.ASYNC_FETCH_STANDBY_BG_IMAGES]: fetchUnsplashStandbyImagesSaga,
    [BoardActionTypes.ASYNC_FETCH_BOARD_LIST]: fetchBoardListSaga,
    [BoardActionTypes.ASYNC_FETCH_FRAGMENT_COLUMNS]: fetchFragmentColumnsSaga,
    [BoardActionTypes.ASYNC_INIT_CURRENT_BOARD]: initCurrentBoardSaga,
    [BoardActionTypes.ASYNC_MOVE_IN_FRAGMENT_COLUMNS]: moveInFragmentColumnsSaga,
    [BoardActionTypes.ASYNC_PUSH_IN_FRAGMENT_COLUMNS]: pushInFragmentColumnsSaga,
}

function* boardActionsDispatcher(action: IAsyncAction | IAction) {
    const method = boardMethodsMap[action.type]
    if (method) {
        if ('reject' in action && 'resolve' in action) {
            yield handlePromiseWrapper(action as IAsyncAction, method)
        } else {
            yield nerverThrowWrapper(action, method)
        }
    }
}

export function* watchCreateBoard() {
    yield takeLatest(BoardActionTypes.ASYNC_CREATE_BOARD, boardActionsDispatcher)
}

export function* watchFetchUnsplashStandbyImages() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_STANDBY_BG_IMAGES, boardActionsDispatcher)
}

export function* watchFetchBoardList() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_BOARD_LIST, boardActionsDispatcher)
}

export function* watchFetchFragmentColumns() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_FRAGMENT_COLUMNS, boardActionsDispatcher)
}

export function* watchInitCurrentBoard() {
    yield takeLatest(BoardActionTypes.ASYNC_INIT_CURRENT_BOARD, boardActionsDispatcher)
}

export function* watchMoveInFragmentColumns() {
    yield takeLatest(BoardActionTypes.ASYNC_MOVE_IN_FRAGMENT_COLUMNS, boardActionsDispatcher)
}

export function* watchPushInFragmentColumns() {
    yield takeLatest(BoardActionTypes.ASYNC_PUSH_IN_FRAGMENT_COLUMNS, boardActionsDispatcher)
}
