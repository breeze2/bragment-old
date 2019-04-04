import { List } from 'immutable'
import React, { PureComponent } from 'react'
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd'
import { RouteComponentProps } from 'react-router-dom'

import { LowDBSyncWrapper } from '../api'
import FragmentColumn from '../containers/FragmentColumn'
import IBoard from '../schemas/IBoard'
import IFragmentColumn from '../schemas/IFragmentColumn'
import Utils from '../utils'
import CreateFragmentColumnForm from './CreateFragmentColumnForm'

import '../styles/BoardPage.less'

interface IBoardPageProps extends RouteComponentProps {
    bgImageTimestamp: number
    boardLowdb: LowDBSyncWrapper<any> | null
    boardList: List<IBoard>
    currentBoard: IBoard | null
    fragmentColumns: List<IFragmentColumn>
    asyncInitCurretnBoard: (board: IBoard | null) => any
    asyncFetchFragmentColumns: () => any
    asyncMoveFragment: (fromColumnTitle: string, fromColumnIndex: number, toColumnTitle: string, toColumnIndex: number) => Promise<boolean>
    asyncMoveInFragmentColumns: (from: number, to: number) => any
    asyncPushInFragmentColumns: (fragmentColumn: IFragmentColumn) => any
}

class BoardPage extends PureComponent<IBoardPageProps> {
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
        if (result.type === 'COLUMN' && result.destination) {
            this.props.asyncMoveInFragmentColumns(result.source.index, result.destination.index)
        } else if (result.type === 'QUOTE' && result.destination) {
            const fromColumnTitle = result.source.droppableId
            const fromColumnIndex = result.source.index
            const toColumnTitle = result.destination.droppableId
            const toColumnIndex = result.destination.index
            if (toColumnIndex !== fromColumnIndex || toColumnTitle !== fromColumnTitle) {
                this.props.asyncMoveFragment(fromColumnTitle, fromColumnIndex,
                    toColumnTitle, toColumnIndex)
            }
        }
    }
    public handleCreateFragmentColumnSuccess = (title: string) => {
        const fragmentColumn: IFragmentColumn = {
            fragments: [],
            title,
        }
        setTimeout(() => {
            this.props.asyncPushInFragmentColumns(fragmentColumn)
        }, 100)
    }
    public render() {
        return (
            <div className="board-page">
                <div className="board-background" style={{
                    backgroundColor: this.props.currentBoard ? this.props.currentBoard.color : undefined,
                    backgroundImage: this.props.currentBoard ? `url(${Utils.formatFileUrl(this.props.currentBoard.path,
                        this.props.currentBoard.image)}?t=${this.props.bgImageTimestamp})` : undefined,
                }} />
                <div className="board-foreground">
                    <DragDropContext onDragEnd={this.handleDragEnd}>
                        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                            {(provided: DroppableProvided) => (
                                <div className="board-container" ref={provided.innerRef} {...provided.droppableProps} >
                                    {this.props.fragmentColumns.map((fragmentColumn, i) => (
                                        <FragmentColumn key={fragmentColumn.title}
                                            draggableId={fragmentColumn.title}
                                            fragments={fragmentColumn.fragments} title={fragmentColumn.title} index={i} />
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
