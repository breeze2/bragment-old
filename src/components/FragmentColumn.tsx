import { Icon } from 'antd'
import React, { PureComponent } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import IFragment from '../schemas/IFragment'
import CreateFragmentFrom from './CreateFragmentFrom'
import FragmentCard from './FragmentCard'

import '../styles/FragmentColumn.less'

interface IFragmentColumnProps {
    index: number
    draggableId: string
    title: string
    fragments: IFragment[]
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
                {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                    <div className={`fragment-column ${this.props.fragments.length ? '' : 'empty-content'}`}
                        ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                        {/* header */}
                        <div className="column-header" {...dragProvided.dragHandleProps}>
                            <div className="header-right">
                                <Icon type="ellipsis" />
                            </div>
                            <p className="column-title">{this.props.title}</p>
                        </div>
                        {/* content */}
                        <Droppable droppableId={this.props.title} type="QUOTE" >
                            {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
                                <div className="column-content" ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                                    {this.props.fragments.map((fragment, i) => (
                                        <FragmentCard key={fragment.title} fragment={fragment} index={i}
                                            draggableId={this.props.title + '///\\\\\\' + fragment.title} />
                                    ))}
                                    {dropProvided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        {/* footer */}
                        <div className="column-footer">
                            <CreateFragmentFrom onSuccess={this.handleCreateFragmentSuccess} />
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default FragmentColumn
