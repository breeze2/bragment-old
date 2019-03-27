import { Icon, Layout, Menu } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, Route, RouteComponentProps } from 'react-router-dom'

import HomeLogs from '../components/HomeLogs'
import HomeBoards from '../containers//HomeBoards'

import '../styles/HomePage.less'

interface InterfaceHomePageProps extends RouteComponentProps {
    selectedMenuKey: string
}

const { Header, Content, Footer, Sider } = Layout

class Home extends Component<InterfaceHomePageProps> {
    public constructor(props: InterfaceHomePageProps) {
        super(props)
    }
    public handleMenuSelect = (param: any) => {
        const key = param.key
        switch (key) {
            case 'BOARDS':
                this.props.history.push('/home/boards')
                break
            case 'LOGS':
                this.props.history.push('/home/logs')
                break
            default:
                break
        }
    }
    public render () {
        return (
            <Layout className="home-page">
                <Sider theme="light" width={256}>
                    <Menu defaultSelectedKeys={[this.props.selectedMenuKey]} onSelect={this.handleMenuSelect}>
                        <Menu.Item key="BOARDS">
                            <Icon type="project" />
                            <FormattedMessage id="boards" />
                        </Menu.Item>
                        <Menu.Item key="LOGS">
                            <Icon type="profile" />
                            <FormattedMessage id="logs" />
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content>
                        <Route exact path='/' component={HomeBoards} />
                        <Route exact path='/home/boards' component={HomeBoards} />
                        <Route exact path="/home/logs" component={HomeLogs} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Home