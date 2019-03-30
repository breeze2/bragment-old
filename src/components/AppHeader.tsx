import { Icon, Layout } from 'antd'
import { List } from 'immutable'
import React, { Component } from 'react'
import IBoard from '../schemas/IBoard'
import '../styles/AppHeader.less'

interface IAppHeaderProps {
    boardList: List<IBoard>
    currentBoard: IBoard | null,
    asyncFetchBoardList: () => any
    setCreateBoardModalVisible: (visible: boolean) => any
}

class AppHeader extends Component<IAppHeaderProps> {
    public constructor(props: IAppHeaderProps) {
        super(props)
    }
    public componentDidMount() {
        this.props.asyncFetchBoardList()
    }
    public render() {
        return (
            <Layout.Header className={`app-header ${this.props.currentBoard ? 'has-background-image' : ''}`}>
                <div className="header-right">
                    <Icon type="plus" onClick={event => this.props.setCreateBoardModalVisible(true)} />
                    <Icon type="setting" />
                </div>
            </Layout.Header>
        )
    }
}

export default AppHeader
