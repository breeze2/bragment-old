import React, { PureComponent } from 'react'
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import FragmentCard from './FragmentCard'

interface IFragmentColumnContentProps {
    droppableId: string,
    title: string,
    fragments: any[],
}

class FragmentColumnContent extends PureComponent<IFragmentColumnContentProps> {
    public static separator = '///\\\\\\'
    public render() {
        return (
            <Droppable droppableId={this.props.droppableId} type="QUOTE" >
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div className="fragment-column-content" ref={provided.innerRef} {...provided.droppableProps}>
                        {this.props.fragments.map((fragment, i) => (
                            <FragmentCard key={fragment.title} fragment={fragment} index={i}
                                draggableId={this.props.droppableId + FragmentColumnContent.separator + fragment.title} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default FragmentColumnContent
