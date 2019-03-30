import React, { Component } from 'react'
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { RouteComponentProps } from 'react-router-dom'

import FragmentColumn from '../components/FragmentColumn'

class BoardPage extends Component<RouteComponentProps> {
    public constructor(props: RouteComponentProps) {
        super(props)
    }
    public componentDidMount() {
        // console.log(this.props)
    }
    public render() {
        return (
            <DragDropContext onDragEnd={()=>{}}>
                <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                    {(provided: DroppableProvided) => (
                        <div className="board-container" ref={provided.innerRef} {...provided.droppableProps} >
                            <FragmentColumn title='sdfs' index={1} />
                            <FragmentColumn title='sdfssdsfs' index={2} />
                            { provided.placeholder }
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default BoardPage
