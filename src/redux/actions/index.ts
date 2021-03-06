import { Dispatch } from 'redux'
import IAction, { IAsyncAction } from '../../schemas/IAction'
export function asyncActionDispatcher<Type = {}>(dispatch: Dispatch<any>, action: IAction) {
    return new Promise<Type>((resolve, reject) => {
        const asyncAction: IAsyncAction = {
            ...action,
            reject,
            resolve,
        }
        dispatch(asyncAction)
    })
}

export * from './app'
export * from './board'
export * from './fragment'
export * from './home'
