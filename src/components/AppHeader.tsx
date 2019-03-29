import { Icon, Layout } from 'antd'
import React, { Component } from 'react'

import '../styles/AppHeader.less'
class AppHeader extends Component {
    public render() {
        return (
            <Layout.Header className="app-header">
                <div className="header-right">
                    <Icon type="plus" />
                    <Icon type="setting" />
                </div>
            </Layout.Header>
        )
    }
}

export default AppHeader
