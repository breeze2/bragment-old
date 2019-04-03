import IAction from '../../schemas/IAction'

export const FragmentActionTypes = {
    ASYNC_CREATE_FRAGMENT: 'ASYNC_CREATE_FRAGMENT',
}

export const asyncCreateFragmentAction = (key: string): IAction => ({
    payload: { key },
    type: FragmentActionTypes.ASYNC_CREATE_FRAGMENT,
})
