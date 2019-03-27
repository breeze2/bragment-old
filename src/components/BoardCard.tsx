import { Card } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import '../styles/BoardCard.less'

interface InterfaceBoardCardProps {
    color?: string,
    image?: string,
    isCreatingCard?: boolean,
    onClick?: (param: any) => any
}

const colors = {
    'blue': '#2196f3',
    'cyan': '#00bcd4',
    'green': '#4caf50',
    'grey': '#9e9e9e',
    'orange': '#ff9800',
    'purple': '#9c27b0',
    'red': '#f44336',
    'yellow': '#fbc02d',
}

class BoardCard extends Component<InterfaceBoardCardProps> {
    public static defaultColor = colors.grey
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
            <Card className="board-card" hoverable style={{
                backgroundColor: this.props.color || BoardCard.defaultColor,
            }} onClick={this.handleClick}>
                <p className="card-title">Card content</p>
            </Card>
        )
    }
}

export default BoardCard
