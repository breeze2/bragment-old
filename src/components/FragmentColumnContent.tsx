import React, { Component } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable,  DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import FragmentCard from './FragmentCard'
// interface IFragmentListContentPropsBase {
//     fragmetns: any[],
// }

interface IFragmentListContentProps {
    fragmetns: any[],
}

class FragmentListContent extends Component<IFragmentListContentProps> {
    public render() {
        return (
            <Droppable droppableId={'sdfsf'}>
                {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
                    <div className="fragment-list-content">
                        <FragmentCard />
                    </div>
                )}
            </Droppable>
        )
    }
}

export default FragmentListContent
