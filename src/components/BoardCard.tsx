import { Card } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import Api from '../api'

import '../styles/BoardCard.less'

interface IBoardCardProps {
    color?: string,
    image?: string,
    isCreatingCard?: boolean,
    onClick?: (param: any) => any
}

class BoardCard extends Component<IBoardCardProps> {
    public defaultColor: string = Api.board.defaultColor
    public constructor(props: any) {
        super(props)
    }
    public handleClick = (e: any) => {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick({})
        }
    }
    public render() {
        if (this.props.isCreatingCard) {
            return (
                <Card className="board-card board-creating" hoverable onClick={this.handleClick}>
                    <p className="card-title"><FormattedMessage id="createNewBoard" /></p>
                </Card>
            )
        }
        return (
            <Card className={`board-card ${this.props.color ? this.props.color : this.defaultColor}-background-color`}
            hoverable onClick={this.handleClick}>
                <p className="card-title">Card content</p>
            </Card>
        )
    }
}

export default BoardCard
