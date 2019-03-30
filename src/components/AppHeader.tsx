import { Icon, Layout } from 'antd'
import React, { Component } from 'react'

import '../styles/AppHeader.less'

interface IAppHeaderProps {
    setCreateBoardModalVisible: (visible: boolean) => any
}

class AppHeader extends Component<IAppHeaderProps> {
    public constructor(props: IAppHeaderProps) {
        super(props)
    }
    public render() {
        return (
            <Layout.Header className="app-header">
                <div className="header-right">
                    <Icon type="plus" onClick={event => this.props.setCreateBoardModalVisible(true)} />
                    <Icon type="setting" />
                </div>
            </Layout.Header>
        )
    }
}

export default AppHeader
