import { List } from 'immutable'
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Api, { LowDBSyncWrapper } from '../../api'
import IAction, { IAsyncAction } from '../../schemas/IAction'
import IBoard, { IBoardBase } from '../../schemas/IBoard'
import IFragment from '../../schemas/IFragment'
import IFragmentColumn from '../../schemas/IFragmentColumn'
import Utils from '../../utils'
import { BoardActionTypes } from '../actions'
import { sagaWorkersDispatcher } from './helpers'
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

function* moveFragmentColumnSaga(action: IAction) {
    const from: number = action.payload.from
    const to: number = action.payload.to
    const boardStore = yield select(getBoard)
    const lowdb: LowDBSyncWrapper<any> | null = boardStore.get('lowdb')
    if (lowdb) {
        const fragmentColumnList: List<IFragmentColumn> = boardStore.get('fragmentColumns')
        const fragmentColumns = fragmentColumnList.toArray()

        // push to redux store
        if (from < fragmentColumns.length && to < fragmentColumns.length) {
            fragmentColumns.splice(to, 0, fragmentColumns.splice(from, 1)[0])
            yield put<IAction>({ type: BoardActionTypes.SET_FRAGMENT_COLUMNS, payload: { fragmentColumns } })
        }
        // save in lowdb
        lowdb.set('fragment_columns', fragmentColumns.concat([])).write()
    }
    return true
}

function* createFragmentColumnSaga(action: IAction) {
    const boardStore = yield select(getBoard)
    const lowdb: LowDBSyncWrapper<any> | null = boardStore.get('lowdb')
    const board: IBoard | null = boardStore.get('current')
    const fragmentColumn: IFragmentColumn = action.payload.fragmentColumn
    if (lowdb && board) {
        const title: string = yield call(Utils.asyncCreateSubDirectoryRecursively, board.path, fragmentColumn.title)

        // push to redux store
        const fragmentColumnList: List<IFragmentColumn> = boardStore.get('fragmentColumns')
        const fragmentColumns = fragmentColumnList.toArray()
        if (fragmentColumns.find(el => el.title === title)) {
            return false
        }
        const path = Utils.joinPath(board.path, title)
        const fragments: IFragment[] = yield call(Api.board.parseFragments, path, fragmentColumn.fragments || [])
        fragmentColumn.title = title
        fragmentColumn.fragments = fragments
        fragmentColumns.push(fragmentColumn)
        yield put<IAction>({ type: BoardActionTypes.SET_FRAGMENT_COLUMNS, payload: { fragmentColumns } })

        // save in lowdb
        lowdb.set('fragment_columns', fragmentColumns.concat([])).write()
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

const worker = sagaWorkersDispatcher({
    [BoardActionTypes.ASYNC_CREATE_BOARD]: createBoardSaga,
    [BoardActionTypes.ASYNC_FETCH_STANDBY_BG_IMAGES]: fetchUnsplashStandbyImagesSaga,
    [BoardActionTypes.ASYNC_FETCH_BOARD_LIST]: fetchBoardListSaga,
    [BoardActionTypes.ASYNC_FETCH_FRAGMENT_COLUMNS]: fetchFragmentColumnsSaga,
    [BoardActionTypes.ASYNC_INIT_CURRENT_BOARD]: initCurrentBoardSaga,
    [BoardActionTypes.ASYNC_MOVE_FRAGMENT_COLUMN]: moveFragmentColumnSaga,
    [BoardActionTypes.ASYNC_CREATE_FRAGMENT_COLUMN]: createFragmentColumnSaga,
})

export function* watchCreateBoard() {
    yield takeLatest(BoardActionTypes.ASYNC_CREATE_BOARD, worker)
}

export function* watchFetchUnsplashStandbyImages() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_STANDBY_BG_IMAGES, worker)
}

export function* watchFetchBoardList() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_BOARD_LIST, worker)
}

export function* watchFetchFragmentColumns() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_FRAGMENT_COLUMNS, worker)
}

export function* watchInitCurrentBoard() {
    yield takeLatest(BoardActionTypes.ASYNC_INIT_CURRENT_BOARD, worker)
}

export function* watchMoveFragmentColumn() {
    yield takeLatest(BoardActionTypes.ASYNC_MOVE_FRAGMENT_COLUMN, worker)
}

export function* watchCreateFragmentColumn() {
    yield takeLatest(BoardActionTypes.ASYNC_CREATE_FRAGMENT_COLUMN, worker)
}
