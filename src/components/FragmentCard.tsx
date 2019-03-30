import React, { Component } from 'react'
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd'

class FragmentCard extends Component {
    public render() {
        return (
            <Draggable draggableId={'sdfssd'} index={1}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div className="fragment-card"
                        ref={provided.innerRef}
                        style={{ backgroundColor: snapshot.draggingOver ? 'blue' : 'grey' }}
                        {...provided.draggableProps}
                    >
                        sdfsfsfsfsfs
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentCard
