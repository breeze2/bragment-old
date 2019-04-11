import IFragment from './IFragment'

export default interface IFragmentInfo extends IFragment {
    boardId: string
    boardPath: string
    boardTitle: string
    columnTitle: string
    content: string
}
