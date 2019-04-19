import { Card } from 'antd'
import React, { Component } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import IFragment from '../schemas/IFragment'
import Utils from '../utils'

interface IFragmentCardProps {
    boardId: string
    columnTitle: string
    fragment: IFragment
    index: number
}

class FragmentCard extends Component<IFragmentCardProps> {
    public render() {
        return (
            <Draggable draggableId={this.props.columnTitle + '///\\\\\\' + this.props.fragment.title} index={this.props.index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div className={`fragment-card ${snapshot.isDragging ? 'is-dragging' : ''}`} ref={provided.innerRef}
                        {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Link to={`/fragment/${this.props.boardId}/${this.props.columnTitle}/${this.props.fragment.title}`} ><Card hoverable>
                            <p className="card-title">{Utils.fixedFragmentTitle(this.props.fragment.title)}</p>
                        </Card></Link>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentCard
