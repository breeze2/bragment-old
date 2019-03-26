import { all, fork } from 'redux-saga/effects'
import { watchSelectMenuKey } from './home'

export default function* () {
    yield all([
        fork(watchSelectMenuKey),
    ])
}
