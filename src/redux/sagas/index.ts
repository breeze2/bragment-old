import { all, fork } from 'redux-saga/effects'
import { watchFetchBoardList, watchFetchUnsplashStandbyImages } from './board'
import { watchSelectMenuKey } from './home'

export default function* () {
    yield all([
        fork(watchFetchBoardList),
        fork(watchFetchUnsplashStandbyImages),
        fork(watchSelectMenuKey),
    ])
}
