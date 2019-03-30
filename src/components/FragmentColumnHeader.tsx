import { Icon } from 'antd'
import React, { Component } from 'react'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

interface IFragmentColumnHeaderProps {
    isDragging: boolean,
    title: string,
    dragHandleProps: DraggableProvidedDragHandleProps | null
}

class FragmentColumnHeader extends Component<IFragmentColumnHeaderProps> {
    public render() {
        return (
            <div className="fragment-column-header" {...this.props.dragHandleProps}>
                <div className="header-right">
                    <Icon type="ellipsis" />
                </div>
                <p className="column-title">{this.props.title}</p>

            </div>
        )
    }
}

export default FragmentColumnHeader
