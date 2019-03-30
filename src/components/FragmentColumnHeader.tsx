import React, { Component } from 'react'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

interface IFragmentColumnHeaderPropsBase {
    isDragging: boolean,
    title: string,
}

interface IFragmentColumnHeaderProps extends IFragmentColumnHeaderPropsBase, DraggableProvidedDragHandleProps {}

class FragmentColumnHeader extends Component<IFragmentColumnHeaderPropsBase | IFragmentColumnHeaderProps> {
    public render() {
        return (
            <div className="fragment-column-header">
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}

export default FragmentColumnHeader
