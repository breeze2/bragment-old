import { all, fork } from 'redux-saga/effects'
import { watchFetchBoardList, watchFetchFragmentColumns, watchFetchUnsplashStandbyImages,
    watchInitCurrentBoard, watchPushInFragmentColumns } from './board'
import { watchSelectMenuKey } from './home'

export default function* () {
    yield all([
        fork(watchFetchBoardList),
        fork(watchFetchFragmentColumns),
        fork(watchFetchUnsplashStandbyImages),
        fork(watchInitCurrentBoard),
        fork(watchPushInFragmentColumns),
        fork(watchSelectMenuKey),
    ])
}
