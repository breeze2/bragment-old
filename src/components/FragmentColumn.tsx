import React, { Component } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd'
import FragmentColumnContent from './FragmentColumnContent'
import FragmentColumnFooter from './FragmentColumnFooter'
import FragmentColumnHeader from './FragmentColumnHeader'

import '../styles/FragmentColumn.less'

interface IFragmentColumnProps {
    index: number
    title: string
    fragmetns: any[]
}

class FragmentColumn extends Component<IFragmentColumnProps> {
    public render() {
        return (
            <Draggable draggableId={this.props.title} index={this.props.index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div className="fragment-column" ref={provided.innerRef} {...provided.draggableProps}>
                        <FragmentColumnHeader
                            title={this.props.title}
                            isDragging={snapshot.isDragging}
                            dragHandleProps={provided.dragHandleProps} />
                        <FragmentColumnContent title={this.props.title} fragmetns={this.props.fragmetns} />
                        <FragmentColumnFooter />
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentColumn
