import IAction, { IAsyncAction } from '../../schemas/IAction'

export function* nerverThrowWrapper(action: IAction, method: (a: IAction) => IterableIterator<any>) {
    try {
        yield method(action)
    } catch (e) {
        console.error(e)
    }
}

export function* handlePromiseWrapper(action: IAsyncAction, method: (a: IAction) => IterableIterator<any>) {
    try {
        const result = yield method(action)
        return action.resolve(result)
    } catch (e) {
        console.error(e)
        return action.reject(e)
    }
}
