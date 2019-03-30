import { List } from 'immutable'
import React, { Component } from 'react'
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd'
import { RouteComponentProps } from 'react-router-dom'
import FragmentColumn from '../components/FragmentColumn'
import IBoard from '../schemas/IBoard'

import '../styles/BoardPage.less'

interface IBoardPageProps extends RouteComponentProps {
    boardList: List<IBoard>
    currentBoard: IBoard | null
    setCurrentBoard: (board: IBoard | null) => any
}

class BoardPage extends Component<IBoardPageProps> {
    public constructor(props: IBoardPageProps) {
        super(props)
    }
    public componentDidMount() {
        this._initCurrentBoard(this.props)
    }
    public componentWillReceiveProps(props: IBoardPageProps) {
        this._initCurrentBoard(props)
    }
    public handleDragEnd = (result: DropResult) => {
        console.log(result)
    }
    public render() {
        return (
            <div className="board-page">
                <DragDropContext onDragEnd={this.handleDragEnd}>
                    <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                        {(provided: DroppableProvided) => (
                            <div className="board-container" ref={provided.innerRef} {...provided.droppableProps} >
                                {[
                                    { title: 'sdfsf', fragmetns: [{ title: 'sdfsdfffff' }] },
                                    { title: 'sdfsf2', fragmetns: [{ title: 'sdfsdfffff2' }] },
                                    { title: 'sdfsf3', fragmetns: [{ title: 'sdfsdfffff3' }] },
                                ].map((fragmentColumn, i) => (
                                    <FragmentColumn key={fragmentColumn.title} fragmetns={fragmentColumn.fragmetns} title={fragmentColumn.title} index={i} />
                                ))}
                                { provided.placeholder }
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
    private _initCurrentBoard(props: IBoardPageProps) {
        console.log(111)
        const boardList = props.boardList
        const params: any = props.match.params
        console.log(params)
        if (params.id) {
            if (!this.props.currentBoard || params.id !== this.props.currentBoard._id) {
                const board = boardList.find(el => el._id === params.id) || null
                this.props.setCurrentBoard(board)
            }
        }
    }
}

export default BoardPage
