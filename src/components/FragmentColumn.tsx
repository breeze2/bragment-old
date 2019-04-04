import { Icon } from 'antd'
import React, { PureComponent } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
// import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import CreateFragmentFrom from './CreateFragmentFrom'
import FragmentCard from './FragmentCard'
// import FragmentColumnContent from './FragmentColumnContent'

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
                        <div className="fragment-column-header" {...provided.dragHandleProps}>
                            <div className="header-right">
                                <Icon type="ellipsis" />
                            </div>
                            <p className="column-title">{this.props.title}</p>
                        </div>
                        {/* <FragmentColumnContent droppableId={this.props.draggableId} title={this.props.title} fragments={this.props.fragments} /> */}
                        <Droppable droppableId={this.props.title} type="QUOTE" >
                            {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
                                <div className="fragment-column-content" ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                                    {this.props.fragments.map((fragment, i) => (
                                        <FragmentCard key={fragment.title} title={fragment.title} index={i}
                                            draggableId={this.props.title + '///\\\\\\' + fragment.title} />
                                    ))}
                                    {dropProvided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <div className="fragment-column-footer">
                            <CreateFragmentFrom onSuccess={this.handleCreateFragmentSuccess} />
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentColumn
