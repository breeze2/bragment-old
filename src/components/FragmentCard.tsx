import { Card } from 'antd'
import React, { Component } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import IFragment from '../schemas/IFragment'

interface IFragmentCardProps {
    draggableId: string
    fragment: IFragment
    index: number
}

class FragmentCard extends Component<IFragmentCardProps> {
    public render() {
        return (
            <Draggable draggableId={this.props.draggableId} index={this.props.index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div className={`fragment-card ${snapshot.isDragging ? 'is-dragging' : ''}`} ref={provided.innerRef}
                        {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card hoverable>
                            <p className="card-title">{this.props.fragment.title}</p>
                        </Card>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentCard
