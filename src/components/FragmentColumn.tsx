import { Icon } from 'antd'
import React, { Component } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import IFragment from '../schemas/IFragment'
import CreateFragmentFrom from './CreateFragmentFrom'
import FragmentCard from './FragmentCard'

import '../styles/FragmentColumn.less'

interface IFragmentColumnProps {
    index: number
    boardId: string
    title: string
    fragments: IFragment[]
    draggingOverColumnDroppableId: string
    fragmentDroppablePlacehodlerStyle: React.CSSProperties
    asyncCreateFragment: (columnTitle: string, fragmentTitle: string) => Promise<boolean>
}

class FragmentColumn extends Component<IFragmentColumnProps> {
    public componentDidUpdate() {
        console.log(11)
    }
    public shouldComponentUpdate(nextProps: IFragmentColumnProps) {
        const props = this.props
        if (props.index !== nextProps.index || props.boardId !== nextProps.boardId ||
            props.title !== nextProps.title || props.fragments !== nextProps.fragments) {
            return true
        }

        if (props.draggingOverColumnDroppableId === props.title ||
            nextProps.draggingOverColumnDroppableId === nextProps.title) {
            return true
        }
        return false
    }
    public handleCreateFragmentSuccess = (fragmentTitle: string) => {
        this.props.asyncCreateFragment(this.props.title, fragmentTitle + '.md')
    }
    public render() {
        return (
            <Draggable draggableId={this.props.title} index={this.props.index}>
                {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                    <div className={`fragment-column ${this.props.fragments.length ? '' : 'empty-content'}`}
                    data-title={this.props.title} ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                        {/* header */}
                        <div className="column-header" {...dragProvided.dragHandleProps}>
                            <div className="header-right">
                                <Icon type="ellipsis" />
                            </div>
                            <p className="column-title">{this.props.title}</p>
                        </div>
                        {/* content */}
                        <Droppable droppableId={this.props.title} type="QUOTE" >
                            {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
                                <div className="column-content" ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                                    {<div className="fragment-placeholder"
                                        style={dropSnapshot.isDraggingOver ? this.props.fragmentDroppablePlacehodlerStyle : undefined} />}
                                    {this.props.fragments.map((fragment, i) => (
                                        <FragmentCard key={fragment.title} fragment={fragment} index={i}
                                        boardId={this.props.boardId} columnTitle={this.props.title} />
                                    ))}
                                    {dropProvided.placeholder}
                                    {<div className="sdfsdfs" />}
                                </div>
                            )}
                        </Droppable>
                        {/* footer */}
                        <div className="column-footer">
                            <CreateFragmentFrom onSuccess={this.handleCreateFragmentSuccess} />
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentColumn
