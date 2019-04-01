import { List } from 'immutable'
import React, { Component } from 'react'
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd'
import { RouteComponentProps } from 'react-router-dom'

import Api, { LowDBSyncWrapper } from '../api'
import CreateFragmentColumnForm from '../components/CreateFragmentColumnForm'
import FragmentColumn from '../components/FragmentColumn'
import IBoard from '../schemas/IBoard'
import IFragmentColumn from '../schemas/IFragmentColumn'
import Utils from '../utils'

import '../styles/BoardPage.less'

interface IBoardPageProps extends RouteComponentProps {
    boardLowdb: LowDBSyncWrapper<any> | null
    boardList: List<IBoard>
    currentBoard: IBoard | null
    fragmentColumns: List<IFragmentColumn>
    asyncInitCurretnBoard: (board: IBoard | null) => any
    asyncFetchFragmentColumns: () => any
    asyncMoveInFragmentColumns: (from: number, to: number) => any
    asyncPushInFragmentColumns: (fragmentColumn: IFragmentColumn) => any
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
        this._initCurrentBoard(this.props)
    }
    public componentWillReceiveProps(props: IBoardPageProps) {
        this._initCurrentBoard(props)
    }
    public handleDragEnd = (result: DropResult) => {
        console.log(result)
        if (result.type === 'COLUMN' && result.destination) {
            this.props.asyncMoveInFragmentColumns(result.source.index, result.destination.index)
        }
    }
    public handleCreateFragmentColumnSuccess = (title: string) => {
        const fragmentColumn: IFragmentColumn = {
            fragments: [],
            title,
        }
        this.props.asyncPushInFragmentColumns(fragmentColumn)
    }
    public render() {
        return (
            <div className="board-page">
                <div className="board-background" style={{
                    backgroundColor: this.props.currentBoard ? this.props.currentBoard.color : undefined,
                    backgroundImage: this.props.currentBoard ? `url(${Utils.formatFileUrl(this.props.currentBoard.path,
                        this.props.currentBoard.image)})` : undefined,
                }} />
                <div className="board-foreground">
                    <DragDropContext onDragEnd={this.handleDragEnd}>
                        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                            {(provided: DroppableProvided) => (
                                <div className="board-container" ref={provided.innerRef} {...provided.droppableProps} >
                                    {this.props.fragmentColumns.map((fragmentColumn, i) => (
                                        <FragmentColumn key={fragmentColumn.title} fragments={fragmentColumn.fragments}
                                            title={fragmentColumn.title} index={i} />
                                    ))}
                                    { provided.placeholder }
                                    <div className="board-action">
                                        <CreateFragmentColumnForm onSuccess={this.handleCreateFragmentColumnSuccess} />
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
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
