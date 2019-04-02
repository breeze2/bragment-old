import React, { PureComponent } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import FragmentColumnContent from './FragmentColumnContent'
import FragmentColumnFooter from './FragmentColumnFooter'
import FragmentColumnHeader from './FragmentColumnHeader'

import '../styles/FragmentColumn.less'

interface IFragmentColumnProps {
    index: number
    draggableId: string
    title: string
    fragments: any[]
}

class FragmentColumn extends PureComponent<IFragmentColumnProps> {
    public componentDidUpdate() {
        console.log(11)
    }
    public render() {
        return (
            <Draggable draggableId={this.props.draggableId} index={this.props.index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div className={`fragment-column ${this.props.fragments.length ? '' : 'empty-content'}`}
                        ref={provided.innerRef} {...provided.draggableProps}>
                        <FragmentColumnHeader
                            title={this.props.title}
                            isDragging={snapshot.isDragging}
                            dragHandleProps={provided.dragHandleProps} />
                        <FragmentColumnContent droppableId={this.props.draggableId} title={this.props.title} fragments={this.props.fragments} />
                        <FragmentColumnFooter />
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentColumn
