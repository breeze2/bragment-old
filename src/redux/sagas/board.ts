import { List } from 'immutable'
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import IAction, { IAsyncAction } from '../../schemas/IAction'
import IBoard, { IBoardBase } from '../../schemas/IBoard'
import { BoardActionTypes } from '../actions'
import { getBoard } from './selectors'

import Api, { LowDBSyncWrapper } from '../../api'
import IFragment from '../../schemas/IFragment'
import IFragmentColumn from '../../schemas/IFragmentColumn'
import Utils from '../../utils'

export function* fetchUnsplashStandbyImages() {
    try {
        const images = yield call(Api.unsplash.getRandomPhoto, 4)
        yield put<IAction>({ type: BoardActionTypes.SET_STANDBY_BG_IMAGES, payload: { images } })
    } catch (e) {
        console.error(e)
    }
}

export function* createBoard(action: IAction) {
    try {
        const board: IBoardBase = action.payload.board
        const id: string = yield call(Api.board.createBoard, board)
        yield put<IAction>({ type: BoardActionTypes.ASYNC_FETCH_BOARD_LIST, payload: null })
        if ((action as IAsyncAction).resolve) {
            (action as IAsyncAction).resolve(id)
        }
    } catch (e) {
        if ((action as IAsyncAction).reject) {
            (action as IAsyncAction).reject(e)
        }
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

export function* moveInFragmentColumns (action: IAction) {
    try {
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
                yield put<IAction>({ type: BoardActionTypes.SET_FRAGMENT_COLUMNS, payload: {fragmentColumns}})
            }
            // save in lowdb
            const columns = lowdb.get('fragment_columns', []).value()
            if (from < columns.length && to < columns.length) {
                columns.splice(to, 0, columns.splice(from, 1)[0])
                lowdb.set('fragment_columns', columns).write()
            }
        }
    } catch (e) {
        console.error(e)
    }
}

export function* pushInFragmentColumns (action: IAction) {
    try {
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
            yield put<IAction>({ payload: {
                fragmentColumns: fragmentColumns.toArray().concat([fragmentColumn]),
            }, type: BoardActionTypes.SET_FRAGMENT_COLUMNS })

            // save in lowdb
            const columns = lowdb.get('fragment_columns', []).value()
            if (!columns.find((el: any) => {
                return el.title === title
            })) {
                columns.push(fragmentColumn)
                lowdb.set('fragment_columns', columns).write()
            }
        }
    } catch (e) {
        console.error(e)
    }
}

export function* fetchFragmentColumns() {
    try {
        const boardStore = yield select(getBoard)
        const lowdb: LowDBSyncWrapper<any> | null = boardStore.get('lowdb')
        const board: IBoard | null = boardStore.get('current')
        if (board && lowdb) {
            const localFragmentColumns: IFragmentColumn[] = lowdb.get('fragment_columns', []).value()
            const fragmentColumns: IFragmentColumn[] = yield call(Api.board.parseFragmentColumns, board, localFragmentColumns)
            yield put<IAction>({ type: BoardActionTypes.SET_FRAGMENT_COLUMNS, payload: { fragmentColumns } })
            lowdb.set('fragment_columns', fragmentColumns).write()
        }
    } catch (e) {
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
            yield all([ put<IAction>({ type: BoardActionTypes.SET_CURRENT_BOARD, payload: { board: newBoard } }),
                put<IAction>({ type: BoardActionTypes.SET_BOARD_LOWDB, payload: { lowdb } }) ])
            yield put<IAction>({ type: BoardActionTypes.ASYNC_FETCH_FRAGMENT_COLUMNS, payload: null })
        } else {
            yield all([ put<IAction>({ type: BoardActionTypes.SET_CURRENT_BOARD, payload: { board: null } }),
                put<IAction>({ type: BoardActionTypes.SET_BOARD_LOWDB, payload: { lowdb: null } }) ])
        }

    } catch (e) {
        console.error(e)
    }
}

export function* watchCreateBoard() {
    yield takeLatest(BoardActionTypes.ASYNC_CREATE_BOARD, createBoard)
}

export function* watchFetchUnsplashStandbyImages() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_STANDBY_BG_IMAGES, fetchUnsplashStandbyImages)
}

export function* watchFetchBoardList() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_BOARD_LIST, fetchBoardList)
}

export function* watchFetchFragmentColumns() {
    yield takeLatest(BoardActionTypes.ASYNC_FETCH_FRAGMENT_COLUMNS, fetchFragmentColumns)
}

export function* watchInitCurrentBoard() {
    yield takeLatest(BoardActionTypes.ASYNC_INIT_CURRENT_BOARD, initCurrentBoard)
}

export function* watchMoveInFragmentColumns() {
    yield takeLatest(BoardActionTypes.ASYNC_MOVE_IN_FRAGMENT_COLUMNS, moveInFragmentColumns)
}

export function* watchPushInFragmentColumns() {
    yield takeLatest(BoardActionTypes.ASYNC_PUSH_IN_FRAGMENT_COLUMNS, pushInFragmentColumns)
}
