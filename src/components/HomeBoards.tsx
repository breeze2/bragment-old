import { Col, Icon, Row } from 'antd'
import { List } from 'immutable'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import BoardCard from './BoardCard'

import IBoard from '../schemas/IBoard'
import '../styles/HomeBoards.less'

interface IHomeBoardsProps {
    personalList: List<IBoard>
    recentlyList: List<IBoard>
    asyncFetchBoardList: () => any
    setCreateBoardModalVisible: (visible: boolean) => any
}

class HomeBoards extends Component<IHomeBoardsProps> {
    public constructor(props: IHomeBoardsProps) {
        super(props)
    }
    public componentDidMount() {
        // this.props.asyncFetchBoardList()
    }
    public handleCreatingCardClick = () => {
        this.props.setCreateBoardModalVisible(true)
    }
    public render() {
        return (
            <div className="home-boards">
                {this.props.recentlyList.size > 0 && <div className="recently-boards">
                    <p className="boards-label">
                        <Icon type="clock-circle" />
                        <FormattedMessage id="recently" />
                    </p>
                    <div className="boards-grid">
                        <Row gutter={12}>
                            {this.props.recentlyList.map(board => (
                                <Col key={board._id} className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                                    <Link to={`/board/${board._id}`}>
                                        <BoardCard color={board.color} image={board.image} path={board.path} />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div> }
                <div className="personal-boards">
                    <p className="boards-label">
                        <Icon type="user" />
                        <FormattedMessage id="personal" />
                    </p>
                    <div className="boards-grid">
                        <Row gutter={12}>
                            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                                <BoardCard isCreatingCard onClick={this.handleCreatingCardClick} />
                            </Col>
                            {this.props.personalList.map(board => (
                                <Col key={board._id} className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                                    <Link to={`/board/${board._id}`}>
                                        <BoardCard color={board.color} image={board.image} path={board.path} />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeBoards
