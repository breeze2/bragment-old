import React, { Component } from 'react'
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd'
// import FragmentColumnHeader from './FragmentColumnHeader'

interface IFragmentColumnProps {
    index: number
    title: string
}

class FragmentColumn extends Component<IFragmentColumnProps> {
    public render() {
        return (
            <Draggable draggableId={this.props.title} index={this.props.index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div className="fragment-column" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {/* <FragmentColumnHeader title={this.props.title} isDragging={snapshot.isDragging} {...provided.dragHandleProps} /> */}
                        <h2>sdfsdfs</h2>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentColumn
