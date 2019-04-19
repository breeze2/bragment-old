import { all, fork } from 'redux-saga/effects'
import {watchCreateBoard, watchCreateFragmentColumn, watchFetchBoardList, watchFetchFragmentColumns, watchFetchUnsplashStandbyImages,
    watchInitCurrentBoard, watchMoveFragmentColumn } from './board'
import { watchCreateFragment, watchFetchFragmentInfo, watchMoveFragment, watchRenameFragment,
    watchSaveFragmentContent } from './fragment'
import { watchSelectMenuKey } from './home'

export default function* () {
    yield all([
        fork(watchCreateBoard),
        fork(watchFetchBoardList),
        fork(watchFetchFragmentColumns),
        fork(watchFetchUnsplashStandbyImages),
        fork(watchInitCurrentBoard),
        fork(watchCreateFragmentColumn),
        fork(watchMoveFragmentColumn),

        fork(watchCreateFragment),
        fork(watchFetchFragmentInfo),
        fork(watchMoveFragment),
        fork(watchSaveFragmentContent),
        fork(watchRenameFragment),

        fork(watchSelectMenuKey),
    ])
}
