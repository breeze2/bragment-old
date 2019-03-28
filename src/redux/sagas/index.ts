import { all, fork } from 'redux-saga/effects'
import { watchFetchUnsplashStandbyImages } from './board'
import { watchSelectMenuKey } from './home'

export default function* () {
    yield all([
        fork(watchFetchUnsplashStandbyImages),
        fork(watchSelectMenuKey),
    ])
}
