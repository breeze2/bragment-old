import { Card } from 'antd'
import React, { Component } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'

interface IFragmentCard {
    title: string
    index: number
}

class FragmentCard extends Component<IFragmentCard> {
    public render() {
        return (
            <Draggable draggableId={this.props.title} index={this.props.index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div className="fragment-card" ref={provided.innerRef}
                        style={{ backgroundColor: snapshot.draggingOver ? 'blue' : 'grey' }}
                        {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card hoverable>
                            <p className="card-title">{this.props.title}</p>
                        </Card>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentCard
