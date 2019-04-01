import React, { Component } from 'react'
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import FragmentCard from './FragmentCard'

import Utils from '../utils'

interface IFragmentColumnContentProps {
    droppableId: string,
    title: string,
    fragments: any[],
}

class FragmentColumnContent extends Component<IFragmentColumnContentProps> {
    public render() {
        return (
            <Droppable droppableId={this.props.droppableId} type="QUOTE" >
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div className="fragment-column-content" ref={provided.innerRef} {...provided.droppableProps}>
                        {this.props.fragments.map((fragment, i) => (
                            <FragmentCard key={fragment.title} title={fragment.title} index={i}
                                draggableId={Utils.joinPath(this.props.droppableId, fragment.title)} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default FragmentColumnContent
