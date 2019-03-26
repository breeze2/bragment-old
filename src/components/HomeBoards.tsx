import { Col, Icon, Row } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import BoardCard from './BoardCard'

import '../styles/HomeBoards.less'

class HomeBoards extends Component {
    public render() {
        return (
            <div className="home-boards">
                <div className="recently-boards">
                    <p className="boards-label">
                        <Icon type="clock-circle" />
                        <FormattedMessage id="recently" />
                    </p>
                    <div className="boards-grid">
                        <Row gutter={12}>
                            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                                <Link to={`/board/1`}><BoardCard /></Link>
                            </Col>
                            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                                <BoardCard />
                            </Col>
                            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                                <BoardCard />
                            </Col>
                            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                                <BoardCard />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="personal-boards">
                    <p className="boards-label">
                        <Icon type="user" />
                        <FormattedMessage id="personal" />
                    </p>
                    <div className="boards-grid">
                        <Row gutter={12}>
                            <Col className="gutter-row" lg={6} md={8} sm={12} xs={24}>
                                <BoardCard isCreatingEntry />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeBoards
