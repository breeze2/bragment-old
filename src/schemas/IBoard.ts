
export interface IBoardBase {
    path: string
    title: string
    color: string
    image: string
}

export default interface IBoard extends IBoardBase {
    _id: string
    _rev: string
    created_at: number
    updated_at: number
}