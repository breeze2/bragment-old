import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

class Board extends Component<RouteComponentProps> {
    public constructor(props: RouteComponentProps) {
        super(props)
    }
    public componentDidMount() {
        // console.log(this.props)
    }
    public render() {
        return (
            <div>nih</div>
        )
    }
}

export default Board
