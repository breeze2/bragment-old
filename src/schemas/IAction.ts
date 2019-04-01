export default interface IAction {
    payload: any,
    type: string,
}

export interface IAsyncAction extends IAction {
    resolve: (value?: any | PromiseLike<any> | undefined) => void,
    reject: (reason?: any) => void,
}
