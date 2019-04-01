import { List } from 'immutable'
import React, { Component } from 'react'
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd'
import { RouteComponentProps } from 'react-router-dom'

import Api, { LowDBSyncWrapper } from '../api'
import CreateFragmentColumnForm from '../components/CreateFragmentColumnForm'
import FragmentColumn from '../components/FragmentColumn'
import IBoard from '../schemas/IBoard'

import '../styles/BoardPage.less'

interface IBoardPageProps extends RouteComponentProps {
    boardLowdb: LowDBSyncWrapper<any> | null
    boardList: List<IBoard>
    currentBoard: IBoard | null
    asyncInitCurretnBoard: (board: IBoard | null) => any
}

interface IBoardPageState {
    columns: string[],

}

class BoardPage extends Component<IBoardPageProps> {
    public state: IBoardPageState
    public constructor(props: IBoardPageProps) {
        super(props)
        this.state = {
            columns: [],
        }
    }
    public componentDidMount() {
        console.log(1)
        this._initCurrentBoard(this.props)
    }
    public componentWillReceiveProps(props: IBoardPageProps) {
        console.log(2)
        this._initCurrentBoard(props)
    }
    public handleDragEnd = (result: DropResult) => {
        console.log(result)
    }
    public handleCreateColumnSuccess = (title: string) => {
        // Api.lowdb.pushBoardColumn(this._lowdb, title)
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
                                    <FragmentColumn key={fragmentColumn.title} fragmetns={fragmentColumn.fragmetns}
                                        title={fragmentColumn.title} index={i} />
                                ))}
                                { provided.placeholder }
                                <div className="board-action">
                                    <CreateFragmentColumnForm boardPath={this.props.currentBoard ? this.props.currentBoard.path : ''}
                                        onSuccess={this.handleCreateColumnSuccess} />
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
    private _initCurrentBoard(props: IBoardPageProps) {
        const boardList = props.boardList
        const params: any = props.match.params
        if (params.id) {
            if (!props.currentBoard || props.currentBoard._id !== params.id) {
                const board = boardList.find(el => el._id === params.id) || null
                this.props.asyncInitCurretnBoard(board)
            }
        }
    }
}

export default BoardPage
