import React, { Component } from 'react'
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import FragmentCard from './FragmentCard'

interface IFragmentColumnContentProps {
    title: string,
    fragmetns: any[],
}

class FragmentColumnContent extends Component<IFragmentColumnContentProps> {
    public render() {
        return (
            <Droppable droppableId={this.props.title} type="QUOTE" >
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div className="fragment-column-content" ref={provided.innerRef} {...provided.droppableProps}>
                        {this.props.fragmetns.map((fragment, i) => (
                            <FragmentCard key={fragment.title} title={fragment.title} index={i} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default FragmentColumnContent
