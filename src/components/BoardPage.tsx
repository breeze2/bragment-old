import { List } from 'immutable'
import React, { PureComponent } from 'react'
import { DragDropContext, DraggableLocation, DragStart, DragUpdate,
    Droppable, DroppableProvided, DroppableStateSnapshot, DropResult, ResponderProvided } from 'react-beautiful-dnd'
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

interface IBoardPageState {
    draggingOverColumnDroppableId: string | undefined
    columnDroppablePlacehodlerStyle: React.CSSProperties | undefined
    fragmentDroppablePlacehodlerStyle: React.CSSProperties | undefined
}

class BoardPage extends PureComponent<IBoardPageProps> {
    public state: IBoardPageState
    public initColumnDroppablePlacehodlerStyle: (from: DraggableLocation, to: DraggableLocation) => void
    public initFragmentDroppablePlacehodlerStyle: (from: DraggableLocation, to: DraggableLocation) => void
    public constructor(props: IBoardPageProps) {
        super(props)
        this.state = {
            columnDroppablePlacehodlerStyle: undefined,
            draggingOverColumnDroppableId: undefined,
            fragmentDroppablePlacehodlerStyle: undefined,
        }
        this.initColumnDroppablePlacehodlerStyle = Utils.debounce(this._initColumnDroppablePlacehodlerStyle, 100)
        this.initFragmentDroppablePlacehodlerStyle = Utils.debounce(this._initFragmentDroppablePlacehodlerStyle, 100)
    }
    public componentDidUpdate() {
        // console.log(11)
    }
    public componentDidMount() {
        this._initCurrentBoard(this.props)
    }
    public componentWillReceiveProps(props: IBoardPageProps) {
        this._initCurrentBoard(props)
    }
    public handleDragUpdate = (initial: DragUpdate, provided: ResponderProvided) => {
        if (initial.destination) {
            if (initial.type === 'COLUMN') {
                this.initColumnDroppablePlacehodlerStyle(initial.source, initial.destination)
            } else {
                this.initFragmentDroppablePlacehodlerStyle(initial.source, initial.destination)
            }
        }
    }
    public handleDragStart = (initial: DragStart, provided: ResponderProvided) => {
        if (initial.type === 'COLUMN') {
            this.initColumnDroppablePlacehodlerStyle(initial.source, initial.source)
        } else {
            this.initFragmentDroppablePlacehodlerStyle(initial.source, initial.source)
        }
    }
    public handleDragEnd = (result: DropResult) => {
        // console.log(result)
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
        this.setState({
            columnDroppablePlacehodlerStyle: undefined,
            draggingOverColumnDroppableId: undefined,
            fragmentDroppablePlacehodlerStyle: undefined,
        })
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
                    <DragDropContext onDragEnd={this.handleDragEnd} onDragUpdate={this.handleDragUpdate} onDragStart={this.handleDragStart}>
                        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                <div className="board-container" ref={provided.innerRef} {...provided.droppableProps} >
                                    {<div className="column-placeholder" style={this.state.columnDroppablePlacehodlerStyle} />}
                                    {this.props.fragmentColumns.map((fragmentColumn, i) => (
                                        <FragmentColumn key={fragmentColumn.title} index={i}
                                            fragments={fragmentColumn.fragments} title={fragmentColumn.title} draggableId={fragmentColumn.title}
                                            fragmentDroppablePlacehodlerStyle={this.state.fragmentDroppablePlacehodlerStyle}
                                            draggingOverColumnDroppableId={this.state.draggingOverColumnDroppableId} />
                                    ))}
                                    {provided.placeholder}
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
    private _initFragmentDroppablePlacehodlerStyle(from: DraggableLocation, to: DraggableLocation) {
        const fromTitle = from.droppableId
        const toTitle = to.droppableId
        const fromIndex = from.index
        const toIndex = to.index
        const container = document.querySelector('.board-container')
        if (container) {
            const fromColumn = container.querySelector(`.fragment-column[data-title=${fromTitle}]`) as HTMLDivElement
            const toColumn = container.querySelector(`.fragment-column[data-title=${toTitle}]`) as HTMLDivElement
            if (fromColumn && toColumn) {
                const fromCards = fromColumn.querySelectorAll('.fragment-card') || []
                const toCards = toColumn.querySelectorAll('.fragment-card') || []
                const fromCard = fromCards[fromIndex] as HTMLDivElement
                if (fromCard) {
                    const style: React.CSSProperties = {
                        display: 'block',
                        height: fromCard.offsetHeight + 'px',
                        position: 'absolute',
                        top: this._getCardTop(Array.prototype.slice.call(toCards, 0, toIndex)),
                    }
                    this.setState({
                        draggingOverColumnDroppableId: toTitle,
                        fragmentDroppablePlacehodlerStyle: style,
                    })
                } else {
                    this.setState({
                        draggingOverColumnDroppableId: undefined,
                        fragmentDroppablePlacehodlerStyle: undefined,
                    })
                }
            }
        }
    }
    private _initColumnDroppablePlacehodlerStyle(from: DraggableLocation, to: DraggableLocation) {
        const fromIndex = from.index
        const toIndex = to.index
        const container = document.querySelector('.board-container')
        if (container) {
            const columns = container.querySelectorAll('.fragment-column')
            const fromColumn = columns[fromIndex] as HTMLDivElement
            const toColumn = columns[toIndex] as HTMLDivElement
            if (fromColumn && toColumn) {
                const style: React.CSSProperties = {
                    display: 'block',
                    height: this._getColumnHeight(fromColumn),
                    left: 266 * toIndex + 16 * toIndex + 16 + 'px',
                    position: 'absolute',
                    top: '16px',
                }
                this.setState({
                    columnDroppablePlacehodlerStyle: style,
                })
            } else {
                this.setState({
                    columnDroppablePlacehodlerStyle: undefined,
                })
            }
        }
    }
    private _getColumnHeight(column: HTMLDivElement) {
        const header = column.querySelector('.column-header') as HTMLDivElement
        const footer = column.querySelector('.column-footer') as HTMLDivElement
        const content = column.querySelector('.column-content') as HTMLDivElement
        if (header && footer && content) {
            return header.offsetHeight +
                footer.offsetHeight +
                content.offsetHeight + 'px'
        } else {
            return column.offsetHeight || '0px'
        }
    }
    private _getCardTop(cards: HTMLDivElement[]) {
        let top = 0
        cards.forEach(card => {
            top += card.offsetHeight + 4
        })
        return top + 8
    }
}

export default BoardPage
