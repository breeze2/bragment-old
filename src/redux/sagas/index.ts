import { all, fork } from 'redux-saga/effects'
import { watchCreateBoard, watchFetchBoardList, watchFetchFragmentColumns, watchFetchUnsplashStandbyImages,
    watchInitCurrentBoard, watchMoveInFragmentColumns, watchPushInFragmentColumns } from './board'
import { watchCreateFragment } from './fragment'
import { watchSelectMenuKey } from './home'

export default function* () {
    yield all([
        fork(watchCreateBoard),
        fork(watchFetchBoardList),
        fork(watchFetchFragmentColumns),
        fork(watchFetchUnsplashStandbyImages),
        fork(watchInitCurrentBoard),
        fork(watchMoveInFragmentColumns),
        fork(watchPushInFragmentColumns),
        fork(watchCreateFragment),
        fork(watchSelectMenuKey),
    ])
}
