import IAction from '../../schemas/IAction'

export const FragmentActionTypes = {
    ASYNC_CREATE_FRAGMENT: 'ASYNC_CREATE_FRAGMENT',
}

export const asyncCreateFragmentAction = (columnTitle: string, fragmentTitle: string): IAction => ({
    payload: { columnTitle, fragmentTitle },
    type: FragmentActionTypes.ASYNC_CREATE_FRAGMENT,
})
