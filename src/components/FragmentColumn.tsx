import React, { PureComponent } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import CreateFragmentFrom from './CreateFragmentFrom'
import FragmentColumnContent from './FragmentColumnContent'
import FragmentColumnHeader from './FragmentColumnHeader'

import '../styles/FragmentColumn.less'

interface IFragmentColumnProps {
    index: number
    draggableId: string
    title: string
    fragments: any[]
    asyncCreateFragment: (columnTitle: string, fragmentTitle: string) => Promise<boolean>
}

class FragmentColumn extends PureComponent<IFragmentColumnProps> {
    public componentDidUpdate() {
        console.log(11)
    }
    public handleCreateFragmentSuccess = (fragmentTitle: string) => {
        this.props.asyncCreateFragment(this.props.title, fragmentTitle + '.md')
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
                        <div className="fragment-column-footer" >
                            <CreateFragmentFrom onSuccess={this.handleCreateFragmentSuccess} />
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentColumn
